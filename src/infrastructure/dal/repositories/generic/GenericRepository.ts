import { Logger } from '@nestjs/common';
import { Document, Model } from 'mongoose';
import { PaginationUtils } from 'src/domain/common/utils/PaginationUtils';

export class GenericRepository<T extends Document> {
  
  constructor(
    private readonly model: Model<T>,
    private readonly loggerInternal: Logger,
  ) {}

  public async create(doc: object): Promise<any> {
    this.loggerInternal.log('BaseRepo: Entity is being created...');
    const createdEntity = new this.model(doc);
    return await createdEntity.save();
  }

  public async update(filter: object, doc: object): Promise<void> {
    this.loggerInternal.log('BaseRepo: Entity is being updated...');
    await this.model.updateOne(filter,doc)
  }

  public async findById(id: string): Promise<T> {
    this.loggerInternal.log('BaseRepo: Entity is being found by id...');
    return this.model.findById(id);
  }

  public async findByIdWithPopulate(id: string, populate: object | string): Promise<T> {
    this.loggerInternal.log('BaseRepo: Entity is being found by id...');
    return await this.model.findById(id).populate(populate);
  }

  public async findAll(): Promise<T[]> {
    this.loggerInternal.log('BaseRepo: Entities are being found...');
    return await this.model.find();
  }

  public async findAllPaginate(page: number = 1, limit: number = 10): Promise<T[]> {
    this.loggerInternal.log('BaseRepo: Entities are being found...');
    let skipCustom : number = PaginationUtils.fromSkipToPage(page,limit);
    return await this.model.find().skip(skipCustom).limit(limit);
  }

  public async findAllWithPopulate(populate: object | string): Promise<T[]> {
    this.loggerInternal.log('BaseRepo: Entities are being found...');
    return await this.model.find().populate(populate);
  }

  public async findAllWithPopulatePagination(populate: object | string,page: number = 1, limit: number = 10): Promise<T[]> {
    this.loggerInternal.log('BaseRepo: Entities are being found...');
    let skipCustom : number = PaginationUtils.fromSkipToPage(page,limit);
    return await this.model.find().populate(populate).skip(skipCustom).limit(limit);
  }

  public async findByIdAndRemove(id: string): Promise<void> {
    this.loggerInternal.log('BaseRepo: Entity is being deleted...');
    await this.model.findByIdAndRemove(id)
  }

  public async deleteOne(filter: object, options?: object): Promise<void> {
    this.loggerInternal.log('BaseRepo: Entity is being deleted...');
    await this.model.deleteOne(filter,options)
  }

  public async findAndUpdate(filter: object, doc: object, allowInsert: boolean = false): Promise<string>{
    let data = await this.model.findOneAndUpdate(filter,doc,{ upsert: allowInsert });
    return data.id;
  }
}