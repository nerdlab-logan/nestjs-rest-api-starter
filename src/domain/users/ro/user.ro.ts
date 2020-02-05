export class UserRO {
  readonly id: number
  readonly email: string
  readonly name: string
  readonly nickName: string
  readonly memo: string
  readonly signInAt?: Date
  readonly createdAt: Date
  readonly updatedAt: Date

  constructor(
    id: number,
    email: string,
    name: string,
    nickName: string,
    memo: string,
    signInAt: Date,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id
    this.email = email
    this.name = name
    this.nickName = nickName
    this.memo = memo
    this.signInAt = signInAt
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}
