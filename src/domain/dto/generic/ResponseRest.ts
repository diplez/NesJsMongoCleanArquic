import { ApiProperty } from "@nestjs/swagger";
import { IResponseRest } from "src/domain/common/interfaces/generic/IResponseRest";

/**
 * Respuesta de api rest
 * @summary Modelo generico de respuesta
 */
export class ResponseRest<T> implements IResponseRest<T> {

  @ApiProperty()
  sucess: boolean;

  @ApiProperty()
  message: string;

  @ApiProperty({default: null})
  error?: any;

  @ApiProperty()
  result?: T;

  /**
   * Modelo de respuesta correcto
   * @description Respuesta de api en caso de ser correcto
   * @summary Modelo estadar de respuesta correcta
   * @param result Respuesta a devolver
   */
  public Ok(result: T): ResponseRest<T>{
    let data  = new ResponseRest<T>();
    data.sucess = true;
    data.message = "OK"
    data.error = null;    
    data.result = result;
    return data;
  }

  /**
   * Modelo de respuesta de error
   * @description Respuesta de api en caso de ser error
   * @summary Modelo estadar de respuesta error
   * @param error Error a devolver
   */
  public Error(error: T): ResponseRest<T>{
    let data  = new ResponseRest<T>();
    data.sucess = true;
    data.message = "Error"
    data.error = error;    
    data.result = null;
    return data;
  }
}
  