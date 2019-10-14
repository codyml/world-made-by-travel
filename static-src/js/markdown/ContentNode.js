import React from 'react';
import PropTypes from 'prop-types';


/*
* Basic component that renders itself and its children.  Calls the
* passed `extensions` functions before rendering with params and
* renders the return value if provided.  If `extensions` returns
* false, entity will not be rendered.
*/

export const ContentNode = ({ extensions, ancestors, ...node }) => {
  //  Skip empty tags
  if (!node.tag) {
    return null;
  }

  //  Apply extensions
  let updatedNode = node;
  for (const extension of extensions) {
    const result = extension(updatedNode);
    if (!result) {
      return null;
    }

    updatedNode = { ...updatedNode, ...result };
  }

  const {
    tag: Component,
    props,
    children,
  } = updatedNode;

  return (
    <Component {...props}>
      {children.length ? children.map((child) => {
        if (typeof child === 'string') {
          return child;
        }

        const { children: childNodeChildren, ...childNode } = child;
        return (
          <ContentNode
            extensions={extensions}
            ancestors={[updatedNode, ...ancestors]}
            {...childNode}
          >
            {childNodeChildren}
          </ContentNode>
        );
      }) : null}
    </Component>
  );
};

const ContentNodePropType = {
  tag: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.symbol]),
  props: PropTypes.shape({}),
  refNumber: PropTypes.number,
  children: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})])),
  extensions: PropTypes.arrayOf(PropTypes.func),
  ancestors: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})])),
};

ContentNode.propTypes = ContentNodePropType;

ContentNode.defaultProps = {
  tag: React.Fragment,
  props: {},
  refNumber: 0,
  children: [],
  extensions: [],
  ancestors: [],
};

export const ContentNodesPropType = PropTypes.arrayOf(PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.shape(ContentNodePropType),
]));
