import { Injectable } from '@nestjs/common';

import { GetDistance } from './distance.interface';

@Injectable()
export class DistanceUtils {
  public getDistance(body: GetDistance) {
    const rad = function(x) {
      return x * Math.PI / 180;
    };
    const R = 6378.137;
    const dLat = rad(body.driver.lat - body.passenger.lat);
    const dLong = rad(body.driver.long - body.passenger.long);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(body.passenger.lat)) *
      Math.cos(rad(body.driver.lat)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }
}
