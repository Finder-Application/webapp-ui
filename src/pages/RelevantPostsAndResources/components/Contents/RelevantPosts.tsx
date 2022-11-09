import { Post as PostComponent } from '@/components';
import { Post } from '@/hooks/post/interface';
import React from 'react';
import { LoadMoreBtn } from './LoadMoreBtn';

type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export const RelevantPosts = (props: Props) => {
  const tempPost: Post = {
    hometown: {
      region: 'Thanh Pho Ho Chi Minh',
      state: 'Quan 12',
      commune: 'Phong Phu',
      hamlet: '',
    },
    missingAddress: {
      region: 'Thanh Pho Ho Chi Minh',
      state: 'Quan 12',
      commune: 'Phong Phu',
      hamlet: '',
    },
    id: 1,
    userId: 123,
    title: 'A documentary film will be made of the rehearsal process',
    fullName: 'Nguyen Dinh Khoi',
    nickname: 'Ken',
    dateOfBirth: '2010-05-08',
    gender: 1,
    photos: ['https://ychef.files.bbci.co.uk/976x549/p0b4bchd.jpg'],
    description: 'Description',
    shareCount: 2,
    updatedAt: new Date(),
    createdAt: new Date(),
    owner: {
      avatar: 'https://ychef.files.bbci.co.uk/976x549/p0b4bchd.jpg',
      uuid: '1234',
      middleName: '',
      latsName: '',
      firstName: 'Nguyen Dinh Thang',
    },
  };
  return (
    <div {...props}>
      <div style={{ fontSize: '1.5rem' }} className='mb-5'>
        There are <span className='font-italic'>26 post results</span> relating
        to your post&nbsp;
        <span className='font-weight-bold'>
          Lorem Ipsum is simply dummy text of the printing.
        </span>
      </div>
      <div className='d-flex row flex-wrap justify-content-start align-items-center'>
        {Array(10)
          .fill(null)
          .map((_, index) => (
            <div key={index} className='col-xl-4'>
              <PostComponent postItem={tempPost} key={index} />
            </div>
          ))}
      </div>
      <LoadMoreBtn />
    </div>
  );
};
