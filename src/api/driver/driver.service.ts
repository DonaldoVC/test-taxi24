import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  DriverByIdDTO,
  DriverByLocationDTO,
  DriverDTO,
  DriverData,
} from './driver.interface';
import { ADD_DRIVER_DTO_SCHEMA, GET_DRIVER_BY_LOCATION_DTO_SCHEMA } from './driver.validations';

import { Driver, DriverDocument } from './driver.schema';

import { ValidationUtils } from '../../utils/validations/validations';
import { DistanceUtils } from '../../utils/location/distance';

@Injectable()
export class DriverService {
  constructor(
    private readonly validationUtils: ValidationUtils,
    private readonly distanceUtils: DistanceUtils,
    @InjectModel(Driver.name) private driverModel: Model<DriverDocument>,
  ) {
  }

  async addDriver(body: DriverDTO): Promise<Driver> {
    this.validationUtils.validationSchema(ADD_DRIVER_DTO_SCHEMA, body);

    const createdDriver = new this.driverModel({ ...body, status: 1 });
    return createdDriver.save();
  }

  async getDriver(params: DriverByIdDTO): Promise<DriverData> {
    this.validationUtils.validationId(params.id);

    return this.driverModel.findById(params.id).select('name _id lat long').exec();
  }

  async getAllDrivers(): Promise<DriverData[]> {
    return this.driverModel.find().select('name _id lat long').exec();
  }

  async getAvailableDrivers(): Promise<DriverData[]> {
    return this.driverModel.find({ status: 1 }).select('name _id lat long status').exec();
  }

  async getByLocation(params: DriverByLocationDTO): Promise<DriverData[]> {
    this.validationUtils.validationSchema(GET_DRIVER_BY_LOCATION_DTO_SCHEMA, params);

    let drivers = await this.driverModel.find().select('name _id lat long').exec();
    const validDrivers = []

    drivers.map((driver) => {
      const distance = this.distanceUtils.getDistance({
        driver: {
          lat: driver.lat, long: driver.long,
        },
        passenger: params,
      });

      if ('limit' in params && params.limit) {
        if (distance <= 3 && validDrivers.length < params?.limit) {
          validDrivers.push(driver);
        }
      } else {
        if (distance <= 3) {
          validDrivers.push(driver);
        }
      }
    });

    return validDrivers;
  }
}
