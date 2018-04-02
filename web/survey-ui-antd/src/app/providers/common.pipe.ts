import { Pipe, PipeTransform } from '@angular/core';
import moment from "moment";
import { AuthService } from "./common.service";
import { AppConfig } from "../app.config";


@Pipe({
  name: 'roles'
})
export class RolesPipe implements PipeTransform {
  constructor(
    private config: AppConfig,
    private auth: AuthService,
  ) {
  }
  transform(roles: any, args?: any): any {
    if (!roles) {
      return;
    }
    const loginUser = this.auth.getLoginUser();
    const rolesInSystem = roles[this.config.system];
    if (!rolesInSystem) {
      return undefined;
    }

    return rolesInSystem.join(', ');
  }

}

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  transform(dob: any, args?: any): any {
    if (!dob) {
      return;
    }
    return moment().diff((dob), 'year');
  }

}
