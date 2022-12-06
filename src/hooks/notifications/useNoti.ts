import { initSocket } from '@/configs/socket';
import { queryClient } from '@/main';
import { useUserStore } from '@/store/user';
import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { QUERY_KEY } from '../constants';

export const useNoti = () => {
  // use socket io to connect to http://localhost:9000/api/

  // use state to store the notification
  const [totalNoti, setTotalNoti] = useState(0);
  const [socket, setSocket] = useState<Socket>();

  const user = useUserStore((state) => state.user);

  // use effect to listen to the event "notification" from the server
  useEffect(() => {
    if (user?.userId) {
      const socket = initSocket('api/notifications');

      setSocket(socket);

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

      socket.on('reduce-notification', () => {
        console.log('reduce-notification');
        setTotalNoti((prev) => prev - 1);
      });

      socket.on('increase-notification', () => {
        setTotalNoti((prev) => prev + 1);
      });

      socket.on('new-notification', (data) => {
        queryClient.refetchQueries([QUERY_KEY.PAGINATION_COMMENTS]);
        queryClient.refetchQueries([QUERY_KEY.COUNT_COMMENT]);
      });

      return () => {
        socket?.disconnect();
      };
    }
  }, [user?.userId]);
  // return the state
  return { totalNoti, socket };
};

// socket.emit('seen-notification', {
//   postId: 2,
//   type: 'post',
// });
