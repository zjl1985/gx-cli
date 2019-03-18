import { NgModule } from '@angular/core';

import { CommonModule } from "@angular/common";

import { UsermanagerModule } from './usermanager/usermanager.module';
import { SystemparameterModule } from './systemparameter/systemparameter.module';
import { UnitModule } from './unit/unit.module';
import { RolesModule } from './roles/roles.module';
import { ResourcesModule } from './resources/resources.module';
import { UserModule } from './user/user.module';
import { OrganizationModule } from './organization/organization.module';
import { LogModule } from './log/log.module';
import { DictionaryModule } from './dictionary/dictionary.module';
import { CustomerModule } from './customer/customer.module';

const MYMODULES = [
  UsermanagerModule,
  SystemparameterModule,
  UnitModule,
  RolesModule,
  ResourcesModule,
  UserModule,
  OrganizationModule,
  LogModule,
  DictionaryModule,
  CustomerModule
];

@NgModule({
  imports: [
    CommonModule,
    ...MYMODULES
  ],
  exports:[...MYMODULES]
})

export class MyModuleModule {

}
