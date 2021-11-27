


export class UserMenu {
  id!:  string;
  menuId!: string;
  title!: string;
  translate!: string;
  type!: string;
  icon!: string;
  url!: string;
  refMenuId!: string;
  children!: Array<any>;

  constructor(){
    this.children = new Array<any>();
  }
}

export class ProcessOrgModel {
userId!: string;
processId!: string;
orgId!: string;
processName!: string;
}


export class AccountProfile{
   firstName!: string;
   lastName!: string;

  loginProfile!: LoginResponse;
  constructor(){
    this.loginProfile = new LoginResponse();
  }
}


export class LoginRequest {
  public usernameOrEmail!: string;
  public password!: string;
  constructor() {
  }
}

export class LoginResponse {
  accessToken!: string;
  tokenType!: string;
  usersMenus!: Array<UserMenu>;
  username!: string;
  processOrgModel!: ProcessOrgModel;
  loginResponseStatus!: string;
  statusMessage!: string;
  statusCode!: string;
  errorCodeId!: string;
  userId!: string;
  profilePic!: string;

  constructor(){
    this.usersMenus = new Array<UserMenu>();
    this.processOrgModel = new ProcessOrgModel();
  }
}


export interface AuthState {
  isAuthenticated: boolean;
  actionInProgress: boolean;
  loginResponse: LoginResponse;
  account: AccountProfile;
  error: any;
}

