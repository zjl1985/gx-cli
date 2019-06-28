#! /usr/bin/env node
const program = require('commander');
const chalk = require('chalk');
const log = console.log;
const os = require('os');
const inquirer = require('inquirer');
const dasherize = require('dasherize');
const walk = require('walk');
const fs = require('fs-extra');
const replace = require('replace-in-file');
const figlet = require('figlet');
program
  .version('0.0.1', '-v, --version')
  .command('new')
  .description('创建新项目')
  .option('-n,--name', '项目名称')
  .action(function(options) {
    const target = '../test/test.txt';
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'name',
          message: '项目名称',
          filter: function(val) {
            return dasherize(val);
          },
        },
        {
          type: 'list',
          name: 'type',
          message: '你想安装什么类型的项目呀',
          choices: [new inquirer.Separator(), 'java', 'ng', 'ionic3', 'ionic4'],
        },
        {
          type: 'checkbox',
          name: 'project',
          message: '请选择要安装的东西',
          choices: [
            new inquirer.Separator(' = 按空格选择 = '),
            'api',
            'business',
            'web',
            'ng',
          ],
        },
      ])
      .then(answer => {
        if (answer.type === 'java') {
          whenJava(answer.name);
        }
      })
      .catch(err => {
        console.error(err);
        console.error(chalk.red('出大事了!'));
      });
  });
program.parse(process.argv);
figlet('gaoxin-cli', function(err, data) {
  if (err) {
    console.log('Something went wrong...');
    console.dir(err);
    return;
  }
  console.log(data);
  program.outputHelp();
});

function whenJava(name) {
  walker = walk.walk('src/java', { followLinks: false });
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
      .replace(/^src\/java\\|^src\/java/, '')
      .replace('__name__', dasherize(name));
    const target = `../${name}/${path}/${fileStats.name}`;
    fs.copy(`${root}/${fileStats.name}`, target)
      .then(() => {
        log(target);
      })
      .catch(err => {
        console.error(chalk.red('出大事了!'));
        throw err;
      });
    // log(root);
    next();
  });
  walker.on('errors', function(root, nodeStatsArray, next) {
    next();
  });

  walker.on('end', function() {
    const options = {
      files: `../${dasherize(name)}/**/**`,
      from: /{{{name}}}/g,
      to: dasherize(name),
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
        });
      })
      .catch(err => {
        console.error(chalk.red('出大事了!'));
        throw err;
      });
  });
}
