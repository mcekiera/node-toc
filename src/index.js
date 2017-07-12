import fs from 'fs';
import chalk from 'chalk';
import {default as File} from './file';
import {config} from './config';

config('./test/.tocrc');

const file = new File('./test/test.txt');

console.log(file.name());
