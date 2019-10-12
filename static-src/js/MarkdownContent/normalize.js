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
  let lastParagraphNumber = 0;
  let lastFigureNumber = 0;
  const paragraphsByNumber = {};
  const figuresByNumber = {};
  const footnotesByIdentifier = {};
  const footnotes = [];

  const normalizeCurrentTokens = (currentTokens, keyPrefix = 'root') => {
    const itemsArrStack = [];
    const pushItemsArr = itemsArrStack.push.bind(itemsArrStack);
    const peekItemsArr = () => itemsArrStack[itemsArrStack.length - 1];
    const popItemsArr = itemsArrStack.pop.bind(itemsArrStack);
    const getKey = () => [
      keyPrefix,
      ...itemsArrStack.map((items) => items.length),
    ].join(':');

    const createItemFromToken = (token, children) => ({
      key: getKey(),
      tag: token.tag,
      props: token.attrs ? Object.assign(
        {},
        ...token.attrs.map(([key, value]) => ({ [key]: value })),
      ) : {},
      children,
    });

    pushItemsArr([]);

    for (let i = 0; i < currentTokens.length; i++) {
      const token = currentTokens[i];
      switch (token.nesting) {
        case 1: {
          pushItemsArr([]);
          break;
        }

        case 0: {
          switch (token.type) {
            case 'inline': {
              pushItemsArr(popItemsArr().concat(normalizeCurrentTokens(token.children, getKey())));
              break;
            }

            case 'text': {
              peekItemsArr().push(token.content);
              break;
            }

            default: {
              peekItemsArr().push(createItemFromToken(token));
            }
          }

          break;
        }

        case -1: {
          const item = createItemFromToken(token, popItemsArr());
          switch (item.tag) {
            case 'p': {
              item.number = lastParagraphNumber + 1;
              lastParagraphNumber = item.number;
              paragraphsByNumber[item.number] = item;
              break;
            }

            case 'figure': {
              item.number = lastFigureNumber + 1;
              lastFigureNumber = item.number;
              figuresByNumber[item.number] = item;
              break;
            }

            default:
          }

          peekItemsArr().push(item);
          break;
        }

        default: {
          throw new Error('Invalid token nesting');
        }
      }
    }

    return popItemsArr();
  };

  const contentItems = normalizeCurrentTokens(tokens);
  return {
    paragraphsByNumber, // { number: { number, content: [content] }
    figuresByNumber, // { number: { number, content: [identifier], caption: [content] } }
    contentItems, // [content]
    footnotesByIdentifier, // { identifier: { identifier, content: [content] } },
    footnotes, // [identifier],
  };
}
