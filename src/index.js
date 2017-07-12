import fs from 'fs';
import chalk from 'chalk';
import {default as File} from './file';
import {getConfiguration} from './config';
import {default as ToC} from './toc';

console.log(chalk.gray(process.argv));
const config = getConfiguration('./test/.tocrc');
const file = new File('./test/test.txt');
const toc = new ToC(file.getLines(), config);

// console.log(file.getData());
// console.log(file.getName());
// console.log(file.getPath());
// console.log(file.getLines());

console.log(toc.processInput().headers[1]);