const walk = require('walk');
const fs = require('fs-extra');
const replace = require('replace-in-file');
const chalk = require('chalk');
const figlet = require('figlet');

const copyFile = function(walkPath, projectPath, name, needReplace) {
  walker = walk.walk(walkPath, {
    followLinks: false,
  });
  walker.on('names', function(root, nodeNamesArray) {
    nodeNamesArray.sort(function(a, b) {
      if (a > b) return 1;
      if (a < b) return -1;
      return 0;
    });
  });
  walker.on('directories', function(root, dirStatsArray, next) {
    next();
  });
  walker.on('file', function(root, fileStats, next) {
    const path = root
      .replace(__dirname + '/', '')
      .replace(needReplace, '')
      .replace('__name__', name);
    const target = `${projectPath}/${path}/${fileStats.name}`;

    fs.copy(`${root}/${fileStats.name}`, target)
      .then(() => {
        next();
      })
      .catch(err => {
        console.error(chalk.red('复制文件出现错误'));
        throw err;
      });
  });
  walker.on('errors', function(root, nodeStatsArray, next) {
    next();
  });

  walker.on('end', function() {
    const options = {
      files: `${projectPath}/**/**`,
      from: /{{{name}}}/g,
      to: name,
      ignore: '**/assets/**',
    };
    replace(options)
      .then(results => {
        console.log(chalk.green('项目创建成功!你可以使用了!'));
        figlet('Enjoy', function(err, data) {
          if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
          }
          console.log(data);
          process.exit(1);
        });
      })
      .catch(err => {
        console.error(chalk.red('替换文件出现错误!'));
        throw err;
      });
  });
};

module.exports = { copyFile };
