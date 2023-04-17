import { User } from '@/hooks/auth/interface';

type Gender = 'female' | 'male';
export class UserUtils {
  static toStringGender(gender?: boolean): Gender {
    return gender ? 'female' : 'male';
  }

  static toBooleanGender(gender?: Gender): boolean {
    return gender === 'male' ? false : true;
  }

  /**
   * If the user has a middle name, return the full name, otherwise return the first and last name
   * @param {User} user - User - this is the parameter that we are passing to the function.
   * @returns A string
   */
  static getFullName(user: User): string {
    return `${user?.firstName ?? ''} ${user?.middleName ?? ''} ${
      user?.lastName ?? ''
    }`.trim();
  }
}
