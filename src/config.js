import fs from 'fs';
import chalk from 'chalk';

const warning = chalk.red;
const success = chalk.green;


function getConfiguration(path) {
    try {
      let result = JSON.parse(fs.readFileSync(path, 'utf8'));
      console.log(success('Config loaded'));
      return result;
    } catch (err) {
      console.log(warning(err));
      console.log(warning('process exit'));
      process.exit();
    }
}

export {getConfiguration};