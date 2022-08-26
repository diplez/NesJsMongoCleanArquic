import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from '../models/User.document.';
import { GenericRepository } from './generic/GenericRepository';

@Injectable()
export class UserRepository extends GenericRepository<UserDocument> {  

  private readonly logger = new Logger(UserRepository.name)
  
  constructor(
    @InjectModel(UserDocument.name)
    private userRepository: Model<UserDocument>,
  ) {
    super(userRepository, new Logger(UserRepository.name));
  }
}