import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import MarkdownIt from 'markdown-it';

import HTMLContent from './HTMLContent';

const md = new MarkdownIt();

/*
* Renders a Markdown string.
*/

export default function MarkdownContent({ children, ...props }) {
  const html = useMemo(() => md.render(children), [children]);
  return <HTMLContent {...props}>{html}</HTMLContent>;
}

MarkdownContent.propTypes = {
  children: PropTypes.string,
};

MarkdownContent.defaultProps = {
  children: '',
};
