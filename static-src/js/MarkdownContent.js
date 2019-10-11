import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { md } from './markdown';
import HTMLContent from './HTMLContent';

/*
* Renders a Markdown string, excluding custom WMT syntax that can
* only be rendered in the context of a section.
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
