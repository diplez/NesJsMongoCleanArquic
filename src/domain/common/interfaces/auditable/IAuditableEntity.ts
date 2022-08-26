/**
 * Datos para guardar en base
 */
export interface IAuditableEntity
{
    createdOn: Date;
    lastModifiedOn: Date;        
    createdBy: string;
}