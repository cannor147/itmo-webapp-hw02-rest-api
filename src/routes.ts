import { Express } from 'express';

import locationsController from './controllers/locations-controller';

const routes = (app: Express): void => {
  app
    .route('/locations')
    .post(locationsController.createItem)
    .get(locationsController.list)
    .delete(locationsController.deleteList);

  app.route('/locations/sortedByDates').get(locationsController.listSortedByDatesAsc);
  app.route('/locations/sortedByDates/reversed').get(locationsController.listSortedByDatesDesc);
  app.route('/locations/sortedByNames').get(locationsController.listSortedByNamesAsc);
  app.route('/locations/sortedByNames/reversed').get(locationsController.listSortedByNamesDesc);

  app.route('/locations/page/:pageIndex([0-9]+)').get(locationsController.page);

  app
    .route('/locations/:id([0-9]+)')
    .get(locationsController.item)
    .delete(locationsController.deleteItem);

  app.route('/locations/:id([0-9]+)/visit').patch(locationsController.visit);

  app.route('/locations/:id([0-9]+)/unvisit').patch(locationsController.unvisit);

  app.route('/locations/:id([0-9]+)/description').patch(locationsController.changeDescription);

  app.route('/locations/:id([0-9]+)/swap/:swapId([0-9]+)').put(locationsController.swap);

  app.route('/locations/search').get(locationsController.listFilteredByDescription);

  app.get('*', (req, res) => res.sendStatus(400));
};

export default routes;
