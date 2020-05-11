module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'authnotify',
  define: {
    timestamp: true,
    underscored: true,
    underscoredAll: true,
  },
};
