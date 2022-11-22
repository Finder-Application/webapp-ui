import { Modal } from 'antd';
import React, { useState } from 'react';
import { useRoutes } from 'react-router-dom';
import { DescriptionForm } from '../CreatePostPage/DescriptionForm';

const TestPage = () => {
  console.log('run test 2');
  const [state, setState] = useState(false);

  React.useEffect(() => {
    setState(true);
  }, []);
  return (
    <div>
      <Modal visible={state}>Hello 2323 3232 323 3434 323 434huy</Modal>
    </div>
  );
};

export default TestPage;
