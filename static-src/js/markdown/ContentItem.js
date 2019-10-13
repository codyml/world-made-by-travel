import React from 'react';
import PropTypes from 'prop-types';

import { ContentItemPropType } from './normalize';

/*
* Basic component that renders itself and its children.  Calls the
* passed `extensions` functions before rendering with params and
* renders the return value if provided.  If `extensions` returns
* false, entity will not be rendered.
*/

export default function ContentItem({
  tag: itemTag,
  props: itemProps,
  children: itemChildren,
  ancestors,
  extensions,
}) {
  let item = { tag: itemTag, props: itemProps, children: itemChildren };

  //  Skip empty tags
  if (!item.tag) {
    return null;
  }

  //  Apply extensions
  for (const extension of extensions) {
    const result = extension(item, ancestors);
    if (!result) {
      return null;
    }

    item = { ...item, ...result };
  }

  const {
    tag: Component,
    props,
    children,
  } = item;

  return (
    <Component {...props}>
      {children.length ? children.map((child) => {
        if (typeof child === 'string') {
          return child;
        }

        const { children: childItemChildren, ...childItem } = child;
        return (
          <ContentItem ancestors={[item, ...ancestors]} extensions={extensions} {...childItem}>
            {childItemChildren}
          </ContentItem>
        );
      }) : null}
    </Component>
  );
}

ContentItem.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
  props: PropTypes.shape({}),
  children: PropTypes.arrayOf(ContentItemPropType),
  ancestors: PropTypes.arrayOf(ContentItemPropType),
  extensions: PropTypes.arrayOf(PropTypes.func),
};

ContentItem.defaultProps = {
  tag: React.Fragment,
  props: {},
  children: [],
  ancestors: [],
  extensions: [],
};
