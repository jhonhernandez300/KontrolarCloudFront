export interface iMenu {
    selec: boolean;
    idOpcion: number;
    idModulo: number;
    nombre: string;
    descripcion: string;
    tieneSubMenu: boolean;
    opcionParametrizable: boolean;
    idPadre: number;
    icono: string;
    controlador: string;
    accion: string;
}
