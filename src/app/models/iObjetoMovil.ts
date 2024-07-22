import { iMenu } from '../models/iMenu';
import { iModulo } from '../models/iModulo';

export interface iObjOpcionMovil {
    listaOpcionesMoviles: iMenu[];
    listaModulos: iModulo[];
}
