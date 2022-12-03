import moment from 'moment';

interface FormatUserName {
  user: {
    firstName?: string;
    lastName?: string;
    middleName?: string;
  };
  option?: 'short' | 'long';
}

export const formatUserName = (value: FormatUserName) => {
  const { user, option } = value;
  const { firstName, lastName, middleName } = user;
  if (option === 'short') {
    return `${firstName} ${lastName}`;
  }
  return `${firstName} ${middleName} ${lastName}`;
};

type optionFormatDate =
  | 'DD/MM/YYYY'
  | 'DD/MM/YYYY HH:mm:ss'
  | 'HH:mm:ss'
  | 'HH:mm'
  | 'DD/MM/YYYY HH:mm' //   'June 1st, 2019'
  | 'MMMM d, YYYY'
  | 'M/D/YYYY'
  | 'L' // 11/06/2022
  | 'LL' // November 12, 2022
  | 'LLL' // November 12, 2022 10:19 AM
  | 'LLLL'; // Tuesday, November 22, 2022 7:00 AM
export const formatDate = (createdAt: Date, option: optionFormatDate) => {
  return moment(createdAt).format(option);
};
