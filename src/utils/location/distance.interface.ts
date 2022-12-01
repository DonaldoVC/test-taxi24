export interface location {
  lat: number;
  long: number;
}

export interface GetDistance {
  passenger: location;
  driver: location;
}