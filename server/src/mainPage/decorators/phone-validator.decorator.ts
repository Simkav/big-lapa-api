import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

const regexp = new RegExp(/^[0-9 ]$/gm);
const splitedNumberLengths = [3, 2, 3, 4];

@ValidatorConstraint({ async: true })
export class ValidateNumberConstraint implements ValidatorConstraintInterface {
  validate(number: string) {
    if (!number) return false;
    if (regexp.test(number)) {
      return false;
    }
    const splitedNumbers = number.split(' ');
    if(splitedNumbers[0]!=='380') return false
    return splitedNumbers.every(
      (numbers, i) => numbers.length === splitedNumberLengths[i],
    );
  }

  defaultMessage() {
    return 'Невірний формат телефону (380 67 568 1788) ';
  }
}

export function ValidateNumber(validationOptions?: ValidationOptions) {
  return (target: object, propertyName: string) => {
    registerDecorator({
      name: 'ValidateNumber',
      target: target.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: ValidateNumberConstraint,
    });
  };
}
