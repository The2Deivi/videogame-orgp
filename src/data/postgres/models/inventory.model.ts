import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Player } from "./player.model";
import { Inventory_item } from "./inventoryItem.model";
import { Inventory_resource } from "./inventoryResource.model";


@Entity()
export class Inventory extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  @OneToMany(() => Inventory_item, (inventory_item) => inventory_item.inventory)
  inventory_item: Inventory_item[]

  @OneToMany(() => Inventory_resource, (inventory_resource) => inventory_resource.inventory)
  inventory: Inventory_resource[]

  @OneToOne(() => Player, (player) => player.inventory)
  @JoinColumn()
  player: Player

  @Column('int', {
    nullable: false,
    default: 1
  })
  quantity: number

  @CreateDateColumn()
  create_at: Date

  @UpdateDateColumn()
  update_at: Date
}