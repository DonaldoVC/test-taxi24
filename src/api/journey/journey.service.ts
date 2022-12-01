import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Journey, JourneyDocument } from './journey.schema';
import { JourneyByIdDTO, JourneyDTO } from './journey.interface';
import { CREATE_REQUEST_SCHEMA } from './journey.validations';

import { ValidationUtils } from '../../utils/validations/validations';

@Injectable()
export class JourneyService {
  constructor(
    private readonly validationUtils: ValidationUtils,
    @InjectModel(Journey.name) private journeyModel: Model<JourneyDocument>,
  ) {
  }

  async createRequest(body: JourneyDTO): Promise<Journey> {
    this.validationUtils.validationSchema(CREATE_REQUEST_SCHEMA, body);

    const createdJourney = new this.journeyModel({ ...body, status: 1 });
    return createdJourney.save();
  }

  async completeJourney(params: JourneyByIdDTO) {
    this.validationUtils.validationId(params.id);

    return this.journeyModel.findOneAndUpdate(params, { status: 2 }).select('id')
  }

  async getActiveJourneys() {
    return this.journeyModel.find({ status: 1 }).select('-__v').exec();
  }
}
