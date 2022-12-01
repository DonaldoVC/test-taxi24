import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { JourneyController } from './journey.controller';
import { JourneyService } from './journey.service';

import { ValidationUtils } from '../../utils/validations/validations';
import { Journey, JourneySchema } from './journey.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Journey.name, schema: JourneySchema }]),
  ],
  controllers: [JourneyController],
  providers: [JourneyService, ValidationUtils]
})
export class JourneyModule {}
