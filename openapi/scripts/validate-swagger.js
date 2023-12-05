import SwaggerParser from "@apidevtools/swagger-parser";

const parser = new SwaggerParser()
const swaggerFileLocation = './openapi/swagger.yaml'

parser.validate(swaggerFileLocation, (err, api) => {
  if (err) {
    console.error(err);
  }
  else {
    console.log("API name: %s, Version: %s", api.info.title, api.info.version);
  }
});