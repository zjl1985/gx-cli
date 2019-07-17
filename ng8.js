const fs = require('fs-extra');
const inquirer = require('inquirer');

const chalk = require('chalk');

const updateNg8 = async function() {
  try {
    const exists = await fs.pathExists('./package.json');
    if (exists) {
      const package = await fs.readJson(`./package.json`);
      if (package['scripts'].hasOwnProperty('color-less')) {
        const answer = await inquirer.prompt([
          {
            type: 'confirm',
            name: 'needUpdate',
            message: '监测到你好像更新过,依旧要执行更新吗(回车默认更新)',
          },
        ]);
        if (answer.needUpdate) {
          await doUpdate();
        } else {
          console.log(chalk.yellow.bold('取消更新,再见！🍔'));
          process.exit(1);
        }
      } else {
        await doUpdate();
      }
    } else {
      console.log(`
      ${chalk.red('🤬没有在当前目录找到package.json文件,我建议你好好想想吧！')}
      ${chalk.red.bold('擦亮你的双眼！😆')}
      `);
    }
  } catch (err) {
    console.error(err);
  }
};


async function doUpdate() {
  await deleteSomething();
  await copyNewFile();
  await rebuildPackageJson();
}

async function deleteSomething() {
  const ng8 = await fs.readJson(`${__dirname}/resource/ng8/ng8.json`);
  for (const scr of ng8.needDelete) {
    await deleteFile('.' + scr);
  }
}

async function deleteFile(src) {
  try {
    await fs.remove(src);
    console.log(chalk.green(`删除[${src}]成功😊`));
  } catch (err) {
    console.error(chalk.red(`删除[${src}]失败😥`));
    throw err;
  }
}
async function copyNewFile() {
  try {
    await fs.copy(`${__dirname}/resource/ng8/resource/`, './');
    console.log(chalk.blue(`覆盖新文件成功😊`));
  } catch (err) {
    console.error(chalk.red(`覆盖新文件失败😥`));
    throw err;
  }
}

async function rebuildPackageJson() {
  try {
    const newAndOld = [
      fs.readJson(`${__dirname}/resource/ng8/package.json`),
      fs.readJson(`./package.json`),
    ];
    const [newPackage, oldPackage] = await Promise.all(newAndOld);
    const outPut = {};
    const different = {
      dependencies: {},
      devDependencies: {},
    };
    const dontUpdate = ['name', 'version', 'description', 'author'];
    for (const key in oldPackage) {
      if (newPackage.hasOwnProperty(key)) {
        if (key === 'lint-staged') {
          outPut[key] = newPackage[key];
          continue;
        }
        if (key === 'dependencies') {
          outPut['dependencies'] = {};
          judgeDep(oldPackage, key, newPackage, outPut, different);
          continue;
        }
        if (key === 'devDependencies') {
          outPut['devDependencies'] = {};
          judgeDep(oldPackage, key, newPackage, outPut, different);
          continue;
        }
        if (dontUpdate.includes(key)) {
          outPut[key] = oldPackage[key];
        } else {
          outPut[key] = newPackage[key];
        }
      } else {
        console.log(chalk.yellow(`😱删除多余属性[${key}]`));
      }
    }
    await fs.writeJson('./package.json', outPut, { spaces: 2, EOL: '\n' });
    if (
      Object.keys(different.dependencies).length > 0 ||
      Object.keys(different.devDependencies).length > 0
    ) {
      await fs.ensureDir('./backup');
      await fs.writeJson('./backup/package-different.json', different, {
        spaces: 2,
        EOL: '\n',
      });
      console.log(
        chalk.bgMagenta.white(
          '🙄发现无法判断的引用,请手动添加，并且建议使用最新的版本',
        ),
      );
      console.log(`dependencies:[${Object.keys(different.dependencies)}]`);
      console.log(
        `devDependencies:[${Object.keys(different.devDependencies)}]`,
      );
      console.log(
        chalk.bgMagenta.white.bold(
          '具体请查看[./backup/package-different.json]内容',
        ),
      );
    }
    console.log(chalk.green(`重构package.json文件成功😊`));
  } catch (err) {
    console.error(chalk.red(`处理package.json文件的时候出错了😥`));
    throw err;
  }

  function judgeDep(oldPackage, key, newPackage, outPut, different) {
    for (const dependenciesKey in oldPackage[key]) {
      if (newPackage[key].hasOwnProperty(dependenciesKey)) {
        outPut[key][dependenciesKey] = newPackage[key][dependenciesKey];
      } else {
        different[key][dependenciesKey] = oldPackage[key][dependenciesKey];
      }
    }
  }
}

const backupImportantFile = async function() {};

module.exports = { updateNg8 };
