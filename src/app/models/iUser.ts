import { iUsersProfiles } from "./iUsersProfiles";
import { iUserCompany } from "./iUserCompany";

export interface iUser {
    IdUser: number;
    IdentificationNumber: string;
    Names: string;
    Surnames: string;
    UserMaster: boolean;     
    userCompanies?: iUserCompany[];
    usersProfiles?: iUsersProfiles[];
  }