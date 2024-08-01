import { MongoClient, MongoConfiguration } from './infrastructure/shared/data/mongodb';
import { WebApplication } from './web-api';

function main() {
  const app = new WebApplication();
  const mongoConfiguration = new MongoConfiguration(app.configuration);
  const mongoClient = new MongoClient(mongoConfiguration);

  app.addCors();
  app.addRoutes();

  app.listen(app.configuration.get('port'));
}

main();
