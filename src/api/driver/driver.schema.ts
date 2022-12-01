import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DriverDocument = HydratedDocument<Driver>;

@Schema()
export class Driver {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  lat: number;

  @Prop({ required: true })
  long: number;

  @Prop({ required: true })
  status: number;
}

export const DriverSchema = SchemaFactory.createForClass(Driver);
