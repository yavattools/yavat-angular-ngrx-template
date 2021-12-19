


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
   userName!: string;
  loginProfile!: LoginResponse;
  constructor(){
    this.loginProfile = new LoginResponse();
  }
}


export class LoginRequest {
  public username!: string;
  public password!: string;
  public ipaddress!: any;
  constructor() {
    this.ipaddress =    {
      ip: "122.171.94.175"
      }
  }
}

// export class LoginResponse {
//   accessToken!: string;
//   tokenType!: string;
//   usersMenus!: Array<UserMenu>;
//   username!: string;
//   processOrgModel!: ProcessOrgModel;
//   loginResponseStatus!: string;
//   statusMessage!: string;
//   statusCode!: string;
//   errorCodeId!: string;
//   userId!: string;
//   profilePic!: string;

//   constructor(){
//     this.usersMenus = new Array<UserMenu>();
//     this.processOrgModel = new ProcessOrgModel();
//   }
// }


export class ListOfScreenMapping {
  screeName!: string;
  enabled!: boolean;

  constructor(){
    this.enabled = true;
  }
}

export class LoginResponseStatus {
  userMailId!: any;
  firstTimeLogin!: boolean;
  clientId!: number;
  branchId!: number;
  branchName!: string;
  processId!: any;
  clientNumber!: any;
  listOfScreenMapping!: ListOfScreenMapping[];

  constructor(){
    this.listOfScreenMapping = new Array<ListOfScreenMapping>();
  }
}

export class LoginResponse {
  accessToken!: string;
  tokenType!: string;
  usersMenus!: any;
  username!: string;
  processOrgModel!: any;
  loginResponseStatus!: LoginResponseStatus;
  statusMessage!: string;
  statusCode!: number;
  errorCodeId!: number;
  userId!: number;
  profilePic!: any;

  constructor(){
    this.loginResponseStatus = new LoginResponseStatus();
  }
}


export interface AuthState {
  isAuthenticated: boolean;
  actionInProgress: boolean;
  loginResponse: LoginResponse;
  account: AccountProfile;
  error: any;
}

