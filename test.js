const fs = require('fs-extra');

async function example () {
  try {
    await fs.emptyDir('./resource')
    console.log('success!')
  } catch (err) {
    console.error(err)
  }
}

example()