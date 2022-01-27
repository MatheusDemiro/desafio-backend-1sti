import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { Address } from './address.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 11, unique: true })
    cpf: string;

    @Column({ length: 100 })
    name: string;

    @Column({ length: 15 })
    phone: string;

    @ManyToOne(() => Address, { nullable: false })
    @JoinColumn({ name: 'address_id' })
    address: Address;
}
