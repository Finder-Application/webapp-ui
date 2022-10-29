// import { axiosClient } from '@/apis';
// import {
//   formatOptionQuery,
//   IFormatOptionQuery,
// } from '@/utils/getPagiantion.util';
// import { useQuery, UseQueryResult } from 'react-query';
// import { RESOURCE } from '../constants';
// import { IBaseUseQuery } from '../interfaces';

// const getPagination = <T>(
//   query: IFormatOptionQuery,
//   resource: RESOURCE,
//   isPublic?: boolean
// ): Promise<T> => {
//   const baseUrl = `/api/${isPublic ? 'public' : 'private'}/${resource}`;
//   return axiosClient.get(baseUrl, {
//     params: formatOptionQuery(query),
//   });
// };

// // in here we can use uesGetPagination for all api getPagination
// // because in backend side we are config the same for each api
// // So how to use
// // Ex: for api getPagination
// // GET /api/private/posts  configApi={
// //                              resource:RESOURCE.POST,
// //                              isPublic:false
// //                          }

// export const uesGetPagination = <T>(
//   config: IBaseUseQuery<T>
// ): UseQueryResult<T> => {
//   const { dependencies, defineQueryKey, configQuery, query, configApi } =
//     config;

//   const response = useQuery<T>(
//     [defineQueryKey, ...dependencies],
//     () => getPagination<T>(query, configApi.resource, configApi.isPublic),
//     {
//       ...configQuery,
//     }
//   );
//   return response;
// };
