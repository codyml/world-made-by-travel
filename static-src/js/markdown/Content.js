import React from 'react';
import PropTypes from 'prop-types';

import { useLinks } from './links';
import { useFigures } from './figures';
import useHTML from './useHTML';
import { useFootnotes } from './footnotes';


/*
* Basic component that renders itself and its children.
*/

export const ContentNode = ({ handlers, ...node }) => {
  //  Handle special tag types
  let updatedNode = node;
  for (const handler of handlers) {
    const result = handler(updatedNode);
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
          <ContentNode handlers={handlers} {...childNode}>{childNodeChildren}</ContentNode>
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
  handlers: PropTypes.arrayOf(PropTypes.func),
};

ContentNode.propTypes = ContentNodePropType;

ContentNode.defaultProps = {
  tag: React.Fragment,
  props: {},
  refNumber: 0,
  children: [],
  handlers: [],
};

export const ContentNodesPropType = PropTypes.arrayOf(PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.shape(ContentNodePropType),
]));


export const Content = ({ nodes }) => {
  const handlers = [
    useLinks(),
    useFigures(),
    useHTML(),
    useFootnotes(),
  ];

  return <ContentNode handlers={handlers}>{nodes}</ContentNode>;
};

Content.propTypes = {
  nodes: ContentNodesPropType.isRequired,
};