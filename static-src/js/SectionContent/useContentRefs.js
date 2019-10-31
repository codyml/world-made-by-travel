import React, { useCallback } from 'react';


/*
* Custom hook that creates refs, attaches them to content nodes,
* and saves them in a ref container for a certain node type.
*/

export default function useContentRefs(component, contentRefs) {
  const { current: refs } = contentRefs;

  return useCallback((item) => {
    if (item.component === component) {
      const ref = React.createRef();
      refs[item.refNumber] = ref;
      return {
        props: { ...item.props, ref },
      };
    }

    return {};
  }, [component, refs]);
}
