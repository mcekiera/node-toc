export default class ToC {

  constructor(lines, config) {
    this.config = config;
    this.lines = lines;
  }

  getRegExps() {
    const regexps = {
      tocStart: new RegExp(this.config['tocStart']),
      tocEnd: new RegExp(this.config['tocEnd']),
      headers: []
    };

    this.config.headers.forEach((header, index) => { 
      regexps.headers[index] = new RegExp(header.regex);
    });

    return regexps;
  }

  processInput() {
    const r = this.getRegExps();
    const result = {
      tocStart: { index: 0, lvl: 0, match: '' },
      tocEnd: { index: 0, lvl: 0, match: '' },
      headers: []
    }

    let len = this.lines.length;

    for(let i = 0; i < len; i += 1) {
      if (r.tocStart.test(this.lines[i].line)) {

        result.tocStart.index = this.lines[i].index,
        result.tocStart.match = r.tocStart.exec(this.lines[i].line)

      } else if (r.tocEnd.test(this.lines[i].line)) {

        result.tocEnd.index = this.lines[i].index,
        result.tocEnd.match = r.tocEnd.exec(this.lines[i].line)

      } else {

        r.headers.forEach((reg, index) => {
          if(!result.headers[index]) {
            result.headers[index] = [];
          }
          if(reg.test(this.lines[i].line)) {
            result.headers[index].push({
              index: this.lines[i].index,
              lvl: index,
              match: reg.exec(this.lines[i].line)
            });
          }
        });

      }
    }

    return result;
  }
}