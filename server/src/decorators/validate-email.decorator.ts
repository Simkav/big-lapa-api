import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

const regExp = new RegExp('^[a-zA-Z0-9_.-]+$');
const forbiddenSymbolsOnCorners = ['.', '-', '_'];

@ValidatorConstraint()
export class ValidateEmailConstraint implements ValidatorConstraintInterface {
  validate(email: string) {
    const [prefix] = email.split('@');
    if (!regExp.test(prefix)) {
      return false;
    }
    if (
      [prefix.at(0), prefix.at(-1)].some((cornerSymbol) =>
        forbiddenSymbolsOnCorners.includes(cornerSymbol),
      )
    ) {
      return false;
    }
    return true
  }

  defaultMessage() {
    return 'Невалідний email';
  }
}

export function ValidateEmail(validationOptions?: ValidationOptions) {
  return (target: object, propertyName: string) => {
    registerDecorator({
      name: 'ValidateEmailConstraint',
      target: target.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: ValidateEmailConstraint,
    });
  };
}
