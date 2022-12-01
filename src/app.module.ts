import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppLogger } from './middleware/AppLogger/AppLogger';

import configuration from './config/configuration';

import { DriverModule } from './api/driver/driver.module';
import { PassengerModule } from './api/passenger/passenger.module';
import { JourneyModule } from './api/journey/journey.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('DATABASE_URI'),
      })
    }),
    DriverModule,
    PassengerModule,
    JourneyModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLogger).forRoutes('*');
  }
}
