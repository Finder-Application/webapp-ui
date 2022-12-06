type Gender = 'female' | 'male';
export class UserUtils {
  static toStringGender(gender?: boolean): Gender {
    return gender ? 'female' : 'male';
  }

  static toBooleanGender(gender?: Gender): boolean {
    return gender === 'male' ? false : true;
  }
}
