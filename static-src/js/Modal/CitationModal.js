import React from 'react';

import useCitation from './useCitation';


export default function CitationModalForeground() {
  const [plainTextCitation, richTextCitation] = useCitation();

  return (
    <>
      <div>citation:</div>
      <div>{richTextCitation}</div>
      <div>plain text citation:</div>
      <textarea
        // className={style.hiddenTextArea}
        // ref={textAreaRef}
        value={plainTextCitation}
        readOnly
      />
    </>
  );
}
