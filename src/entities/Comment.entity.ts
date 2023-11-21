import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  homepage: string;

  @Column()
  text: string;

  @OneToMany(() => Comment, (comment) => comment.parent)
  reply: Comment[];

  @Column({ nullable: true })
  parentId: string;

  @ManyToOne(() => Comment, (comment) => comment.reply)
  @JoinColumn({ name: "parentId" })
  parent: Comment;
}
