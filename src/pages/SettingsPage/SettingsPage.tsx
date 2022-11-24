import React from 'react';
import classNames from 'classnames/bind';
import styles from './SettingsPage.module.scss';
import FormSettingsProfile from './components/FormSettingsProfile';

const cn = classNames.bind(styles);
const SettingsPage = () => {
  const renderDashboard = () => {
    return (
      <div className={cn('sidebar')}>
        <div className={cn('item')}>Account</div>
      </div>
    );
  };
  const renderContent = () => {
    return (
      <div className={cn('content')}>
        <FormSettingsProfile />
      </div>
    );
  };
  return (
    <div className={cn('settings-page', 'row')}>
      {renderDashboard()}
      {renderContent()}
    </div>
  );
};

export default SettingsPage;
