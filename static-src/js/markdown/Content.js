import React from 'react';
import PropTypes from 'prop-types';

import { useLinks } from './links';
import { useFigures } from './figures';
import useHTML from './useHTML';
import { useFootnotes } from './footnotes';


/*
* Basic component that renders itself and its children.
*/

export function ContentNode({ handlers, ancestors, ...node }) {
  //  Handle special component types
  let updatedNode = node;
  for (const handler of handlers) {
    const result = handler(updatedNode, ancestors);
    if (!result) {
      return null;
    }

    updatedNode = { ...updatedNode, ...result };
  }

  const {
    component: Component,
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
            handlers={handlers}
            ancestors={[updatedNode, ...ancestors]}
            {...childNode}
          >
            {childNodeChildren}
          </ContentNode>
        );
      }) : null}
    </Component>
  );
}

const ContentNodePropType = {
  component: PropTypes.oneOfType([PropTypes.elementType, PropTypes.string, PropTypes.symbol]),
  props: PropTypes.shape({}),
  refNumber: PropTypes.number,
  children: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})])),
  handlers: PropTypes.arrayOf(PropTypes.func),
  ancestors: PropTypes.arrayOf(PropTypes.shape({})),
};

ContentNode.propTypes = ContentNodePropType;

ContentNode.defaultProps = {
  component: React.Fragment,
  props: {},
  refNumber: 0,
  children: [],
  handlers: [],
  ancestors: [],
};

export const ContentNodesPropType = PropTypes.arrayOf(PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.shape(ContentNodePropType),
]));


export function Content({ nodes, extensions }) {
  const handlers = [
    useLinks(),
    useFigures(),
    useHTML(),
    useFootnotes(),
    ...extensions,
  ];

  return <ContentNode handlers={handlers}>{nodes}</ContentNode>;
}

Content.propTypes = {
  nodes: ContentNodesPropType.isRequired,
  extensions: PropTypes.arrayOf(PropTypes.func),
};

Content.defaultProps = {
  extensions: [],
};
