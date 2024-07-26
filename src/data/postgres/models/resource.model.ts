import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Inventory_resource } from "./inventoryResource.model";


@Entity()
export class Resource extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  @OneToMany(() => Inventory_resource, (inventory_resource) => inventory_resource.resource)
  inventory_resource: Inventory_resource[]

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