import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import parseMarkdown from './parse';
import normalizeTokenizedContent from './normalize';
import { Content, ContentNodesPropType } from './Content';
import { CAPTION_TAG, Figure, FigureContent } from './figures';
import { FOOTNOTE_TAG, FOOTNOTE_REF_TAG, Footnote } from './footnotes';


/*
* Parses and normalizes a section's Markdown content, returning an
* object of the various fields used to support the features of the
* section's main content.
*/

export const processMainContentMarkdown = (markdown) => {
  const tokens = parseMarkdown(markdown);
  const { contentNodes, referencesByTag } = normalizeTokenizedContent(tokens);
  return {
    contentNodes,
    figureCaptionsByNumber: referencesByTag[CAPTION_TAG] || {},
    footnoteLinksByNumber: referencesByTag[FOOTNOTE_REF_TAG] || {},
    footnotesByNumber: referencesByTag[FOOTNOTE_TAG] || {},
  };
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
  const { contentNodes } = normalizeTokenizedContent(tokens);
  return contentNodes;
};


/*
* Parses, normalized and renders Markdown content in a React component.
* Re-parses every render, so not suitable for large documents.
*/

export function MarkdownContent({ children: markdown, ...props }) {
  const contentNodes = useMemo(() => processMarkdown(markdown), [markdown]);
  return (
    <div {...props}>
      <Content nodes={contentNodes} />
    </div>
  );
}

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
  Figure,
  FigureContent,
  Footnote,
  Content,
  ContentNodesPropType,
};
