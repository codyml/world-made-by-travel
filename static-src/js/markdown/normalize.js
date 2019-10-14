/*
* Recursively calls a normalizing function that traverses the list
* of tokens and returns the entities in a format ready to render
* by React.
*/

export default function normalizeTokenizedContent(contentTokens) {
  const references = {};

  //  Saves the item object under the item's tag name and a number
  //  representing its order in the tree.
  const saveReference = (item) => {
    if (!references[item.tag]) {
      references[item.tag] = { currentNumber: 0, refsByNumber: {} };
    }

    const refNumber = references[item.tag].currentNumber + 1;
    const refItem = { ...item, refNumber };
    references[item.tag].refsByNumber[refNumber] = refItem;
    references[item.tag].currentNumber = refNumber;
    return refItem;
  };

  const normalizeTokens = (tokens, keyPrefix = 'root') => {
    const parents = [];
    const pushParent = parents.push.bind(parents);
    const peekParent = () => parents[parents.length - 1];
    const popParent = parents.pop.bind(parents);

    //  Creates a unique key for a normalized content item
    const getKey = () => [
      keyPrefix,
      ...parents.map((parent) => parent.children.length),
    ].join(':');

    //  Creates a normalized content item object from a token
    const createItemFromToken = ({ type, tag, attrs, content }) => {
      if (type === 'text') {
        return content;
      }

      const props = attrs
        ? Object.assign({}, ...attrs.map(([key, value]) => ({ [key]: value })))
        : {};

      const children = content ? [content] : [];
      const item = saveReference({
        key: getKey(),
        tag,
        props,
        children,
      }, references);

      return item;
    };

    pushParent({ children: [] });

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      switch (token.nesting) {
        case 1: {
          const item = createItemFromToken(token);


          pushParent(item);
          break;
        }

        case 0: {
          if (token.children) {
            peekParent().children.push(...normalizeTokens(token.children, getKey()));
          } else {
            peekParent().children.push(createItemFromToken(token));
          }

          break;
        }

        case -1: {
          const item = popParent();
          peekParent().children.push(item);
          break;
        }

        default: {
          throw new Error('Invalid token nesting');
        }
      }
    }

    return popParent().children;
  };

  const contentNodes = normalizeTokens(contentTokens);
  return { contentNodes, references };
}
