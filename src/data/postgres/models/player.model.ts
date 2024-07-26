import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.model";
import { Construction } from "./constructions.model";
import { Quest_player } from "./questPlayer.model";
import { ClanMember } from "./clanMember.model";
import { Inventory } from "./inventory.model";

@Entity()
export class Player extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User, (user) => user.players)
  user: User

  @OneToMany(() => ClanMember, (clanMember) => clanMember.player)
  clanMembers: ClanMember[]

  @Column('varchar', {
    length: 80,
    nullable: false,
    unique: true,
  })
  name: string

  @Column('varchar', {
    nullable: false,
    default: 1
  })
  level: number

  @Column('int', {
    nullable: false,
    default: 0
  })
  experience: number

  @Column('float', {
    nullable: false,
    default: 80
  })
  health: number

  @Column('float', {
    nullable: false,
    default: 100
  })
  energy: number

  @OneToMany(() => Construction, (construction) => construction.players)
  constructions: Construction[]

  @OneToMany(() => Quest_player, (quest_player) => quest_player.player)
  quest_players: Quest_player[]

  @OneToOne(() => Inventory, (inventory) => inventory.player)
  inventory: Inventory

  @CreateDateColumn()
  create_at: Date

  @UpdateDateColumn()
  update_at: Date
}