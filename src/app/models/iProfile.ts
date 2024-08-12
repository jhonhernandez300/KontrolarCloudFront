import { iUsersProfiles } from "./iUsersProfiles";
import { iOptionsProfiles } from "./iOptionsProfiles";

export interface iProfile {
    idProfile: number;
    codProfile: string;
    nameProfile: string;
    description: string;    
    optionsProfiles?: iOptionsProfiles[];
    usersProfiles?: iUsersProfiles[];  
}