type ErrorsType = Record<
  string,
  {
    msg: string
    location: string
    value: any
    path: string
  }
>

// No extend from Error because it only returns a string even pass an object with message and status
export class ErrorWithStatus {
  message: string
  status: number
  constructor({ message, status }: { message: string; status: number }) {
    this.message = message
    this.status = status
  }
}
export class EntityError extends ErrorWithStatus {
  error: string

  constructor(message: string) {
    super({
      message,
      status: 400
    })
  }
}