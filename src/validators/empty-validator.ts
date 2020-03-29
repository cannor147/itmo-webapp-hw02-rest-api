import { Request } from 'express';

import controller from '../controller';

import Validator from './validator';

class EmptyValidator extends Validator {
  run = function(name: string, req: Request): void {
    const str = controller.getString(name, req);

    if (str === null || str.length === 0) {
      throw new Error(`Field ${name} shouldn't be empty`);
    }
  };
}

export default EmptyValidator;
