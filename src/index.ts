import { WebApplication } from './web-api';

function main() {
  const app = new WebApplication();

  app.addCors();
  app.addRoutes();

  app.listen(3000);
}

main();
