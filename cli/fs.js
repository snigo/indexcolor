const fs = require('fs');
const path = require('path');

function makeDir(path) {
  return new Promise((res, rej) => {
    fs.mkdir(path, { recursive: true }, (err) => {
      if (err) rej(err);
      res(true);
    });
  });
}

async function copyFromDir(src, dest) {
  const files = await readDir(src);
  return Promise.all(files.map((file) => new Promise((res, rej) => {
    fs.copyFile(path.resolve(__dirname, `${src}/${file}`), `${dest}/${file}`, (err) => {
      if (err) rej(err);
      res(true);
    });
  })));
}

function readDir(src) {
  return new Promise((res, rej) => {
    fs.readdir(src, (err, files) => {
      if (err) rej(err);
      res(files);
    });
  });
}

function touchFile(path, data) {
  return new Promise((res, rej) => {
    fs.writeFile(path, data, (err) => {
      if (err) rej(err);
      res(true);
    });
  });
}

module.exports = {
  makeDir,
  copyFromDir,
  touchFile,
};
