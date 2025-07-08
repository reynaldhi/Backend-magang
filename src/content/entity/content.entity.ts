import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { TypeContent } from '../../typeContent/entity/typeContent.entity';
import { Company } from '../../company/entity/company.entity';

@Entity()
export class Content {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(
    () => {
      return TypeContent;
    },
    (typeContent) => {
      return typeContent.content;
    },
  )
  typeContent: TypeContent;

  @ManyToOne(
    () => {
      return Company;
    },
    (company) => {
      return company.content;
    },
    { nullable: true },
  )
  company?: Company;

  @Column()
  title: string;

  @Column()
  contents: string;

  @Column({ type: 'json' })
  img_url: string[];

  @Column({ nullable: true })
  deadline?: Date;

  @Column()
  status?: boolean;

  @CreateDateColumn({
    type: 'timestamp with time zone',
    nullable: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
    nullable: false,
  })
  updatedAt: Date;

  @DeleteDateColumn({
    type: 'timestamp with time zone',
    nullable: true,
  })
  deletedAt: Date;
}
