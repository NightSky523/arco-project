import { QueryClient } from '@tanstack/react-query'

// 创建 QueryClient 实例，配置全局默认选项
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 数据在内存中保持新鲜的时间（毫秒）
      staleTime: 1000 * 60 * 5, // 5分钟
      // 数据在缓存中保留的时间（毫秒）
      gcTime: 1000 * 60 * 10, // 10分钟
      // 请求失败后的重试次数
      retry: 1,
      // 请求失败后的重试延迟
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      // 窗口重新获得焦点时是否重新获取数据
      refetchOnWindowFocus: false,
      // 网络重新连接时是否重新获取数据
      refetchOnReconnect: true,
      // 组件重新挂载时是否重新获取数据
      refetchOnMount: true,
    },
    mutations: {
      // 请求失败后的重试次数
      retry: 1,
    },
  },
})

export default queryClient
