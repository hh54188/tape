const fs = require('fs')
const path = require('path')
const envFilePath = path.join(__dirname, '.env');

function convertEnvContentToJson() {
  const envFileExist = fs.existsSync(envFilePath)
  if (!envFileExist) {
    console.log('======> .env file not exist <======')
    process.exit(1)
  }

  const envObj = {};
  const envFileContent = fs.readFileSync(envFilePath, 'utf-8');
  envFileContent
    .split('\r\n')
    .filter(variable => !!variable)
    .forEach(variable => {
      const [key, value] = variable.split('=')
      envObj[key] = value;
    })
  return envObj;
}


module.exports = {
  apps: [{
    name: 'tenet',
    script: 'dist/index.js',
    env: convertEnvContentToJson()
  }],
}
