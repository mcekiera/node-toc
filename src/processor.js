import { default as ToC } from './toc';

export default class Processor {

  constructor(lines, config) {
    this.config = config;
    this.lines = lines;
  }

  getRegExps() {
    const regexps = {
      headers: []
    };

    for(param in ['tocStart', 'tocEnd', 'author', 'title']) {
      if(this.config[param] != '') {
        regexps[param] = new RegExp(this.config[param]);
      }
    }

    this.config.headers.forEach((header, index) => { 
      regexps.headers[index] = new RegExp(header.regex);
    });

    return regexps;
  }

  processInput() {
    const r = this.getRegExps();
    const result = new ToC(this.config);
    const len = this.lines.length;
    const inFile = this.config.inFile;
    let i;

    const update = (param) => {
      result[param] = {
        lineNo: this.lines[i].index,
        match: r[param].exec(this.lines[i].line)
      }
    }

    const is = (param) => {
      r[param] &&  r[param].test(this.lines[i].line)
    }

    for(i = 0; i < len; i += 1) {
      if(inFile) {
        for(param in ['tocStart', 'tocEnd', 'author', 'title']) {
          if (is(param)) {
            update(param);
          }
        }
      } 

      r.headers.forEach((reg, index) => {
        if(reg.test(this.lines[i].line)) {
          result.headers[index].push({
            index: this.lines[i].index,
            lvl: index,
            match: reg.exec(this.lines[i].line)
          });
        }
      });
    }

    return result;
  }
}