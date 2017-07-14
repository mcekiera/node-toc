import fs from 'fs';
import chalk from 'chalk';

export default function(config, pathIn, pathOut) {
  const isFile = (path) => { return /\w+\.\w+$/.test(path); };
  const pathOutput = pathOut || pathIn;

  const purge = (data) => {
    const br = /[\n\r]+/.exec(data)[0],
          content = data.split(/[\n\r]+/),
          output = [],
          regStart = new RegExp(config.tocStart),
          regEnd = new RegExp(config.tocEnd);

    let inToC = false;

    content.forEach((line) => {
      if(regStart.test(line)) {
        inToC = true;
      } 

      if(!inToC) {
        output.push(line);
      }

      if (regEnd.test(line)) {
        inToC = false;
      }
    })

    return output.join(br);
  }

  const purgeFile = (inPath, outPath) => {
    fs.readFile(inPath, 'utf8', (err, data) => {
      if(err) {
        console.log(chalk.red(err));
      } else {
        fs.writeFile(outPath, purge(data), (err) => {
          if(err) {
            console.log(chalk.red(err)); 
          } else {
            console.log(chalk.green(`Output for purged file: ${outPath}`)); 
          };
        });
      }
    });
  }

  const purgeDir = (inPath, outPath) => {
    if(isFile(outPath)) {
      console.log(chalk.red("Invalid output path: path should point to directory")); 
      throw new Error('Invalid path')
    } 
    fs.readdir(pathIn, (err, files) => {
      files.forEach((file) => {
        if(err) {
          console.log(chalk.red(err)); 
        } else if(file.endsWith(config.output.ext)) {
          purgeFile(`${inPath}${file}`, `${outPath}${file}`);
        }
      })
    })
  }
  
  if (isFile(pathIn)) {
    purgeFile(pathIn, pathOutput);
  } else {
    purgeDir(pathIn, pathOutput);
  }
}