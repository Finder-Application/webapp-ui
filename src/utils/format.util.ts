import moment from 'moment';

interface FormatUserName {
  user: {
    firstName: string;
    lastName: string;
    middleName: string;
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
  | 'M/D/YYYY'; //'6/1/2019'
export const formatDate = (createdAt: Date, option: optionFormatDate) => {
  return moment(createdAt).format(option);
};
