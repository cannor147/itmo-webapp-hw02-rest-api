import { Request, Response } from 'express';

import Locations from '../models/locations';
import controller from '../controller';
import EmptyValidator from '../validators/empty-validator';
import LengthValidator from '../validators/length-validator';
import LocationsValidator from '../validators/locations-validator';

const { $, getBoolean, getNumber, getString } = controller;

const PAGE_ITEM_COUNT = 25;

const locationsController = {
  list: (req: Request, res: Response) => {
    Locations.findAll({
      where: {
        deleted: false
      }
    }).then(locations => {
      res.send(locations);
    });
  },
  listSortedByDatesAsc: (req: Request, res: Response) => {
    Locations.getAllSortedBy('created').then(locations => {
      res.send(locations);
    });
  },
  listSortedByDatesDesc: (req: Request, res: Response) => {
    Locations.getAllSortedBy('created', true).then(locations => {
      res.send(locations);
    });
  },
  listSortedByNamesAsc: (req: Request, res: Response) => {
    Locations.getAllSortedBy('name').then(locations => {
      res.send(locations);
    });
  },
  listSortedByNamesDesc: (req: Request, res: Response) => {
    Locations.getAllSortedBy('name', true).then(locations => {
      res.send(locations);
    });
  },

  listFilteredByDescription: (req: Request, res: Response) => {
    Locations.findAll({
      where: {
        description: getString('description', req),
        deleted: false
      }
    }).then(locations => {
      res.send(locations);
    });
  },

  page: (req: Request, res: Response) => {
    const pageIndex = Math.max(1, getNumber('pageIndex', req));
    if (isNaN(pageIndex)) {
      return locationsController.list(req, res);
    }

    Locations.findAll({
      where: {
        deleted: false
      },
      offset: PAGE_ITEM_COUNT * (pageIndex - 1),
      limit: PAGE_ITEM_COUNT
    }).then(locations => {
      res.send(locations);
    });
  },

  item: $(
    req => {
      new LocationsValidator().run('id', req);
    },
    (req, res) => {
      Locations.findOne({
        where: {
          id: getNumber('id', req),
          deleted: false
        }
      }).then(location => {
        if (location !== null) {
          res.send(location);
        } else {
          res.sendStatus(404);
        }
      });
    }
  ),

  createItem: $(
    req => {
      new EmptyValidator().run('name', req);
      new LengthValidator(1, Locations.NAME_MAX_LENGTH).run('name', req);
      new LengthValidator(1, Locations.DESCRIPTION_MAX_LENGTH).run('description', req);
      new LengthValidator(1, Locations.GEO_MAX_LENGTH).run('city', req);
      new LengthValidator(1, Locations.GEO_MAX_LENGTH).run('country', req);
    },
    (req, res) => {
      Locations.create({
        name: getString('name', req),
        description: getString('description', req),
        city: getString('city', req),
        country: getString('country', req),
        visited: getBoolean('visited', req)
      }).then(() => {
        res.sendStatus(204);
      });
    }
  ),

  changeDescription: $(
    req => {
      new LocationsValidator().run('id', req);
      new LengthValidator(1, Locations.DESCRIPTION_MAX_LENGTH).run('description', req);
    },
    (req, res) => {
      Locations.changeDescription(getNumber('id', req), getString('description', req)).then(() => {
        res.sendStatus(204);
      });
    }
  ),

  deleteList: (req: Request, res: Response) => {
    Locations.updateAll({
      deleted: true
    }).then(() => {
      res.sendStatus(204);
    });
  },

  deleteItem: $(
    req => {
      new LocationsValidator().run('id', req);
    },
    (req, res) => {
      Locations.update(
        {
          deleted: true
        },
        {
          where: {
            id: getNumber('id', req)
          }
        }
      ).then(() => {
        res.sendStatus(204);
      });
    }
  ),

  visit: $(
    req => {
      new LocationsValidator().run('id', req);
    },
    (req, res) => {
      Locations.changeVisited(getNumber('id', req), true).then(() => {
        res.sendStatus(204);
      });
    }
  ),

  unvisit: $(
    req => {
      new LocationsValidator().run('id', req);
    },
    (req, res) => {
      Locations.changeVisited(getNumber('id', req), false).then(() => {
        res.sendStatus(204);
      });
    }
  ),

  swap: $(
    req => {
      new LocationsValidator().run('id', req);
      new LocationsValidator().run('swapId', req);
    },
    (req, res) => {
      Locations.swapElements(getNumber('id', req), getNumber('swapId', req))?.then(() => {
        res.sendStatus(204);
      });
    }
  )
};

export default locationsController;
