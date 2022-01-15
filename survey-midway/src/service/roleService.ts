import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { DaoService } from './daoService';
import { Role } from '../entity/Role';

@Provide()
export class RoleService extends DaoService {
  @InjectEntityModel(Role)
  model: ReturnModelType<typeof Role>;
}
