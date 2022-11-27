import { AuthLayout } from '@/layouts';
import React, { lazy } from 'react';

// * Define all routes for websites
export const ROUTES = {
  login: '/login',
  register: '/register',
  home: '/',
  about: '/about',
  guide: '/guide',
  search: '/search',
  createPost: '/create-post',
  editPost: '/edit-post',
  forgotPassword: '/forgot-password',
  relevantPostsAndResources: '/relevantPostsAndResources/:id',
  yourPosts: '/your-posts',
  settings: '/settings',
  postDetail: '/post-detail/:id',
};

const publicRoutes: RouteFinder[] = [
  {
    path: ROUTES.login,
    title: 'Login',
    layout: AuthLayout,
    page: lazy(() => import('@/pages/LoginPage/LoginPage')),
  },
  {
    path: ROUTES.forgotPassword,
    title: 'forgot password',
    layout: AuthLayout,
    page: lazy(() => import('@/pages/ForgotPasswordPage/ForgotPasswordPage')),
  },
  {
    path: ROUTES.register,
    title: 'Register',
    layout: AuthLayout,
    page: lazy(() => import('@/pages/RegisterPage/RegisterPage')),
  },
  {
    path: ROUTES.home,
    page: lazy(() => import('@/pages/Homepage/Homepage')),
    title: 'Homepage',
  },
  {
    path: ROUTES.about,
    page: lazy(() => import('@/pages/ComingSoon/ComingSoonPage')),
    title: 'About',
  },
  {
    path: ROUTES.guide,
    page: React.lazy(() => import('@/pages/ComingSoon/ComingSoonPage')),
    title: 'Guild Lines',
  },

  {
    path: ROUTES.search,
    page: lazy(() => import('@/pages/ReSearchPage/ReSearchPage')),
    title: 'Search',
  },
  {
    path: ROUTES.postDetail,
    page: lazy(
      () => import('@/components/PostList/components/PostDetail/PostDetail')
    ),
    title: 'Post Detail',
  },
];

const privateRoutes: RouteFinder[] = [
  {
    path: ROUTES.createPost,
    page: lazy(() => import('@/pages/CreatePostPage/UpsertPostPage')),
    title: 'Create Post',
  },
  {
    path: ROUTES.relevantPostsAndResources,
    page: lazy(
      () =>
        import('@/pages/RelevantPostsAndResources/RelevantPostsAndResources')
    ),
    title: 'Relevant posts and resources',
  },
  {
    path: ROUTES.yourPosts,
    page: lazy(() => import('@/pages/YourPosts/YourPosts')),
    title: 'Your Posts',
  },
  {
    path: ROUTES.editPost,
    title: 'Edit Post',
    page: lazy(() => import('@/pages/CreatePostPage/UpsertPostPage')),
    params: ':id',
  },

  {
    path: ROUTES.settings,
    title: 'Settings Post',
    page: lazy(() => import('@/pages/SettingsPage/SettingsPage')),
  },
];

export { publicRoutes, privateRoutes };
