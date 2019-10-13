import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import parseMarkdown from './parse';
import normalizeTokens, { ContentItemPropType } from './normalize';
import { useSpecialLinks } from './specialLinks';
import { useReferences } from './references';


/*
* Parses and normalizes a section's Markdown content, returning an
* object of the various fields used to support the features of the
* section's main content.
*/

export const processMainContentMarkdown = (markdown) => {
  const tokens = parseMarkdown(markdown);
  return normalizeTokens(tokens);
};


/*
* Parses and normalizes other Markdown content, returning just an
* array of content entities that can be rendered as-is.  Does not
* include data to support paragraph-level margin links, figures,
* or footnotes.  Used for custom block content and other Markdown
* around the site.
*/

export const processMarkdown = (markdown) => {
  const tokens = parseMarkdown(markdown);
  const { contentItems } = normalizeTokens(tokens);
  return contentItems;
};


/*
* Basic component that renders itself and its children.  Calls the
* passed `extensions` functions before rendering with params and
* renders the return value if provided.  If `extensions` returns
* false, entity will not be rendered.
*/

export const ContentItem = ({ ancestors, extensions, ...item }) => {
  //  Skip empty tags
  if (!item.tag) {
    return null;
  }

  //  Apply extensions
  for (const extension of extensions) {
    const result = extension(item, ancestors);
    if (result === false) {
      return null;
    }

    Object.assign(item, result);
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
};

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


/*
* Parses, normalized and renders Markdown content in a React component.
* Re-parses every render, so not suitable for large documents.
*/

export const MarkdownContent = ({ children: markdown, ...props }) => {
  const contentItems = useMemo(() => processMarkdown(markdown), [markdown]);
  return (
    <div {...props}>
      <ContentItem>{contentItems}</ContentItem>
    </div>
  );
};

MarkdownContent.propTypes = {
  children: PropTypes.string,
};

MarkdownContent.defaultProps = {
  children: '',
};


export {
  ContentItemPropType,
  useSpecialLinks,
  useReferences,
};
