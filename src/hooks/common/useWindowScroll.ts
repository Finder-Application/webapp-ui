import { useEffect, useState } from 'react';

interface Scroll {
  pageX: number;
  pageY: number;
}
const useWindowScroll = () => {
  const [windowScroll, setWindowScroll] = useState<Scroll>({
    pageX: 0,
    pageY: 0,
  });
  useEffect(() => {
    // Handler to call on window resize
    function handleScroll() {
      // Set window width/height to state
      setWindowScroll({
        pageX: window.screenY,
        pageY: window.scrollY,
      });
    }
    // Add event listener
    window.addEventListener('scroll', handleScroll);
    // Call handler right away so state gets updated with initial window size
    handleScroll();
    // Remove event listener on cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // Empty array ensures that effect is only run on mount
  return windowScroll;
};
export default useWindowScroll;
