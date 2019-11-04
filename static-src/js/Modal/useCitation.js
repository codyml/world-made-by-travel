import React, { useContext, useMemo } from 'react';
import { useSelector } from 'react-redux';

import SectionContext from '../SectionContext';
import { useAuthorStringParser } from '../LinkedAuthor';
import {
  REFERABLE_CONTENT_TYPES,
  GET_CONTENT_DESCRIPTION,
  GET_CONTENT_IDENTIFIER,
} from '../constants';


export default function useCitation() {
  const parseAuthorString = useAuthorStringParser();
  const { origin } = window.location;
  const { contentType, contentNumber } = useSelector((state) => state.modalContent);
  const {
    bookCitationBaseUrl: citationBaseUrl,
    bookCitedPublisher: publisher,
    bookCitedPublicationYear: year,
    coverTitle: bookTitle,
    coverSubtitle: bookSubtitle,
    coverAuthor: bookAuthor,
  } = useSelector((state) => state.config);

  const {
    group: groupSlug,
    author: sectionAuthor,
    citedAuthor: sectionCitedAuthor,
    numeral,
    title,
    path,
  } = useContext(SectionContext);

  const {
    numeral: groupNumeral,
    title: groupTitle,
    author: groupAuthor,
    citedAuthor: groupCitedAuthor,
  } = useSelector((state) => state.sectionGroupMetaBySlug[groupSlug] || {});

  const sectionCitation = useMemo(() => {
    const resolvedSectionCitedAuthor = parseAuthorString(sectionCitedAuthor || sectionAuthor)
      .map((s) => (s.author ? s.author.citedName || s.author.name : s.str))
      .join('');

    return [`${resolvedSectionCitedAuthor}. "${title}."`, ' '];
  }, [parseAuthorString, sectionAuthor, sectionCitedAuthor, title]);

  const sectionGroupCitation = useMemo(() => {
    if (groupTitle) {
      const resolvedCitedGroupAuthor = parseAuthorString(groupCitedAuthor || groupAuthor)
        .map((s) => (s.author ? s.author.citedName || s.author.name : s.str))
        .join('');

      return [
        { italic: true, str: groupTitle },
        resolvedCitedGroupAuthor ? `, ${resolvedCitedGroupAuthor}.` : '.',
        ' ',
      ];
    }

    return [];
  }, [groupAuthor, groupCitedAuthor, groupTitle, parseAuthorString]);

  const bookCitation = useMemo(() => [
    `${bookAuthor}`,
    ', ',
    { italic: true, str: `${bookTitle}: ${bookSubtitle}` },
    ', ',
    `${publisher} ${year}`,
    ...(contentType === REFERABLE_CONTENT_TYPES.section
      ? ['.']
      : [
        ', section ',
        groupTitle ? `${groupNumeral || groupTitle}: ` : '',
        `${numeral || title}, `,
        `${GET_CONTENT_DESCRIPTION[contentType](contentNumber)}.`,
      ]
    ),
    ' ',
  ], [
    bookAuthor,
    bookSubtitle,
    bookTitle,
    contentNumber,
    contentType,
    groupNumeral,
    groupTitle,
    numeral,
    publisher,
    title,
    year,
  ]);

  const url = useMemo(
    () => [
      {
        link: true,
        str: [
          citationBaseUrl || origin,
          path,
          (contentType === REFERABLE_CONTENT_TYPES.section
            ? ''
            : `#${GET_CONTENT_IDENTIFIER[contentType](contentNumber)}`
          ),
        ].join(''),
      },
    ],
    [citationBaseUrl, contentNumber, contentType, origin, path],
  );

  const jsxCitation = useMemo(
    () => [
      ...sectionCitation,
      ...sectionGroupCitation,
      ...bookCitation,
      ...url,
    ].map((str) => {
      if (typeof str === 'object') {
        if (str.italic) {
          return <em key={str.str}>{str.str}</em>;
        }

        if (str.link) {
          return <a key={str.str} href={str.str}>{str.str}</a>;
        }

        return str.str;
      }

      return str;
    }),
    [bookCitation, sectionCitation, sectionGroupCitation, url],
  );

  const plainTextCitation = useMemo(
    () => [
      ...sectionCitation,
      ...sectionGroupCitation,
      ...bookCitation,
      ...url,
    ].map((str) => (typeof str === 'object' ? str.str : str)).join(''),
    [bookCitation, sectionCitation, sectionGroupCitation, url],
  );

  const txtUrl = useMemo(() => {
    const blob = new Blob([plainTextCitation], { type: 'text/plain' });
    return URL.createObjectURL(blob);
  }, [plainTextCitation]);

  const htmlUrl = useMemo(() => {
    const html = [
      ...sectionCitation,
      ...sectionGroupCitation,
      ...bookCitation,
      ...url,
    ].reduce((accum, str) => {
      if (typeof str === 'object') {
        if (str.italic) {
          return `${accum}<em>${str.str}</em>`;
        }

        if (str.link) {
          return `${accum}<a href=${str.str}>${str.str}</a>`;
        }

        return `${accum}${str.str}`;
      }

      return `${accum}${str}`;
    }, '');

    const blob = new Blob([html], { type: 'text/html' });
    return URL.createObjectURL(blob);
  }, [bookCitation, sectionCitation, sectionGroupCitation, url]);

  const mdUrl = useMemo(() => {
    const md = [
      ...sectionCitation,
      ...sectionGroupCitation,
      ...bookCitation,
      ...url,
    ].reduce((accum, str) => {
      if (typeof str === 'object') {
        if (str.italic) {
          return `${accum}*${str.str}*`;
        }

        if (str.link) {
          return `${accum}[${str.str}](${str.str})`;
        }

        return `${accum}${str.str}`;
      }

      return `${accum}${str}`;
    }, '');

    const blob = new Blob([md], { type: 'text/plain' });
    return URL.createObjectURL(blob);
  }, [bookCitation, sectionCitation, sectionGroupCitation, url]);

  return [
    jsxCitation,
    plainTextCitation,
    txtUrl,
    htmlUrl,
    mdUrl,
  ];
}
