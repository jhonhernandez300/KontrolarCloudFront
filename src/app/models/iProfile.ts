import { iUsersProfiles } from "./iUsersProfiles";
import { iOptionsProfiles } from "./iOptionsProfiles";

export interface iProfile {
    IdProfile: number;
    CodProfile: string;
    NameProfile: string;
    Description: string;    
    optionsProfiles?: iOptionsProfiles[];
    usersProfiles?: iUsersProfiles[];  
}