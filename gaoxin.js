#! /usr/bin/env node
const program = require('commander');
const chalk = require('chalk');
const log = console.log;
const os = require('os');
const inquirer = require('inquirer');
const dasherize = require('dasherize');
const figlet = require('figlet');
const { update, init } = require('./update');
const { java, ng, ionic4, ionic3 } = require('./proess-project');
const { updateNg8 } = require('./ng8');
const ver = '2.0.4';
program.version(ver, '-v, --version');
program
  .command('init')
  .description('初始化脚手架,不需要手动执行')
  .action(async function(options) {
    init();
  });
program
  .command('update')
  .description('更新项目资源')
  .action(async function(options) {
    await update();
  });
program
  .command('ng8')
  .description('更新项目到ng8')
  .action(async function(options) {
    await updateNg8();
  });
program
  .command('new')
  .description('创建新项目')
  .action(function(options) {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'name',
          message: '项目名称(请不要使用中文)',
          default: function() {
            return 'demo';
          },
          validate: function(value) {
            if (value === '' || value === null) {
              return '项目名称不可以为空';
            }
            var reg = new RegExp('[\\\\/:*?"<>|]');
            if (reg.test(value)) {
              return '项目名称含有非法字符';
            }
            return true;
          },
          filter: function(val) {
            return dasherize(val.trim());
          },
        },
        {
          type: 'list',
          name: 'type',
          message: '你想安装什么类型的项目呀',
          choices: [new inquirer.Separator(), 'java', 'ng', 'ionic3', 'ionic4'],
        },
      ])
      .then(answer => {
        switch (answer.type) {
          case 'java':
            java(answer);
            break;
          case 'ionic3':
            ionic3(answer);
            break;
          case 'ionic4':
            ionic4(answer);
            break;
          case 'ng':
            ng(answer);
            break;
          default:
            break;
        }
      })
      .catch(err => {
        console.error(err);
        console.error(chalk.red('出大事了!'));
      });
  });
program.on('command:*', function() {
  figlet('gaoxin-cli', function(err, data) {
    if (err) {
      console.log('Something went wrong...');
      console.dir(err);
      return;
    }
    log(chalk.yellow(data));
    log(chalk.bold.red('------------------------------------'));
    log(chalk.bold.green('version:' + ver));
    program.version();
    program.outputHelp();
    process.exit(1);
  });
});
program.parse(process.argv);
