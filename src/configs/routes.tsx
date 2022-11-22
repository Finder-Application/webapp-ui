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
  relevantPostsAndResources: '/relevantPostsAndResources',
  yourPosts: '/your-posts',
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
    page: lazy(() => import('@/pages/Homepage/Homepage')),
    title: 'About',
  },
  {
    path: ROUTES.guide,
    page: React.lazy(() => import('@/pages/Homepage/Homepage')),
    title: 'Guild Lines',
  },

  {
    path: ROUTES.search,
    page: lazy(() => import('@/pages/ReSearchPage/ReSearchPage')),
    title: 'Search',
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
];

export { publicRoutes, privateRoutes };
