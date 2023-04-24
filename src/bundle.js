const fs = require('fs');
const fse = require("fs-extra");

if (!fs.existsSync("dist")){
  fs.mkdirSync("dist");
}

fs.copyFile( 'index.html', 'dist/index.html', () => {});
fse.copySync('images', 'dist/images');
fse.copySync('fonts', 'dist/fonts');
