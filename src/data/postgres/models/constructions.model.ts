import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Player } from "./player.model";


@Entity()
export class Construction extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Player, (player) => player.constructions)
  players: Player

  @Column('varchar', {
    length: 255,
    nullable: false,
  })
  name: string

  @Column('varchar', {
    length: 255,
    nullable: false,
  })
  type: string

  @Column('varchar', {
    nullable: false,
  })
  level: number

  @Column('varchar', {
    length: 255,
    nullable: false,
  })
  location: string

  @CreateDateColumn()
  create_at: Date

  @UpdateDateColumn()
  update_at: Date
}