export class AdminRO {
  readonly id: number
  readonly email: string
  readonly name: string
  readonly signInAt?: Date
  readonly createdAt: Date
  readonly updatedAt: Date

  constructor(id: number, email: string, name: string, signInAt: Date, createdAt: Date, updatedAt: Date) {
    this.id = id
    this.email = email
    this.name = name
    this.signInAt = signInAt
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}
