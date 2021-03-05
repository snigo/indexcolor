const { color, contrast } = require('@snigo.dev/color');
const { SYSTEM_COLORS, ALPHAS } = require('./init');
const {
  generateNeutrals,
  getContrastIntensity,
  getSaturation,
  getSplitComplimentary,
} = require('./utils');

function createTheme({ primaryColor, secondaryColor, colorInt, contrastInt}) {
  const primaryRaw = color(primaryColor);
  const secondaryRaw = color(secondaryColor);
  const neutralColors = generateNeutrals({ primaryColor: primaryRaw, colorInt, contrastInt });
  const targetContrast = getContrastIntensity([3, 7], contrastInt);
  const primarySaturation = getSaturation(primaryRaw.saturation, colorInt);
  const secondarySaturation = getSaturation(secondaryRaw.saturation, colorInt);
  const [primary$0] = contrast.find(neutralColors.white, {
    targetContrast,
    saturation: primarySaturation,
    hue: primaryRaw.hue,
  });
  const [primary$1] = contrast.find(neutralColors.carbon, {
    targetContrast,
    saturation: primarySaturation,
    hue: primaryRaw.hue,
  });

  const [secondary$0] = secondaryRaw.alpha
    ? contrast.find(neutralColors.white, {
      targetContrast,
      saturation: secondarySaturation,
      hue: secondaryRaw.hue,
    })
    : [primary$0];
  const [secondary$1] = secondaryRaw.alpha
    ? contrast.find(neutralColors.carbon, {
      targetContrast,
      saturation: secondarySaturation,
      hue: secondaryRaw.hue,
    })
    : [primary$1];
  
  const accent$0 = contrast.max(primary$0, getSplitComplimentary(primary$0).map((c) => c.copyWith({ saturation: 1, lightness: c.lightness + 0.1 })));
  const accent$1 = contrast.max(primary$1, getSplitComplimentary(primary$1).map((c) => c.copyWith({ saturation: 1, lightness: c.lightness + 0.1 })));

  return {
    mode: [
      {
        primary: primary$0,
        secondary: secondary$0,
        accent: accent$0,
        base: neutralColors.white,
        body: neutralColors.snow,
        cloud: neutralColors.cloud,
        line: neutralColors.lightgray,
        aux: neutralColors.silver,
        cite: neutralColors.gray,
        icon: neutralColors.darkgray,
        caption: neutralColors.dimgray,
        head: neutralColors.jet,
        text: neutralColors.carbon,
        white: neutralColors.white,
        black: neutralColors.black,
        info: color(SYSTEM_COLORS.deepblue),
        success: color(SYSTEM_COLORS.green),
        warning: color(SYSTEM_COLORS.red),
        alert: color(SYSTEM_COLORS.amber),
        notification: color(SYSTEM_COLORS.purple),
      },
      {
        primary: primary$1,
        secondary: secondary$1,
        accent: accent$1,
        base: neutralColors.carbon,
        body: neutralColors.blacksnow,
        cloud: neutralColors.blackcloud,
        line: neutralColors.jet,
        aux: neutralColors.dimgray,
        cite: neutralColors.gray,
        icon: neutralColors.metal,
        caption: neutralColors.silver,
        head: neutralColors.lightgray,
        text: neutralColors.white,
        white: neutralColors.white,
        black: neutralColors.black,
        info: color(SYSTEM_COLORS.deepblue),
        success: color(SYSTEM_COLORS.green),
        warning: color(SYSTEM_COLORS.red),
        alert: color(SYSTEM_COLORS.amber),
        notification: color(SYSTEM_COLORS.purple),
      },
    ],
    colors: {
      white: neutralColors.white,
      base: neutralColors.white,
      snow: neutralColors.snow,
      cloud: neutralColors.cloud,
      lightgray: neutralColors.lightgray,
      silver: neutralColors.silver,
      metal: neutralColors.metal,
      gray: neutralColors.gray,
      darkgray: neutralColors.darkgray,
      dimgray: neutralColors.dimgray,
      jet: neutralColors.jet,
      blackcloud: neutralColors.blackcloud,
      blacksnow: neutralColors.blacksnow,
      carbon: neutralColors.carbon,
      black: neutralColors.black,
      deepblue: SYSTEM_COLORS.deepblue,
      green: SYSTEM_COLORS.green,
      red: SYSTEM_COLORS.red,
      amber: SYSTEM_COLORS.amber,
      purple: SYSTEM_COLORS.purple,
    },
    alphas: {
      ghost: ALPHAS.ghost,
      haze: ALPHAS.haze,
      semi: ALPHAS.semi,
      overlay: ALPHAS.overlay,
    },
  };
}

module.exports = createTheme;
