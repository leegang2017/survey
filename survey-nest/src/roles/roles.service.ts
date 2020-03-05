import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from './schemas/roles.schema';
import { DaoService } from 'src/common/daoService';

@Injectable()
export class RolesService extends DaoService<Role>{
    constructor(@InjectModel('roles') private readonly roleModel: Model<Role>) { 
        super(roleModel);
    }


}
