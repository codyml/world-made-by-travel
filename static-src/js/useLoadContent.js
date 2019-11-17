import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { BOOK_CONTENT_RECEIVED } from './constants';

export default function useLoadContent() {
  const [errorMessage, setErrorMesssage] = useState(null);
  const [bookContentLoaded, setBookContentLoaded] = useState(false);
  const [backgroundImageLoaded, setBackgroundImageLoaded] = useState(false);

  const backgroundImageUrl = useSelector((state) => (
    state.config && state.config.backgroundImageUrl
  ));

  const dispatch = useDispatch();

  //  Fetches book-wide content
  useEffect(() => {
    const fetchBookContent = async () => {
      const response = await fetch('/wp-json/wmt/book-content');
      if (response.ok) {
        const { config, authors, tableOfContents } = await response.json();
        dispatch({
          type: BOOK_CONTENT_RECEIVED,
          config,
          authors,
          tableOfContents,
        });

        setBookContentLoaded(true);
      } else {
        const { message } = await response.json();
        setErrorMesssage(message);
      }
    };

    fetchBookContent();
  }, [dispatch]);

  useEffect(() => {
    if (backgroundImageUrl) {
      const backgroundImage = new Image();
      backgroundImage.addEventListener('load', () => setBackgroundImageLoaded(true));
      backgroundImage.src = backgroundImageUrl;
    }
  }, [backgroundImageUrl]);

  return [bookContentLoaded && backgroundImageLoaded, errorMessage];
}
