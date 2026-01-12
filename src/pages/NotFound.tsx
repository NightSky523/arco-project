import { Result, Button } from '@arco-design/web-react'
import { useNavigate } from 'react-router-dom'

function NotFound() {
  const navigate = useNavigate()

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <Result
        status='404'
        subTitle='抱歉，您访问的页面不存在'
        extra={
          <Button type='primary' onClick={() => navigate('/')}>
            返回首页
          </Button>
        }
      />
    </div>
  )
}

export default NotFound
