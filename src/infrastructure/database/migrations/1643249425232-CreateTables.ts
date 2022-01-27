import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTables1643249425232 implements MigrationInterface {
    name = 'CreateTables1643249425232'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`addresses\` (\`id\` int NOT NULL AUTO_INCREMENT, \`zip_code\` varchar(8) NOT NULL, \`update_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`street\` varchar(200) NOT NULL, \`city\` varchar(100) NOT NULL, \`state\` varchar(100) NOT NULL, UNIQUE INDEX \`IDX_32cd7ff70fa32ba6486b6e077a\` (\`zip_code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`cpf\` varchar(11) NOT NULL, \`name\` varchar(100) NOT NULL, \`phone\` varchar(15) NOT NULL, \`address_id\` int NOT NULL, UNIQUE INDEX \`IDX_230b925048540454c8b4c481e1\` (\`cpf\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_1b05689f6b6456680d538c3d2ea\` FOREIGN KEY (\`address_id\`) REFERENCES \`addresses\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_1b05689f6b6456680d538c3d2ea\``);
        await queryRunner.query(`DROP INDEX \`IDX_230b925048540454c8b4c481e1\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_32cd7ff70fa32ba6486b6e077a\` ON \`addresses\``);
        await queryRunner.query(`DROP TABLE \`addresses\``);
    }

}
