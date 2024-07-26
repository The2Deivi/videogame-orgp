import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Inventory_item } from "./inventoryItem.model";


@Entity()
export class Item extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  @OneToMany(() => Inventory_item, (inventory_item) => inventory_item.item)
  inventory_item: Inventory_item[]

  @Column('varchar', {
    length: 100,
    nullable: false,
  })
  name: string

  @Column('text', {
    nullable: false,
  })
  description: string

  @CreateDateColumn()
  create_at: Date

  @UpdateDateColumn()
  update_at: Date
}