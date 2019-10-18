/*
* Recursively calls a normalizing function that traverses the list
* of tokens and returns the entities in a format ready to render
* by React.
*/

export default function normalizeTokenizedContent(contentTokens) {
  const referencesByTag = {};
  const referenceCountsByTag = {};

  //  Saves the item object under the item's tag name and a number
  //  representing its order in the tree.
  const saveReference = (node) => {
    if (!referencesByTag[node.tag]) {
      referencesByTag[node.tag] = {};
      referenceCountsByTag[node.tag] = 0;
    }

    referenceCountsByTag[node.tag] += 1;
    const referencedNode = { ...node, refNumber: referenceCountsByTag[node.tag] };
    referencesByTag[node.tag][referencedNode.refNumber] = referencedNode;
    return referencedNode;
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

    //  Creates a normalized content node object from a token
    const createNodeFromToken = ({
      type,
      tag,
      attrs,
      meta,
      content,
    }) => {
      if (type === 'text') {
        return content;
      }

      const props = Object.assign(
        {},
        ...(attrs ? attrs.map(([key, value]) => ({ [key]: value })) : []),
        meta,
      );

      const children = content ? [content] : [];
      const node = saveReference({
        key: getKey(),
        tag: tag || type,
        props,
        children,
      });

      return node;
    };

    pushParent({ children: [] });

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      switch (token.nesting) {
        case 1: {
          const item = createNodeFromToken(token);


          pushParent(item);
          break;
        }

        case 0: {
          if (token.children) {
            peekParent().children.push(...normalizeTokens(token.children, getKey()));
          } else {
            peekParent().children.push(createNodeFromToken(token));
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
  return { contentNodes, referencesByTag };
}
