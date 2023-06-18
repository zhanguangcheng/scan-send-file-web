import { get, post, request, axiosInstance } from '@/utils/request'
import * as util from '@/utils/util'
import { message } from 'ant-design-vue'
import 'ant-design-vue/es/message/style/css';

export const ENV_MODE = import.meta.env.MODE
export const ENV_PROD = import.meta.env.PROD
export const ENV_DEV = import.meta.env.DEV
export const APP_NAME = import.meta.env.VITE_APP_NAME
export const APP_VERSION = import.meta.env.VITE_APP_VERSION
export const APP_HOST = import.meta.env.VITE_APP_HOST
export const APP_BASE_PATH = import.meta.env.VITE_APP_BASE_PATH

export const $message = message
export const $util = util
export const $get = get
export const $post = post
export const $request = request
export const $axios = axiosInstance
