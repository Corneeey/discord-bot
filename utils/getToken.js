const fs = require('node:fs');

function getConfigValue(key, configPath = './config.json', envKeys = []) {
  const envKeyCandidates = envKeys.length > 0 ? envKeys : [key.toUpperCase()];
  const envValue = envKeyCandidates
    .map(envKey => process.env[envKey])
    .find(value => value !== undefined && value !== '');

  if (envValue) {
    return envValue;
  }

  if (!fs.existsSync(configPath)) {
    throw new Error(`Missing config value "${key}". Provide it in config.json or via environment variables.`);
  }

  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  const configValue = config[key];

  if (configValue) {
    return configValue;
  }

  throw new Error(`Missing config value "${key}". Provide it in config.json or via environment variables.`);
}

function getToken(configPath = './config.json') {
  return getConfigValue('token', configPath, ['DISCORD_TOKEN', 'TOKEN']);
}

module.exports = { getConfigValue, getToken };
