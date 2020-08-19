import {createApi} from '../utils/request'

export const ratings = (data) => createApi('api/ratings', 'get', data)