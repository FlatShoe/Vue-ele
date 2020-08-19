import {createApi} from '../utils/request'


export const sellers = (data) => createApi('api/seller', 'get', data)