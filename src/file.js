import fs from 'fs';
import readline from 'readline';

export default class TocFile {

  constructor(filePath) {
    const data = fs.readFileSync(filePath, 'utf8').split(/[\n\r]+/);
    const path = filePath;
    const name = filePath.match(/[\w_-]+\.\w+$/)[0];

    this.getData = () => { return data; };
    this.getPath = () => { return path; };
    this.getName = () => { return name; };
    this.getLines = () => {
    return data.map((line, index) => ({
      'index': index + 1,
      'line': line
    }));
  }

  }
  


}