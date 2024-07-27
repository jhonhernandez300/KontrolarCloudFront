export interface iMenu {
    idOption: number;
    icon: string;
    nameOption: string;
    description: string;
    controler: string;
    action: string;
    orderBy: number;
    userAssigned: string;
    tieneSubMenu?: boolean;
    idPadre?: number;
}

