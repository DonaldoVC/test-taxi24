import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Passenger, PassengerDocument } from './passenger.schema';
import { PassengerByIdDTO, PassengerData, PassengerDTO } from './passenger.interface';
import { ADD_PASSENGER_SCHEMA } from './passenger.validations';

import { ValidationUtils } from '../../utils/validations/validations';

@Injectable()
export class PassengerService {
  constructor(
    private readonly validationUtils: ValidationUtils,
    @InjectModel(Passenger.name) private passengerModel: Model<PassengerDocument>,
  ) {
  }

  async addPassenger(body: PassengerDTO): Promise<Passenger> {
    this.validationUtils.validationSchema(ADD_PASSENGER_SCHEMA, body);

    const createdPassenger = new this.passengerModel({ ...body, status: 1 });
    return createdPassenger.save();
  }

  async getPassenger(params: PassengerByIdDTO): Promise<PassengerData> {
    this.validationUtils.validationId(params.id);

    return this.passengerModel.findById(params.id).select('name _id').exec();
  }

  async getAllPassenger(): Promise<PassengerData[]> {
    return this.passengerModel.find().select('name _id').exec();
  }
}
