import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { PassengerService } from './passenger.service';
import { PassengerByIdDTO, PassengerData, PassengerDTO } from './passenger.interface';

@Controller('passenger')
export class PassengerController {
  constructor(private readonly passengerService: PassengerService) {}

  @Post()
  async addPassenger(@Body() body: PassengerDTO) {
    return await this.passengerService.addPassenger(body);
  }

  @Get()
  async getAll(): Promise<PassengerData[]> {
    return await this.passengerService.getAllPassenger();
  }

  @Get('find/:id')
  async findOne(@Param() params: PassengerByIdDTO): Promise<PassengerData> {
    return await this.passengerService.getPassenger(params)
  }
}
