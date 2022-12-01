import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import {
  DriverData,
  DriverByIdDTO,
  DriverByLocationDTO,
  DriverDTO,
} from './driver.interface';
import { DriverService } from './driver.service';

@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Post()
  async addDriver(@Body() body: DriverDTO) {
    return await this.driverService.addDriver(body);
  }

  @Get()
  async getAllDrivers(): Promise<DriverData[]> {
    return await this.driverService.getAllDrivers();
  }

  @Get('available')
  async getAvailableDrivers(): Promise<DriverData[]> {
    return await this.driverService.getAvailableDrivers();
  }

  @Get('find/:id')
  async findOne(@Param() params: DriverByIdDTO): Promise<DriverData> {
    return await this.driverService.getDriver(params)
  }

  @Get('find/:lat/:long')
  async getByLocation(@Param() params: DriverByLocationDTO): Promise<DriverData[]> {
    return await this.driverService.getByLocation(params);
  }

  @Get('find/:lat/:long/:limit')
  async getByLocationWithLimit(@Param() params: DriverByLocationDTO): Promise<DriverData[]> {
    return await this.driverService.getByLocation(params);
  }
}
