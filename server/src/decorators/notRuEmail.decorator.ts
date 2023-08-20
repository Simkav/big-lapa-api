import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: true })
export class IsNotRuEmailConstraint implements ValidatorConstraintInterface {
  validate(email: string) {
    return !email.includes('.ru');
  }

  defaultMessage() {
    return 'Email should not contain .ru domain';
  }
}

export function IsNotRuEmail(validationOptions?: ValidationOptions) {
  return (target: object, propertyName: string) => {
    registerDecorator({
      name: 'isNotRuEmail',
      target: target.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: IsNotRuEmailConstraint,
    });
  };
}
