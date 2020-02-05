import { ApiProperty } from '@nestjs/swagger'

export class ResponseObject<T> {
  @ApiProperty()
  private isSuccess: boolean
  @ApiProperty()
  private message: string
  @ApiProperty()
  private data: T

  public OK(data: T, message: string = 'success'): ResponseObject<T> {
    this.isSuccess = true
    this.message = message
    this.data = data
    return this
  }

  public FAIL(message: string = 'fail'): ResponseObject<T> {
    this.isSuccess = false
    this.message = message
    this.data = null
    return this
  }

  get Message(): string {
    return this.message
  }

  get Data(): T {
    return this.data
  }
}

export class ResponseError {
  private code: string
  private messages: string | Object
  private timestamp: string
  private path: string

  constructor(code: string, messages: string | Object, timestamp: string, path: string) {
    this.code = code
    this.messages = messages
    this.timestamp = timestamp
    this.path = path
  }

  get Code(): string {
    return this.code
  }

  set Code(value: string) {
    this.code = value
  }

  get Messages(): string | Object {
    return this.messages
  }

  set Messages(value: string | Object) {
    this.messages = value
  }

  set Timestamp(value: string) {
    this.timestamp = value
  }

  get Timestamp(): string {
    return this.timestamp
  }

  set Path(value: string) {
    this.path = value
  }

  get Path(): string {
    return this.path
  }
}
