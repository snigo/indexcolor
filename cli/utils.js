const { color, sRGBColor, mix } = require('@snigo.dev/color');
const { NEUTRAL_COLORS, SATURATION_INCREMENTOR } = require('./init');

function generateNeutrals({ primaryColor, colorInt, contrastInt }) {
  const primaryTone = primaryColor.copyWith({ lightness: 0.5 });
  return Object.fromEntries(Object.entries(NEUTRAL_COLORS)
    .map(([l, c]) => [l, color(c)])
    .map(([l, c]) => [l, c.red >= 128 ? c : shiftNeutral(c, contrastInt)])
    .map(([l, c]) => [l, colorInt > 1 ? mix('rgb', {
      start: c,
      end: primaryTone,
      alpha: 0.01 * colorInt,
    }) : c]));
}

function shiftNeutral(clr, int) {
  if (int < 2) return clr;
  const b = 0x20;
  const s = b / 4;
  return sRGBColor.rgb({
    red: clr.red - s * (int - 1),
    green: clr.green - s * (int - 1),
    blue: clr.blue - s * (int - 1),
    alpha: 1,
  });
}

function getContrastIntensity(range, value) {
  return range[0] + (range[1] - range[0]) * ((value - 1) / 4);
}

function getSaturation(initialValue, int) {
  return initialValue * (1 + initialValue * SATURATION_INCREMENTOR * (int - 1));
}

function getSplitComplimentary(clr) {
  return [
    clr.copyWith({ hue: clr.hue - 135 }),
    clr.copyWith({ hue: clr.hue - 180 }),
    clr.copyWith({ hue: clr.hue - 225 }),
  ];
}

module.exports = {
  generateNeutrals,
  getContrastIntensity,
  getSaturation,
  getSplitComplimentary,
};
