import fs from 'fs';
import chalk from 'chalk';

const warning = chalk.red;

function config(path) {
  if (path == null || !fs.existsSync(path)) {
    console.log(warning('Config file not found: ' + path));
    process.exit();
  } else {
    let conf = fs.readFileSync(path, 'utf8');
    try {
      JSON.parse(conf);
    } catch (err) {
      console.log(warning('Invalid config json:' + err));
      process.exit();
    }
  }
}

export {config};