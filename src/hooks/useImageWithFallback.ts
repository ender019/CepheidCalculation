import { useState, useEffect } from 'react';
import { img_proxy_addr } from '../../src-tauri/target_config'

export const useImageWithFallback = (initialSrc: string, fallbackSrc: string = '/Gilyazetdinov-RIP2025F/img/default-star.jpg') => {
  const [src, setSrc] = useState(initialSrc);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setSrc(img_proxy_addr+initialSrc);
    setHasError(false);
  }, [initialSrc]);

  const handleError = () => {
    if (!hasError) {
      setSrc(fallbackSrc);
      setHasError(true);
    }
  };

  const handleLoad = () => {
    setHasError(false);
  };

  return {
    src,
    hasError,
    onError: handleError,
    onLoad: handleLoad
  };
};