import { Button, Card, Typography } from '@arco-design/web-react'

const { Title, Paragraph } = Typography

function Home() {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <Card>
        <Title heading={2}>首页</Title>
        <Paragraph>
          欢迎来到 Arco Design 项目！这是一个使用 React Router 配置的路由示例。
        </Paragraph>
        <Button type="primary" onClick={() => alert('点击了首页按钮')}>
          点击我
        </Button>
      </Card>
    </div>
  )
}

export default Home
