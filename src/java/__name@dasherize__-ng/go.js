const fs = require('fs-extra');

fs.copy('dist', '../release/dist', function(err) {
  if (err) return console.error(err);
  console.info('拷贝前端包成功');
});

const path = '../demo-web/target/';
let files = [];
try {
  files = fs.readdirSync(path);
} catch (err) {}
if (files.length > 0) {
  var reg = new RegExp('.war$');
  for (const name of files) {
    if (reg.test(name))
      fs.stat(path + name, (err, stats) => {
        if (!err) {
          if (stats.isFile()) {
            fs.copy(
              '../demo-web/target/'+name,
              '../release/'+name,
              function(err) {
                if (err) return console.error(err);
                console.info('拷贝war包成功');
              },
            );
           return false;
          }
        }
      });
  }
}
