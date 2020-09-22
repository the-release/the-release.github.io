export const convertRgbToRgba = (rgb: string, alpha: number) => {
  return rgb.replace("rgb", "rgba").replace(")", `, ${alpha})`);
};
