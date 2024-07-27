import { OptionDTO } from "./OptionDTO";

export interface ModuleDTO {
    IdModule: number;
    NameModule: string;
    Icon: string;
    Color: string;
    Options: OptionDTO[];
}