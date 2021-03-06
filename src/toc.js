export default class ToC {
  constructor(config) {
    const createArray = len => new Array(len).fill(0).map(() => []);

    this.config = config;
    this.title = '';
    this.author = '';
    this.lastUpdate = '';
    this.inStart = { lineNo: 0, match: '' };
    this.inEnd = { lineNo: 0, match: '' };
    this.headers = createArray(this.config.headers.length);
  }
}
