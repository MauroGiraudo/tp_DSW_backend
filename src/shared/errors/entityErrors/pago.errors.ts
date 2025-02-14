import { NotFoundError } from "@mikro-orm/core"

export class PagoNotFoundError extends NotFoundError {
  type: string
  constructor(message?: string)
  constructor(array: object)
  constructor(params: string | undefined | object) {
    let message
    if(params === undefined) {
      message = 'El pago ingresado no existe'

    } else if(typeof params !== 'string') {
      message = 'No se han encontrado pagos'

    } else {
      message = params
    }
    super(message)
    this.type = 'PagoNotFoundError'
  }
}

export class PagoPreconditionFailed extends Error {
  type: string
  constructor(message: string = 'No se puede realizar el pago hasta que todos los productos hayan sido entregados') {
    super(message);
    this.type = 'PagoPreconditionFailed'
  }
}

export class PagoAlreadyExists extends Error {
  type: string
  constructor(message: string = 'El pago ya ha sido registrado') {
    super(message)
    this.type = 'PagoAlreadyExists'
  }
}

