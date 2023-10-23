/**
 * Error classes to be used in applicative layers
 */

export type externalHTTPServiceError = HTTPError|NetworkError|ServiceError;

export enum ErrorCodes {
  // there was a problem/error computing the user request
  ServiceErrorCode = 'SERVICE_ERROR',
  // an external HTTP resource was unreacheable
  NetworkErrorCode = 'SERVICE_NETWORK_ERROR',
  // an external HTTP resource has issued an non 200 code
  HTTPErrorCode = 'SERVICE_HTTP_ERROR',
  // a problem with the database
  DatabaseErrorCode = 'SERVICE_DATABASE_ERROR'
}

export interface IGenericError {
  code: string;
  message: string;
  origErrorMsg?:Error|string;
}

export interface IGenericServiceError extends IGenericError {
  code: ErrorCodes;
}

export interface IServiceError extends IGenericServiceError {
  code: ErrorCodes.ServiceErrorCode;
}

export interface IDatabaseError extends IGenericServiceError {
  code: ErrorCodes.DatabaseErrorCode;
}

export interface INetworkError extends IGenericServiceError {
  code: ErrorCodes.NetworkErrorCode;
}

export interface IHTTPError extends IGenericServiceError {
  code: ErrorCodes.HTTPErrorCode;
  httpStatusCode: number;
  statusText?: string;
  responseBody?: unknown;
}

export class GenericError extends Error implements IGenericError {
  code: string;
  message: string;
  origErrorMsg?: Error | string;
  constructor(code: string, message: string, errorInstance?:Error|string) {
    super(message);
    this.code = code;
    this.message = message;
    this.origErrorMsg = errorInstance;
  }
}

export class GenericServiceError extends GenericError implements IGenericServiceError{
  declare code: ErrorCodes;
  constructor(code: ErrorCodes, message:string, origErrorMsg?:Error|string){
    super(code,message, origErrorMsg)
  }
}

export class ServiceError extends GenericServiceError implements IServiceError {
  declare code: ErrorCodes.ServiceErrorCode;
  constructor( message: string, origErrorMsg?:Error|string) {
    super(ErrorCodes.ServiceErrorCode, message, origErrorMsg);
  }
}

export class DatabaseError extends GenericServiceError implements IDatabaseError {
  declare code: ErrorCodes.DatabaseErrorCode;
  constructor( message: string, origErrorMsg?:Error|string) {
    super(ErrorCodes.DatabaseErrorCode, message, origErrorMsg);
  }
}

export class NetworkError extends GenericServiceError implements INetworkError {
  declare code: ErrorCodes.NetworkErrorCode;
  constructor(message: string) {
    super(ErrorCodes.NetworkErrorCode, message);
  }
}

export class HTTPError extends GenericServiceError implements IHTTPError {
  declare code: ErrorCodes.HTTPErrorCode;
  httpStatusCode: number;
  statusText?: string;
  responseBody?: unknown;
  constructor(message:string, httpStatusCode:number, statusText:string, responseBody:unknown){
    super(ErrorCodes.HTTPErrorCode,message)
    this.httpStatusCode = httpStatusCode;
    this.statusText=statusText;
    this.responseBody = responseBody;
  }
}

