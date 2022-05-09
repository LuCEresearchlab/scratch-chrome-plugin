import { useState, useEffect } from 'react';

/**
 *
 * This custom hook computes the height of an element (passed as a ref)
 * when the window fires a 'resize' event
 *
 * @param {*} containerRef - the reference of the container component
 */
function useContainerHeightOnWindowResize(containerRef) {
  const [containerHeight, setContainerHeight] = useState(300);

  useEffect(() => {
    function onResize() {
      setContainerHeight(containerRef.current.offsetHeight);
    }

    window.addEventListener('resize', onResize);
    onResize();

    return () => window.removeEventListener('resize', onResize);
  }, []);

  return containerHeight;
}

export default useContainerHeightOnWindowResize;
