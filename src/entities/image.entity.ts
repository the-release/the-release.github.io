export interface Image {
  alt: string;
  dominantColor: string;
  sizes: {
    small: {
      width: number;
      height: number;
      url: string;
      absoluteUrl: string;
    };
    medium: {
      width: number;
      height: number;
      url: string;
      absoluteUrl: string;
    };
    large: {
      width: number;
      height: number;
      url: string;
      absoluteUrl: string;
    };
  };
}
