import { Request, Response } from 'express';

type ValidationHandler = (req: Request) => void;
type MainHandler = (req: Request, res: Response) => void;
type InvalidHandler = (e: Error, req: Request, res: Response) => void;

const defaultInvalidator: InvalidHandler = (e, req, res) => {
  res.sendStatus(403);
  res.send(e);
};

const controller = {
  $: function(
    validator: ValidationHandler,
    action: MainHandler,
    invalid: InvalidHandler = defaultInvalidator
  ): MainHandler {
    return (req: Request, res: Response) => {
      try {
        validator(req);
        action(req, res);
      } catch (e) {
        invalid(e, req, res);
      }
    };
  },

  getString: function(name: string, req: Request): string | null {
    if (req.params && req.params[name]) {
      return req.params[name];
    } else if (req.body && req.body[name]) {
      return req.body[name];
    }

    return null;
  },

  getNumber: function(name: string, req: Request): number {
    return Number.parseInt(controller.getString(name, req) || '');
  },

  getBoolean: function(name: string, req: Request): boolean {
    return controller.getString(name, req) === 'true';
  }
};

export default controller;
