export const hexToRgb = (hex: string) => {
  const normalized = hex.replace('#', '');
  const value = Number.parseInt(normalized, 16);

  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
};

export const alpha = (hex: string, opacity: number) => {
  const {r, g, b} = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
