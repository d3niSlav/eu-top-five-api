import { Entity, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';

import { User } from '../user/user.entity';

@Entity()
export class UserFavorite {
  @PrimaryColumn()
  userId: string;

  @PrimaryColumn()
  teamId: string;

  @ManyToOne(() => User, (user) => user.favorites)
  @JoinColumn({ name: 'userId' })
  user: string;
}
