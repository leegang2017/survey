import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleSchema } from './schemas/roles.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'roles', schema: RoleSchema }])],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}
