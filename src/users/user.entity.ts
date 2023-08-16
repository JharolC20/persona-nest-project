import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("persona")
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 25 })
    nombre: string;

    @Column({ length: 50 })
    apellido: string;

    @Column()
    edad: number;
}
