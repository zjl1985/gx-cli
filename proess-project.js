const { copyFile } = require('./proess-flie');

const java = function(answer) {
  const name = answer.name;
  const projectPath = process.cwd() + '/' + name;
  const walkPath = __dirname + '/resource/java';
  copyFile(walkPath, projectPath, name, /^resource\/java\\|^resource\/java/);
};

const ng = function(answer) {
  const name = answer.name;
  const projectPath = process.cwd() + '/' + name;
  const walkPath = __dirname + '/resource/ng-new';
  copyFile(
    walkPath,
    projectPath,
    name,
    /^resource\/ng-new\\|^resource\/ng-new/
  );
};

const ionic3 = function(answer) {
  const name = answer.name;
  const projectPath = process.cwd() + '/' + name;
  const walkPath = __dirname + '/resource/ionic3';
  copyFile(
    walkPath,
    projectPath,
    name,
    /^resource\/ionic3\\|^resource\/ionic3/
  );
};

const ionic4 = function(answer) {
  const name = answer.name;
  const projectPath = process.cwd() + '/' + name;
  const walkPath = __dirname + '/resource/ionic4';
  copyFile(
    walkPath,
    projectPath,
    name,
    /^resource\/ionic4\\|^resource\/ionic4/
  );
};

module.exports = { java, ng, ionic4, ionic3 };
