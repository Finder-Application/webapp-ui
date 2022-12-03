import { Checkbox, Col, Form, Row } from 'antd';
import { cn } from '../SettingsPage';

const NotificationForm = () => {
  return (
    <div className={cn('notification')}>
      <div className='d-flex flex-row justify-content-between align-items-center mb-4'>
        <h3>Alerts & Notifications</h3>
        <div className={cn('toggle-all-btn')}>Toggle all</div>
      </div>
      <div className='d-flex flex-column'>
        <Checkbox className='mb-4'>
          Send me when someone comments on my posts
        </Checkbox>
        <Checkbox className='mx-0'>
          Send me when there is a matching post
        </Checkbox>
      </div>
    </div>
  );
};

export default NotificationForm;
