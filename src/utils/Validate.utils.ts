import { regex } from '@/configs';

export class ValidateUtils {
  static isEmail(email: string): boolean {
    return regex.email.test(email);
  }
}
