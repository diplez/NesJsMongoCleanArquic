import { Module } from '@nestjs/common';
import { CustomerSchema, ExampleDocument } from './dal/models/Example.document';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserDocument, UserSchema } from './dal/models/User.document.';
import { RoomDocument, RoomSchema } from './dal/models/Room.document';
import { ParticipantDocument, ParticipantSchema } from './dal/models/Participant.document';
import { FileDocument, FileSchema } from './dal/models/File.document';
import { MessageDocument, MessageSchema } from './dal/models/Message.document';

@Module({
    imports: [    
      ConfigModule.forRoot(),
      MongooseModule.forRoot(`${process.env.MONGODB_CONNECTION_STRING}/${process.env.MONGODB_DATABASE}`),
      MongooseModule.forFeature([        
        { name: ExampleDocument.name, schema: CustomerSchema },
        { name: UserDocument.name, schema: UserSchema },
        { name: RoomDocument.name, schema: RoomSchema },
        { name: ParticipantDocument.name, schema: ParticipantSchema },
        { name: FileDocument.name, schema: FileSchema },
        { name: MessageDocument.name, schema: MessageSchema },
      ])
    ],
    exports: [      
      MongooseModule
    ],    
})

export class InfrastructureModule {
  
}