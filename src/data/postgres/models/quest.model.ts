import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Player } from "./player.model";
import { Quest_player } from "./questPlayer.model";


@Entity()
export class Quest extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Player, (player) => player.constructions)
  players: Player

  @Column('varchar', {
    length: 255,
    nullable: false,
    unique: true,
  })
  name: string

  @Column('text', {
    nullable: false,
  })
  description: string

  @Column('varchar', {
    length: 255,
    nullable: false,
  })
  reward: string

  @Column('float', {
    nullable: false,
  })
  exp: string

  @OneToMany(() => Quest_player, (quest_player) => quest_player.quest)
  questsPlayer: Quest_player[]

  @CreateDateColumn()
  create_at: Date

  @UpdateDateColumn()
  update_at: Date
}