import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PassengerDocument = HydratedDocument<Passenger>;

@Schema()
export class Passenger {
  @Prop({ required: true })
  name: string;
}

export const PassengerSchema = SchemaFactory.createForClass(Passenger);
