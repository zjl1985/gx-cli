import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserInfo} from "../pages/login/loginEntity";

@Injectable()
export class GlobalConfig {
  public static ApiURL = '';

  public static USERINFO: UserInfo;

  public static handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  constructor(public http: HttpClient) {
  }
}
