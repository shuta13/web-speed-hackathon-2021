import { useEffect, useState } from 'react';

export const useIntersection = (ref) => {
  const [intersected, setIntersected] = useState(false);

  useEffect(() => {
    if (ref.current == null) return;

    const intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setIntersected(entry.isIntersecting);
      });
    });

    intersectionObserver.observe(ref.current);

    return () => {
      if (ref.current) intersectionObserver.unobserve(ref.current);
    };
  }, [ref.current]);

  return intersected;
};
