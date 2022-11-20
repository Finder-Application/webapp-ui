import StorageUtils from '@/utils/Storage.utils';
import { io, Socket } from 'socket.io-client';
import { constants } from './constants';

export const initSocket = (path: string): Socket => {
  const url = constants.BASE_URL;

  const token = StorageUtils.get('token');

  const socket = io(`${url}`, {
    path: `/${path}`,
    reconnectionDelayMax: 10000,
    query: {
      token,
    },
    transports: ['polling', ''],
    secure: true,
  });
  return socket;
};
