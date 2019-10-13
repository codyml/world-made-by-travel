import { REFERENCE_TAG } from '../markdown';

/*
* Custom hook that lets React component handle references.
*/

const useFigures = () => (item) => {
  if (item.tag === REFERENCE_TAG) {
    return {
      tag: 'span',
      props: {},
      children: ['REFERENCE'],
    };
  }

  return null;
};

export default useFigures;
