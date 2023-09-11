import { makeAutoObservable } from "mobx";
import { authRepository } from "#/repository/auth";
import { TokenUtil } from "#/utils/token";
import {Response} from "superagent";
import jwtDecode from "jwt-decode";

export class AuthStore {
  userData: {
    email: string;
  } = {
    email: "",
  };

  setUserData(accessToken: string) {
    const decodedJwt = jwtDecode<{
      email: string;
    }>(accessToken);
    this.userData.email = decodedJwt?.email ?? "";
  }

  async login(email: string, password: string): Promise<{body: {data: { access_token: string, refresh_token: string, need_setup: boolean }}}> {
    const data = {
      email: email,
      password: password,
    };

    const req = await authRepository.api.login(data);
    console.log(req);
    
    TokenUtil.setAccessToken(req.body.data.access_token);
    TokenUtil.setRefreshToken(req.body.data.refresh_token);
    TokenUtil.persistToken();
    this.setUserData(req.body.data.access_token);

    console.log(req)

    return req;
  }
}