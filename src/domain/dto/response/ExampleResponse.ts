import { ObjectID } from 'typeorm';

export class ExampleResponse  {

  id: ObjectID;
  name: string;
  animalType: string;
  pictureUrl?: string;
  birthDate?: Date;

  constructor(name: string, animalType: string, pictureUrl?: string, birthDate?: Date) {
    this.name = name;
    this.animalType = animalType;
    this.pictureUrl = pictureUrl;
    this.birthDate = birthDate;
  }
}
