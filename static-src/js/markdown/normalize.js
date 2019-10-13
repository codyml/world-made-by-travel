import PropTypes from 'prop-types';

//  PropTypes definition for a normalized item object.
export const ContentItemPropType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.shape({
    tag: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
    props: PropTypes.shape({}),
    children: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({}),
    ])),
  }),
]);


/*
* Recursively calls a normalizing function that traverses the list
* of tokens and returns the entities in a format ready to render
* by React.
*/

export default function normalizeTokens(tokens) {
  const itemsByNumber = {};
  const assignNumber = (item) => {
    if (!itemsByNumber[item.tag]) {
      itemsByNumber[item.tag] = { currentNumber: 0, itemsByNumber: {} };
    }

    const assignedNumber = itemsByNumber[item.tag].currentNumber + 1;
    itemsByNumber[item.tag].currentNumber = assignedNumber;
    return { ...item, assignedNumber };
  };

  const normalizeCurrentTokens = (currentTokens, keyPrefix = 'root') => {
    const parents = [];
    const pushParent = parents.push.bind(parents);
    const peekParent = () => parents[parents.length - 1];
    const popParent = parents.pop.bind(parents);

    //  Creates a unique key for a token
    const getKey = () => [
      keyPrefix,
      ...parents.map((parent) => parent.children.length),
    ].join(':');

    //  Creates a normalized content item object from a Markdown-It token
    const createItemFromToken = ({ type, tag, attrs, content }) => {
      if (type === 'text') {
        return content;
      }

      const props = attrs
        ? Object.assign({}, ...attrs.map(([key, value]) => ({ [key]: value })))
        : {};

      const children = content ? [content] : [];
      const item = {
        key: getKey(),
        tag,
        props,
        children,
      };

      assignNumber(item);
      return item;
    };

    pushParent({ children: [] });

    for (let i = 0; i < currentTokens.length; i++) {
      const token = currentTokens[i];
      switch (token.nesting) {
        case 1: {
          const item = createItemFromToken(token);


          pushParent(item);
          break;
        }

        case 0: {
          if (token.children) {
            peekParent().children.push(...normalizeCurrentTokens(token.children, getKey()));
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

  const contentItems = normalizeCurrentTokens(tokens);
  return { contentItems, itemsByNumber };
}
