import { ObjectSchema, ValidationError } from 'joi';
import { Request, Response } from 'express';
import { config } from '@root/config';

type IJoiDecorator = (target: any, key: string, descriptor: PropertyDescriptor) => void;

const logger = config.createLogger('joi-validation-decorator');

export function joiValidation(schema: ObjectSchema): IJoiDecorator {
  return (_target: any, _key: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const req: Request = args[0];
      const res: Response = args[1];
      try {
        await schema.validateAsync(req.body);
      } catch (error: unknown) {
        if (error instanceof ValidationError) {
          const formattedErrors: { [key: string]: any } = {};
          error.details.forEach((error) => {
            formattedErrors[error.context?.label || 'error'] = error.message;
          });

          logger.info({ data: req.body, error: formattedErrors });
          return res.status(400).json(formattedErrors);
        }

        logger.error({
          data: req.body,
          message: 'Unexpected server error occurs from joi-validation decorator',
        });
        return res.status(500).json('Unexpected server error occurs from joi-validation decorator');
      }

      return originalMethod.apply(this, args);
    };
    return descriptor;
  };
}
