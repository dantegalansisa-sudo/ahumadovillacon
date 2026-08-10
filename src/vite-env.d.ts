/// <reference types="vite/client" />

import 'react';

declare module 'react' {
  // React 18 types do not know about the fetchpriority attribute yet.
  interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
    fetchpriority?: 'high' | 'low' | 'auto';
  }
}
