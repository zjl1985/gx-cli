#! /usr/bin/env node

const program = require('commander');
const chalk = require('chalk');
const log = console.log;
const os = require('os');
const inquirer = require('inquirer');
const dasherize = require('dasherize');
const walk = require('walk');
let files = [];

program
  .version('0.0.1', '-v, --version')
  .option('-n,new', '创建项目')
  .parse(process.argv);

if (program.new) {
  select();
} else {
  program.outputHelp();
  process.exit();
}

async function select() {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'type',
      message: '你想安装什么类型的项目呀?',
      choices: [new inquirer.Separator(), 'java', 'ng', 'ionic3', 'ionic4'],
    },
  ]);

  switch (answers.type) {
    case 'java':
      java();
    default:
      process.exit();
  }

  return answers;
}
function java() {
  log(chalk.magenta.bold('原来要安装java项目呀'));
  log(dasherize('helloWorld'));
  tong();

  //   aa();
  //   const urlPath = './src/java'
  //   const options = {
  //     name: 'demo-demo',
  //   }
  //   const path = 'heheheh'
}

function tong() {
  var options = {
    listeners: {
    //   names: function(root, nodeNamesArray) {
    //     nodeNamesArray.sort(function(a, b) {
    //       if (a > b) return 1;
    //       if (a < b) return -1;
    //       return 0;
    //     });
    //   },
      directories: function(root, dirStatsArray, next) {
        // dirStatsArray is an array of `stat` objects with the additional attributes
        // * type
        // * error
        // * name
        next();
      },
      file: function(root, fileStats, next) {
        // console.log(root, fileStats.name);
      },
      errors: function(root, nodeStatsArray, next) {
        next();
      },
    },
  };

  walker = walk.walkSync('./src/java', options);
  console.log('all done');
}
