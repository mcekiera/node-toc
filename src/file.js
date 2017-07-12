import fs from 'fs';
import readline from 'readline';

export default class TocFile {

  constructor(filePath) {
    this.path = filePath;
  }
  data = (fs.readFileSync(filePath, 'utf8').split(/[\n\r]+/))();
  name = (() => filePath.match(/[\w_-]+\.\w+$/)[0])();
  getLines = () => {
    return this.data.map((line, index) => ({
      'index': index + 1,
      'line': line
    }));
  }

}