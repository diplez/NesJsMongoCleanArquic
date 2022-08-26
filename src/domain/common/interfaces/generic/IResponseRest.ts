/**
 * Response de api rest
 */
 export interface IResponseRest<T>{
  sucess: boolean;
  message: string;
  error?: any;
  result?: T;
}