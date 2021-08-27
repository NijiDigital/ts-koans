const setup = () => {
  const env = { CONFIG_ENV: 'test', NODE_ENV: 'production' }
  for (let key in env) {
    process.env[key] = env[key]
  }
}

module.exports = setup
