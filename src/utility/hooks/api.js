import {
    ApiProfessionRepository,
    ApiProfessionIdRepository,
    ApiUserAddRepository,
    ApiUserAllRepository,
    ApiUserIdRepository,
    ErrorRepository,
} from 'repository';
import { useQuery, useMutation, queryCache } from 'react-query';

// const mm =() => {
//     return useQuery('ss',ApiProfessionRepository.apiProfessionGet,{
//         refetchOnReconnect:true,
//     })
// }