import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop component automatically scrolls the window to the top (0, 0)
 * whenever the route changes. This ensures that users start at the top
 * of the new page, mirroring standard browser behavior in a SPA.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Basic window scroll to top
    window.scrollTo(0, 0);
    
    // If Lenis (smooth scroll) is globally accessible, ensure it also scrolls to top
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;
