import { Prop } from "@nestjs/mongoose";
import { Document, ObjectId } from "mongoose";
import { IAuditableEntity } from "../../interfaces/auditable/IAuditableEntity";

/**
 * Implementación de datos auditables
 */
export class AuditableEntity extends Document implements IAuditableEntity {    
   
  @Prop({default: Date.now()})
  public createdOn: Date;

  @Prop({default: Date.now()})
  public lastModifiedOn: Date;
  
  public createdBy: string;
  
  constructor() {
    super();
    this.createdOn = new Date(Date.now());
  }  
}