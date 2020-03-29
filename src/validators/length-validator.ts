import { Request } from 'express';

import controller from '../controller';

import Validator from './validator';

class LengthValidator extends Validator {
  min: number;
  max: number;

  constructor(min: number, max: number) {
    super();
    this.min = min;
    this.max = max;
  }

  run = function(this: LengthValidator, name: string, req: Request): void {
    const str = controller.getString(name, req);

    if (str !== null && str.length < this.min) {
      throw new Error(`Length of field ${name} should be at least ${this.min}`);
    }
    if (str !== null && str.length > this.max) {
      throw new Error(`Length of field ${name} shouldn't exceed ${this.max}`);
    }
  };
}

export default LengthValidator;
