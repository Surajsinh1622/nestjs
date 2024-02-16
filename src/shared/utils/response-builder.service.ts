import { Injectable } from '@nestjs/common';
import { ApiResponse } from '../dto/response.dto';

@Injectable()
export class ResponseBuilderService {
  buildSuccessResponse<T>(data: T, message = 'Success'): ApiResponse<T> {
    return new ApiResponse<T>(true, message, data);
  }

  buildErrorResponse(message = 'Internal Server Error'): ApiResponse<null> {
    return new ApiResponse<null>(false, message);
  }
}
