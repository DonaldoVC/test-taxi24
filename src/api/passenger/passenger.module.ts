import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PassengerController } from './passenger.controller';
import { PassengerService } from './passenger.service';
import { Passenger, PassengerSchema } from './passenger.schema';

import { ValidationUtils } from '../../utils/validations/validations';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Passenger.name, schema: PassengerSchema }]),
  ],
  controllers: [PassengerController],
  providers: [PassengerService, ValidationUtils]
})
export class PassengerModule {}
