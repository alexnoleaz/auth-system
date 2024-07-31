import { WebApplication } from './web-api';

function main() {
  const app = new WebApplication();

  app.addCors();
  app.addRoutes();

  app.listen(app.configuration.get('port'));
}

main();
