import { Types } from 'mongoose';

export interface PassengerDTO {
  name: string;
}

export interface PassengerByIdDTO {
  id: string;
}

export interface PassengerData {
  _id: Types.ObjectId;
  name: string;
}