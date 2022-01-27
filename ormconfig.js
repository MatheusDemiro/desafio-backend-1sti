const config = {
    type: 'mysql',
    database: process.env.MYSQL_DATABASE || 'desafio_1sti',
    username: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_ROOT_PASSWORD || 'password',
    host: process.env.MYSQL_HOST || 'localhost',
    port: parseInt(process.env.MYSQL_LOCAL_PORT) || 3306,
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
