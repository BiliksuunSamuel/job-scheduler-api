import { HttpStatus } from '@nestjs/common';
import { ApiResponseDto } from 'src/dtos/responseDtos/api.response.dto';

export class CommonResponses {
  //not found response <T>
  public static notFoundResponse<T>(
    data?: T,
    message?: string,
  ): ApiResponseDto<T> {
    return {
      message: message ?? 'Resource Not Found',
      data,
      code: HttpStatus.NOT_FOUND,
    };
  }

  //forbidden response <T>
  public static forbiddenResponse<T>(
    data?: T,
    message?: string,
  ): ApiResponseDto<T> {
    return {
      message: message ?? 'Forbidden',
      data,
      code: HttpStatus.FORBIDDEN,
    };
  }

  //ok response <T>
  public static okResponse<T>(data?: T, message?: string): ApiResponseDto<T> {
    return {
      message: message ?? 'Success',
      data,
      code: HttpStatus.OK,
    };
  }

  //created response <T>
  public static createdResponse<T>(
    data?: T,
    message?: string,
  ): ApiResponseDto<T> {
    return {
      message: message ?? 'Created',
      data,
      code: HttpStatus.CREATED,
    };
  }

  //unauthorized response <T>
  public static unauthorizedResponse<T>(
    data?: T,
    message?: string,
  ): ApiResponseDto<T> {
    return {
      message: message ?? 'Unauthorized',
      data,
      code: HttpStatus.UNAUTHORIZED,
    };
  }

  //internal server error response <T>
  public static internalServerErrorResponse<T>(
    data?: T,
    message?: string,
  ): ApiResponseDto<T> {
    return {
      message: message ?? 'Sorry,something went wrong',
      data,
      code: HttpStatus.INTERNAL_SERVER_ERROR,
    };
  }
}
