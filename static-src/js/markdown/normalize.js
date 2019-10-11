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

  const normalizeCurrentTokens = (currentTokens) => {
    const itemsStack = [[]];

    for (let i = 0; i < currentTokens.length; i++) {
      const token = currentTokens[i];
      switch (token.nesting) {
        case 1: {
          itemsStack.push([]);
          break;
        }

        case 0: {
          switch (token.type) {
            case 'inline': {
              const items = itemsStack.pop();
              items.push(items.concat(normalizeCurrentTokens(token.children)));
              itemsStack.push(items);
              break;
            }

            case 'text': {
              const items = itemsStack.pop();
              items.push(token.content);
              itemsStack.push(items);
              break;
            }

            default: {
              const items = itemsStack.pop();
              items.push({
                tag: token.tag,
                props: token.attrs ? Object.assign(
                  {},
                  ...token.attrs.map(([key, value]) => ({ [key]: value })),
                ) : {},
                meta: token.meta,
              });

              itemsStack.push(items);
            }
          }

          break;
        }

        case -1: {
          const tokenWithChildren = {
            tag: token.tag,
            props: token.attrs ? Object.assign(
              {},
              ...token.attrs.map(([key, value]) => ({ [key]: value })),
            ) : {},
            children: itemsStack.pop(),
          };

          switch (token.tag) {
            case 'p': {
              tokenWithChildren.number = lastParagraphNumber + 1;
              lastParagraphNumber = tokenWithChildren.number;
              paragraphsByNumber[tokenWithChildren.number] = tokenWithChildren;
              break;
            }

            case 'figure': {
              tokenWithChildren.number = lastFigureNumber + 1;
              lastFigureNumber = tokenWithChildren.number;
              figuresByNumber[tokenWithChildren.number] = tokenWithChildren;
              break;
            }

            default:
          }

          const items = itemsStack.pop();
          items.push(tokenWithChildren);
          itemsStack.push(items);
          break;
        }

        default:
          throw new Error('Invalid token nesting');
      }
    }

    return itemsStack.pop();
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
