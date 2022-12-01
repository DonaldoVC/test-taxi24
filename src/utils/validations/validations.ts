import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import mongoose from 'mongoose';

import { INVALID_ID } from '../../constants/erros';

@Injectable()
export class ValidationUtils {
  public validationSchema(bodySchema: any, body: any) {
    const validation = bodySchema.validate(body);
    if (validation.error) {
      const error = {
        error: {
          data: validation.error,
          status: HttpStatus.BAD_REQUEST,
        },
      };

      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
    return validation;
  }

  public validationId(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = {
        error: {
          data: INVALID_ID,
          status: HttpStatus.NOT_FOUND,
        },
      };

      throw new HttpException(error, HttpStatus.NOT_FOUND);
    }
  }
}
