import { applyDecorators, Type } from "@nestjs/common";
import { ApiOkResponse, getSchemaPath } from "@nestjs/swagger";
import { ResponseRest } from "../dto/generic/ResponseRest";

export const ApiOkCustomResponseArray = <TModel extends Type<any>>(
    model: TModel
  ) => {
  return applyDecorators(
    ApiOkResponse({
      description: "Response Ok",
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponseRest) },
          {
            properties: {
              result: {
                type: "array",
                items: { 
                  $ref: getSchemaPath(model)
                }
              },
            },
          },
        ],
      },
    }),
  );
};

export const ApiOkCustomResponseSingle = <TModel extends Type<any>>(
    model: TModel
  ) => {
  return applyDecorators(
    ApiOkResponse({
      description: "Response Ok",
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponseRest) },
          {
            properties: {
              result: {
                type: "object",
                $ref: getSchemaPath(model)
              },
            },
          },
        ],
      },
    }),
  );
};