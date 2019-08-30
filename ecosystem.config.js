module.exports = [{
  name: 'nest-demo',
  script: 'dist/main.js',
  exec_mode: 'cluster',
  instances: 'max',
  merge_logs: true,
  max_memory_restart: '1024M',
  log: 'myoutFile.log',
  port: 3000,
}]