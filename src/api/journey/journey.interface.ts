import { Types } from 'mongoose';

export interface Location {
  lat: number;
  long: number;
}

export interface JourneyDTO {
  date: Date;
  cost: number;
  driver: string;
  passenger: string;
  from: Location;
  to: Location;
}

export interface JourneyByIdDTO {
  id: string;
}
 
export interface JourneyData {
  _id: Types.ObjectId;
  name: string;
  lat: number;
  long: number;
}
