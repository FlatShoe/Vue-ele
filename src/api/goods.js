import {createApi} from '../utils/request'

export const goods = (data) => createApi('api/goods', 'get', data)