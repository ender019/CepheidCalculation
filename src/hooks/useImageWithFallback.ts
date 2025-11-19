import { useState, useEffect } from 'react';

const host = "https://192.168.1.216:3000"

export const useImageWithFallback = (initialSrc: string, fallbackSrc: string = '/Gilyazetdinov-RIP2025F/img/default-star.jpg') => {
  const [src, setSrc] = useState(initialSrc);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setSrc(host+'/static'+initialSrc);
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