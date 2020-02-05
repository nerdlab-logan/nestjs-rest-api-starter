import { ArgumentsHost, BadRequestException, Catch, HttpException, HttpStatus } from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import { ResponseError } from '../utils/response.util'

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const request = ctx.getRequest()

    const status = this.getStatus(exception)

    response
      .status(status)
      .json(new ResponseError('9999', this.getMessages(exception), new Date().toISOString(), request.url))
  }

  private getStatus(exception: Error): number {
    return exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR
  }

  private getMessages(exception: Error): Object {
    if (exception instanceof BadRequestException) {
      const _message = (exception as BadRequestException).message.message

      if (typeof _message === 'string') {
        return { message: _message }
      } else {
        return _message.map(value => {
          return {
            property: value.property,
            message: value.constraints,
          }
        })
      }
    } else {
      return exception.message
    }
  }
}
