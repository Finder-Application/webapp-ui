import { AsyncImage } from '@/components';
import { CalendarIcon2 } from '@/components/Icons';
import React from 'react';
import { cx } from './Contents';
import { LoadMoreBtn } from './LoadMoreBtn';

type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;
export const RelevantResources = (props: Props) => {
  const RelevantResourceItem = () => {
    return (
      <div className={cx('content__relevant-resources__item')}>
        <AsyncImage
          className={cx('content__relevant-resources__item__image')}
          src='https://www.arabnews.pk/sites/default/files/styles/n_670_395/public/2018/09/17/1314126-1982278251.png?itok=HWEZn2lU'
        />
        <div className='m-4 w-100 d-flex flex-column justify-content-between'>
          <h4>
            In publishing and graphic design, Lorem ipsum is a placeholder
          </h4>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>

          <div
            className={cx(
              'content__relevant-resources__item__published-date',
              'd-flex flex-row align-items-center justify-content-end'
            )}
          >
            <CalendarIcon2 width={15} height={15} />
            <div className='ml-2'>10/09/2022</div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div {...props} className={cx('content__relevant-resources')}>
      <div style={{ fontSize: '1.5rem' }} className='mb-5'>
        There are <span className='font-italic'>26 resources results</span>{' '}
        relating to your post&nbsp;
        <span className='font-weight-bold'>
          Lorem Ipsum is simply dummy text of the printing.
        </span>
      </div>
      {Array(5)
        .fill(null)
        .map((_, index) => (
          <RelevantResourceItem key={index} />
        ))}

      <LoadMoreBtn />
    </div>
  );
};
