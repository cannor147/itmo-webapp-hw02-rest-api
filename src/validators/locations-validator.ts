import { Request } from 'express';

import Locations from '../models/locations';
import controller from '../controller';

import Validator from './validator';

class LocationsValidator extends Validator {
  run = function(name: string, req: Request): void {
    const id = controller.getNumber(name, req);

    Locations.findOne({
      where: {
        id: id,
        deleted: false
      }
    }).catch(e => {
      throw new Error('No such location');
    });
  };
}

export default LocationsValidator;
