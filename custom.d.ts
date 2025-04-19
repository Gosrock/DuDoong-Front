declare module '*.svg' {
  const value: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default value;
}

declare global {
  interface Window {
    adfit?: {
      destroy: (unit: string) => void;
    };
  }
}

export {};
