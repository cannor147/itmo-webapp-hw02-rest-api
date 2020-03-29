import { Request } from 'express';

abstract class Validator {
  abstract run: (name: string, req: Request) => void;
}

export default Validator;
