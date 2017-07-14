import fs from 'fs';
import chalk from 'chalk';
import {default as File} from './file';
import {getConfiguration} from './config';
import {default as Processor} from './processor';
import {default as purge} from './purge';

console.log(chalk.gray(process.argv));
const config = getConfiguration('./test/.tocrc');
const file = new File('./test/test.txt');
const proc = new Processor(file.getLines(), config);
purge(config, './test/', './testOut/');
// console.log(file.getData());
// console.log(file.getName());
// console.log(file.getPath());

// console.log(file.getLines());

console.log(proc.processInput().headers[0]);