import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ClanMember } from "./clanMember.model";


@Entity()
export class Clan extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  @OneToMany(() => ClanMember, (clanMember) => clanMember.clan)
  clanMembers: ClanMember[]

  @OneToMany(() => ClanMember, member => member.clan)
  members: ClanMember[]

  @Column('varchar', {
    length: 100,
    nullable: false,
  })
  name: string

  @CreateDateColumn()
  create_at: Date

  @UpdateDateColumn()
  update_at: Date
}