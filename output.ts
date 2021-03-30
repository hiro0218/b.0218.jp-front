const fs = require('fs-extra');

const DEST_DIR = './src/static';
const SRC_DIR = './src/_source';

const copyFile = (filename: string) => {
  fs.copyFileSync(`${SRC_DIR}/${filename}`, `${DEST_DIR}/${filename}`);
  console.log(`output.js: ${SRC_DIR}/${filename} to ${DEST_DIR}/${filename}`);
};

try {
  // feed
  copyFile(`atom.xml`);
  copyFile(`rss.xml`);
  copyFile(`feed.json`);

  // sitemap
  copyFile(`sitemap.xml`);
  copyFile(`sitemap.xsl`);
  copyFile(`post-sitemap.xml`);
  copyFile(`tag-sitemap.xml`);
  copyFile(`category-sitemap.xml`);
} catch (error) {
  console.log(error);
}