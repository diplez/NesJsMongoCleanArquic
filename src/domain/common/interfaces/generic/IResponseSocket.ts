/**
 * Respuesta de eventos sockets
 */
export interface ResponseSocket<T>{
  status: StatusResponse,
  error?: any,
  result?: T
}
  