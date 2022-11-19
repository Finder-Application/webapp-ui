import { initSocket } from '@/configs/socket';
import { useUserStore } from '@/store/user';
import { useEffect, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';
import { useGetMe } from '../auth/query';

export const useNoti = () => {
  // use socket io to connect to http://localhost:9000/api/

  // use state to store the notification
  const [noti, setNoti] = useState<any[]>([]);
  const [totalNoti, setTotalNoti] = useState(0);

  const data = useUserStore((state) => state.user);
  // use effect to listen to the event "notification" from the server
  useEffect(() => {
    if (data?.uuid) {
      const socket = initSocket('api/notifications');
      // log when socket connected
      socket.on('connect', () => {
        console.log('socket connected');
      });

      socket.on('take-notification', (data: any) => {
        // add the new notification to the state
        console.log('take-notification', data);
        //   setNoti((prev) => [...prev, data]);
      });

      socket.on('take-total-notification', (data: number) => {
        setTotalNoti(+data);
      });

      return () => {
        socket?.disconnect();
      };
    }
  }, [data]);
  // return the state
  return { totalNoti };
};
