import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ParticipantDocument } from '../models/Participant.document';
import { RoomDocument } from '../models/Room.document';
import { GenericRepository } from './generic/GenericRepository';

@Injectable()
export class ParticipantRepository extends GenericRepository<ParticipantDocument> {  

  private readonly logger = new Logger(ParticipantRepository.name)
  
  constructor(
    @InjectModel(ParticipantDocument.name)
    private participantRepository: Model<ParticipantDocument>,
  ) {
    super(participantRepository, new Logger(ParticipantRepository.name));
  }

  async findByRoomID(id: string): Promise<ParticipantDocument[]>{    
    let data = await this.participantRepository.find({
      idRoom: id
    }).populate('idRoom idUser');
    return data;
  }
}