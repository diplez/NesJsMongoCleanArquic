/**
 * Objeto para acceder a datos de base con busqueda perzonalizada
 * @summary Objeto para acceder a datos de base con busqueda perzonalizada
 * @description Objeto para acceder a datos de base con busqueda perzonalizada
 */
export class FilesGroupTotalDto{
    _id: Identifier;
    total: number;
    sizeFiles: number;
}

class Identifier {
    tfile: string;
    troom: string;
}