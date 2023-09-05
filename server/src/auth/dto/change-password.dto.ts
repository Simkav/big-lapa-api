import { PasswordValidation } from '../decorators/password-validation.decorator';

export class ChangePasswordDto {
  @PasswordValidation()
  currentPassword: string;

  @PasswordValidation()
  newPassword: string;
}
