import { Repository } from 'typeorm';

import { User } from './user.entity';
import { CustomRepository } from '../../common/decorators/typeorm.decorator';

@CustomRepository(User)
export class UserRepository extends Repository<User> {}
