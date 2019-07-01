const { exec } = require('child_process');
const fs = require('fs-extra');
const clone = async function() {
  await fs.emptyDir('./resource');
  console.log('清理文件夹成功');
  const clone = exec(
    'git clone http://172.72.100.37:13530/SoftwareDevelopment/gaoxin-cli-resource.git ./',
    { cwd: './resource' } /* ... */
  );
  clone.stdout.on('data', data => {
    console.log(data.toString());
  });
  //git clone http://172.72.100.37:13530/SoftwareDevelopment/gaoxin-cli-resource.git ./resource
  clone.stderr.on('data', data => {
    console.log(data.toString());
  });
};

const update = async function() {
  await fs.ensureDir('./resource');
  const exists = await fs.pathExists('./resource/.git');
  if (exists === true) {
    const pull = exec('git status', { cwd: './resource' } /* ... */);

    pull.stdout.on('data', data => {
      console.log(data.toString());
    });
    //git clone http://172.72.100.37:13530/SoftwareDevelopment/gaoxin-cli-resource.git ./resource
    pull.stderr.on('data', data => {
      console.log(data.toString());
    });
  } else {
    await clone();
  }
};

module.exports = { update };
