const inquirer = require('inquirer');
const { color } = require('@snigo.dev/color');
const ora = require('ora');
const path = require('path');
const createTheme = require('./theme');
const { makeDir, copyFromDir, touchFile } = require('./fs');
const compileCSS = require('./compile');

async function main() {
  let spinner;
  try {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'primaryColor',
        message: 'Enter primary color (in any browser readable format)',
        validate: (input) => !!color(input),
      },
      {
        type: 'input',
        name: 'secondaryColor',
        message: 'Enter secondary color (press Enter to skip)',
        default: 'transparent',
        validate: (input) => !!color(input),
      },
      {
        type: 'number',
        name: 'colorInt',
        message: 'Enter color intensity (number from 1 to 9)',
        default: 5,
        validate: (input) => input > 0 && input < 10,
      },
      {
        type: 'number',
        name: 'contrastInt',
        message: 'Enter desired color contrast (number from 1 to 5)',
        default: 3,
        validate: (input) => input > 0 && input < 6,
      },
    ]);
    spinner = ora('Creating the theme....\n').start();
    spinner.color = 'yellow';
    const theme = createTheme(answers);
    const themePath = path.resolve(__dirname, './css/theme');
    await makeDir(themePath);
    await copyFromDir('./sa', themePath);
    await touchFile('./css/theme/sa-theme.css', compileCSS(theme));
    spinner.stop();
    return;
  } catch (err) {
    spinner?.stop();
    console.log(err);
  }
}

main();