import React from 'react';

const useIntersectionObserver = (options) => {
  const ref = React.useRef(null);
  const parentRef = React.useRef(null);
  if (!options) {
    options = {
      root: parentRef?.current,
      rootMargin: '0px',
      threshold: 1.0,
    };
  } else {
    options = {
      ...options,
      root: parentRef?.current,
    };
  }
  const [isIntersecting, setIsIntersecting] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.unobserve(ref.current);
    };
  }, []);

  return [isIntersecting, ref, parentRef];
};

export default useIntersectionObserver;


/* U--S--E

const [lastElementInView, Ref,ParentRef] = useIntersectionObserver();

-assign ref  to the element to observe,
-assign ParentRef to the scrollview element, ------ need not to assign it if you are observinng in default browser scroll


useEffect(() => {
    if (lastElementInView) {
      handleLoadMore();
    }
  }, [lastElementInView]);

*/