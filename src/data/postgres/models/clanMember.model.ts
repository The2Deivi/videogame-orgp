import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Clan } from "./clans.model";
import { Player } from "./player.model";

export enum ClanMemberRole {
  MASTER = 'MASTER',
  OFFICER = 'OFFICER',
  SUBOFFICER = 'SUBOFFICER',
  MEMBER = 'MEMBER'
}

@Entity()
export class ClanMember extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Clan, (clan) => clan.clanMembers)
  clan: Clan

  @ManyToOne(() => Player, (player) => player.clanMembers)
  player: Player

  @Column({
    type: 'enum',
    enum: ClanMemberRole,
    default: ClanMemberRole.MEMBER
  })
  role: ClanMemberRole

  @CreateDateColumn()
  create_at: Date

  @UpdateDateColumn()
  update_at: Date
}