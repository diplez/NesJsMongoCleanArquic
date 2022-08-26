/**
 * Utilidaddes de paginacion
 */
export class PaginationUtils {  

  static fromSkipToPage(skip: number, limit: number): number{
    return skip>0?((skip-1)*limit):skip*limit;
  }
}