import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import parseMarkdown from './parse';
import normalizeTokens, { ContentItemPropType } from './normalize';
import ContentItem from './ContentItem';
import { REFERENCE_TAG } from './references';
import {
  SPECIAL_LINK_TAG,
  EXPLORER_LINK_TYPE,
  BOOK_LINK_TYPE,
} from './links';


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


/*
* Exports tags for consumers of item objects.
*/

export {
  ContentItem,
  ContentItemPropType,
  REFERENCE_TAG,
  SPECIAL_LINK_TAG,
  EXPLORER_LINK_TYPE,
  BOOK_LINK_TYPE,
};
