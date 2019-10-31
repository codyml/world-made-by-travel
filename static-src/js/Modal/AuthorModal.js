import React from 'react';
import { useSelector } from 'react-redux';

import style from 'styles/Modal.module.css';
import { MarkdownContent } from '../markdown';

export default function AuthorModalForeground() {
  const { authorSlug } = useSelector((state) => state.modalContent);
  const { name, biographyMarkdown } = useSelector((state) => state.authorsBySlug[authorSlug] || {});
  if (!name) {
    return null;
  }

  return (
    <>
      <div className={style.authorName}>{name}</div>
      <MarkdownContent className={style.authorBiography}>{biographyMarkdown}</MarkdownContent>
    </>
  );
}
