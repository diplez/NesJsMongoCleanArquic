import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
//CUSTOM
import { AuditableEntity } from 'src/domain/common/entities/auditable/AuditableEntity';


/**@Entity('example')
export class ExampleDocument extends AuditableEntity{
  @ObjectIdColumn({name: '_id'})  id?: ObjectID;
  @Column() name: string;
  @Column() animalType: string;
  @Column() pictureUrl?: string;
  @Column() birthDate?: Date;

  /**constructor(example?: Partial<ExampleDocument>) {
    super();    
    Object.assign(this, example);
  }
}**/

@Schema({ collection: 'example' })
export class ExampleDocument extends AuditableEntity {
  @Prop()
  name: string;

  @Prop({ unique: true })
  animalType: string;

  @Prop({ unique: true })
  pictureUrl: string;

  @Prop()
  birthDate: Date;
}

export const CustomerSchema = SchemaFactory.createForClass(ExampleDocument);