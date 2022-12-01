import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

import { Driver } from '../driver/driver.schema';
import { Passenger } from '../passenger/passenger.schema';

export type JourneyDocument = HydratedDocument<Journey>;

@Schema()
export class Journey {
  @Prop({ required: true })
  date: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Driver' })
  driver: Driver;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Passenger' })
  passenger: Passenger;

  @Prop(raw({
    lat: { type: Number },
    long: { type: Number }
  }))
  from: Record<string, any>;

  @Prop(raw({
    lat: { type: Number },
    long: { type: Number }
  }))
  to: Record<string, any>;

  @Prop({ required: true })
  cost: number;

  @Prop({ required: true })
  status: number;
}

export const JourneySchema = SchemaFactory.createForClass(Journey);
