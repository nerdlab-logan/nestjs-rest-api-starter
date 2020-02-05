import { HttpException, HttpStatus } from '@nestjs/common'

export class BusinessException extends HttpException {
  constructor(message = 'Business Error') {
    super(message, HttpStatus.BAD_REQUEST)
  }
}
