import fs from 'fs';

export default class TocFile {
  constructor(filePath) {
    const data = fs.readFileSync(filePath, 'utf8').split(/[\n\r]+/);
    const path = filePath;
    const name = filePath.match(/[\w_-]+\.\w+$/)[0];

    this.getData = () => data;
    this.getPath = () => path;
    this.getName = () => name;
    this.getLines = () => data.map((line, index) => ({
      index: index + 1,
      line,
    }));
  }
}
