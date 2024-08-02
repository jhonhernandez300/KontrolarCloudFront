import { iUsersProfiles } from "../models/iUsersProfiles";

export interface iOptionsProfiles {
    IdProfile: number;
    CodProfile: string;
    NameProfile: string;
    Description: string;    
    optionsProfiles?: iOptionsProfiles[];
    usersProfiles?: iUsersProfiles[];  
}