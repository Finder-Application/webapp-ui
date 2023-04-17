import Post from '@/containers/home/Post/Post';
import { useGetPosts } from '@/hooks/post';
import useAppMemo from '@/hooks/useAppMemo';
import HomeLayout from '@/layouts/HomeLayout/HomeLayout';
import { useState } from 'react';

const NewHomepage = () => {
  const [postParams, setPostParams] = useState({
    page: 1,
    take: 10,
  });
  const { data: postResponse } = useGetPosts(postParams);

  const postList = useAppMemo(
    () => postResponse?.pages.map((i) => i.data)[0],
    [postResponse?.pages]
  );

  return (
    <HomeLayout>
      {postList?.map((p) => (
        <Post {...p} />
      ))}
    </HomeLayout>
  );
};

export default NewHomepage;
