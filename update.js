const { exec } = require('child_process');

const clone = function() {
  const clone = exec(
    'git clone http://172.72.100.37:13530/SoftwareDevelopment/gaoxin-cli-resource.git ./resource'
  );
  clone.stdout.on('data', data => {
    console.log(data.toString());
  });
  //git clone http://172.72.100.37:13530/SoftwareDevelopment/gaoxin-cli-resource.git ./resource
  clone.stderr.on('data', data => {
    console.log(data.toString());
  });
};

const update = function() {
  const pull = exec('git pull', { cwd: './resource' });

  pull.stdout.on('data', data => {
    console.log(data.toString());
  });
  //git clone http://172.72.100.37:13530/SoftwareDevelopment/gaoxin-cli-resource.git ./resource
  pull.stderr.on('data', data => {
    console.log(data.toString());
  });
};

module.exports = { clone, update };
