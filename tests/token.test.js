const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { getConfigValue, getToken } = require('../utils/getToken');

test('prefers an environment variable token over config.json', () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'discord-bot-'));
  const configPath = path.join(tempDir, 'config.json');
  fs.writeFileSync(configPath, JSON.stringify({ token: 'config-token' }));

  const previousToken = process.env.DISCORD_TOKEN;
  process.env.DISCORD_TOKEN = 'env-token';

  try {
    assert.equal(getToken(configPath), 'env-token');
  } finally {
    if (previousToken === undefined) {
      delete process.env.DISCORD_TOKEN;
    } else {
      process.env.DISCORD_TOKEN = previousToken;
    }
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

test('falls back to config.json when no environment variable is set', () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'discord-bot-'));
  const configPath = path.join(tempDir, 'config.json');
  fs.writeFileSync(configPath, JSON.stringify({ token: 'config-token' }));

  const previousToken = process.env.DISCORD_TOKEN;
  delete process.env.DISCORD_TOKEN;

  try {
    assert.equal(getToken(configPath), 'config-token');
  } finally {
    if (previousToken === undefined) {
      delete process.env.DISCORD_TOKEN;
    } else {
      process.env.DISCORD_TOKEN = previousToken;
    }
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

test('throws a clear error when no token is available', () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'discord-bot-'));
  const configPath = path.join(tempDir, 'config.json');
  fs.writeFileSync(configPath, JSON.stringify({}));

  const previousToken = process.env.DISCORD_TOKEN;
  delete process.env.DISCORD_TOKEN;

  try {
    assert.throws(() => getToken(configPath), /Missing config value "token"/);
  } finally {
    if (previousToken === undefined) {
      delete process.env.DISCORD_TOKEN;
    } else {
      process.env.DISCORD_TOKEN = previousToken;
    }
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

test('supports environment variables for other config values', () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'discord-bot-'));
  const configPath = path.join(tempDir, 'config.json');
  fs.writeFileSync(configPath, JSON.stringify({ roleName: 'config-role' }));

  const previousRoleName = process.env.DISCORD_ROLE_NAME;
  process.env.DISCORD_ROLE_NAME = 'env-role';

  try {
    assert.equal(getConfigValue('roleName', configPath, ['DISCORD_ROLE_NAME']), 'env-role');
  } finally {
    if (previousRoleName === undefined) {
      delete process.env.DISCORD_ROLE_NAME;
    } else {
      process.env.DISCORD_ROLE_NAME = previousRoleName;
    }
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});
