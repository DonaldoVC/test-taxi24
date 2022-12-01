import { Types } from 'mongoose';

export interface DriverDTO {
  name: string;
  lat: number;
  long: number;
}

export interface DriverByIdDTO {
  id: string;
}

export interface DriverByLocationDTO {
  limit?: number;
  lat: number;
  long: number;
}

export interface DriverData {
  _id: Types.ObjectId;
  name: string;
  lat: number;
  long: number;
}