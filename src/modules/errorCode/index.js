import HTTP_STATUS from '../httpStatus'

const {
  BAD_REQUEST,
  UNAUTHORIZED,
  PAYMENT_REQUIRED,
  FORBIDDEN,
  NOT_FOUND,
  SERVER_ERROR,
  NOT_IMPLEMENTED,
  BAD_GATEWAY,
  SERVICE_UNAVAILABLE
} = HTTP_STATUS

export default {
  // 400
  BadRequestError: BAD_REQUEST,
  BadDigestError: BAD_REQUEST,
  InvalidContentError: BAD_REQUEST,
  InvalidHeaderError: BAD_REQUEST,
  InvalidVersionError: BAD_REQUEST,
  RequestExpiredError: BAD_REQUEST,
  // 401
  UnauthorizedError: UNAUTHORIZED,
  InvalidCredentialsError: UNAUTHORIZED,

  // 402
  PaymentRequiredError: PAYMENT_REQUIRED,

  // 403
  ForbiddenError: FORBIDDEN,
  NotAuthorizedError: FORBIDDEN,

  // 404
  NotFoundError: NOT_FOUND,
  ResourceNotFoundError: NOT_FOUND,

  // 500
  InternalServerError: SERVER_ERROR,
  InternalError: SERVER_ERROR,

  // 501
  NotImplementedError: NOT_IMPLEMENTED,

  // 502
  BadGatewayError: BAD_GATEWAY,

  // 503
  ServiceUnavailableError: SERVICE_UNAVAILABLE
}
