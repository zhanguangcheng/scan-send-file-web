import { loadInterceptors, interceptors } from '@/utils/request'
import { message } from 'ant-design-vue'

export default function bootstrap({ router }) {
  loadInterceptors(interceptors, { router, message })
}
