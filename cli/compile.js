function compileCSS(theme) {
  let output = '';
  let ind = 0;
  output = concat(output, ':root {', ind++);
  Object.entries(theme.colors).forEach(([name, clr]) => {
    output = concat(output, `--colors-${name}: ${typeof clr === 'object' ? clr.toHexString() : clr};`, ind);
  });
  output = concat(output, '}', --ind);
  output = concat(output, '\n', ind);
  theme.mode.forEach((themeMode, i) => {
    output = concat(output, `[sa-theme-mode="${i}"] {`, ind++);
    Object.entries(themeMode).forEach(([label, clr]) => {
      output = concat(output, `--color-${label}: ${clr.toHexString()};`, ind);
      Object.entries(theme.alphas).forEach(([alphaLabel, alpha]) => {
        output = concat(output, `--color-${label}-${alphaLabel}: ${clr.withAlpha(alpha).toHexString()};`, ind);
      });
      output = concat(output, `--color-${label}-lighter: ${clr.copyWith({ lightness: clr.lightness + 0.06 }).toHexString()};`, ind);
      output = concat(output, `--color-${label}-darker: ${clr.copyWith({ lightness: clr.lightness - 0.06 }).toHexString()};`, ind);
    });
    output = concat(output, '}', --ind);
    output = concat(output, '\n', ind);
  });
  return output;
}

function concat(src, line, ind) {
  return src + ' '.repeat(ind * 2) + line + '\n';
}

module.exports = compileCSS;
