export class LoginStatus {
  failed: boolean;
  msg: string;
}

export class UserInfo {
  id: string;
  userAccount: string;
  password: string;
  name: string;
  enabled: boolean;
  tel: string;
  email: string;
  customerId: string;
  orgId: string;
  orgName: string;
  lastLoginDate: string;
  createDate: string;
  remark: string;
  sync: boolean;
  menu: any;
}

export class Resource {
  id: string;
  name: string;
  enabled: boolean;
  menuIcon: string;
  url: any;
  orderNo: number;
}
