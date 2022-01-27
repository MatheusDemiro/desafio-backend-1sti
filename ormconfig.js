const config = {
    type: 'mysql',
    database: process.env.MYSQL_DATABASE,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_LOCAL_PORT),
    synchronize: false,
    logging: true,
    entities: ['dist/infrastructure/database/entities/*.entity.js'],
    migrations: ['dist/infrastructure/database/migrations/*.js'],
    cli: {
        migrationsDir: 'src/infrastructure/database/migrations',
        entitiesDir: 'src/infrastructure/database/entities',
    },
};

module.exports = config;
