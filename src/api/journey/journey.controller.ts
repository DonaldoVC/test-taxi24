import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

import { JourneyService } from './journey.service';
import { JourneyByIdDTO, JourneyDTO } from './journey.interface';

@Controller('journey')
export class JourneyController {
  constructor(private readonly journeyService: JourneyService) {}

  @Post()
  async createRequest(@Body() body: JourneyDTO) {
    return await this.journeyService.createRequest(body);
  }

  @Patch(':id')
  async complete(@Param() params: JourneyByIdDTO) {
    return await this.journeyService.completeJourney(params)
  }

  @Get('active')
  async getActiveJourneys() {
    return await this.journeyService.getActiveJourneys();
  }
}
