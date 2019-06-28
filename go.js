#! /usr/bin/env node

const program = require('commander');
const chalk = require('chalk');
const log = console.log;
const os = require('os');
const inquirer = require('inquirer');
const dasherize = require('dasherize');
const walk = require('walk');
const fs = require('fs-extra');
let files = [];

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
      .catch(err => console.error(err));
  });
program.parse(process.argv);

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
    // dirStatsArray is an array of `stat` objects with the additional attributes
    // * type
    // * error
    // * name

    next();
  });
  walker.on('file', function(root, fileStats, next) {
    const target = `../${name}/${root.replace(/^src\/java\\|^src\/java/, '')}/${
      fileStats.name
    }`;
    fs.copy(`${root}/${fileStats.name}`, target)
      .then(() => {
        log(target);
      })
      .catch(err => {
        throw err;
      });
    // log(root);
    next();
  });
  walker.on('errors', function(root, nodeStatsArray, next) {
    next();
  });

  walker.on('end', function() {
    console.log('all done');
  });
}
