const { exec } = require('child_process');
const fs = require('fs-extra');
const clone = async function() {
  await fs.emptyDir(__dirname + '/resource');
  console.log('清理文件夹成功');
  const clone = exec(
    'git clone http://172.72.100.37:13530/SoftwareDevelopment/gaoxin-cli-resource.git ./',
    { cwd: __dirname + '/resource' } /* ... */
  );
  clone.stdout.on('data', data => {
    console.log(data.toString());
  });
  clone.stderr.on('data', data => {
    console.log(data.toString());
  });
};

const update = async function() {
  const pull = exec('git pull', { cwd: __dirname + '/resource' } /* ... */);
  pull.stdout.on('data', data => {
    console.log(data.toString());
  });
  pull.stderr.on('data', data => {
    console.log(data.toString());
  });
};

const init = async function() {
  await fs.ensureDir(__dirname + '/resource');
  const exists = await fs.pathExists(__dirname + '/resource/.git');
  if (exists) {
    await update();
  } else {
    await clone();
  }
};

module.exports = { update, init };
