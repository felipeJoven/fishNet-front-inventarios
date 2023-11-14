import { Especies } from "./especies";
import { Proveedor } from "./proveedor";
import { UnidadProductiva } from "./unidad-productiva";

export class Lote {
    fechaSiembra(fechaSiembra: any) {
      throw new Error('Method not implemented.');
    }
    id: number;
    nombreLote: string;
    fechaCreacion: Date;
    fechaRegistro: Date;
    diasDeSiembra: number;
    animalesInicial: number;
    numeroAnimales: string;
    proveedor: Proveedor;
    unidadProductiva: UnidadProductiva;
    especies: Especies;

    }
    