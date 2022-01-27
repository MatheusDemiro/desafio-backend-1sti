import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('addresses')
export class Address {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'zip_code', length: 8, unique: true })
    zipCode: string;

    @UpdateDateColumn({ name: 'update_at' })
    updateAt: string;

    @Column({ length: 200 })
    street: string;

    @Column({ length: 100 })
    city: string;

    @Column({ length: 100 })
    state: string;
}
