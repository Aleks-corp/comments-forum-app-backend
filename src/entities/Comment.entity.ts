import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  homepage: string;

  @Column()
  text: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;

  @OneToMany(() => Comment, (comment) => comment.parent)
  replies: Comment[]; // Corrected property name

  @Column({ nullable: true })
  parentId: string;

  @ManyToOne(() => Comment, (comment) => comment.replies)
  @JoinColumn({ name: "parentId" })
  parent: Comment;
}
