import { useState } from 'react'
import { Card, Typography, Input, Button, Space } from '@arco-design/web-react'

const { Title, Paragraph } = Typography

function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = () => {
    console.log('提交表单:', { name, email, message })
    alert(`感谢 ${name} 的留言！`)
    setName('')
    setEmail('')
    setMessage('')
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <Card>
        <Title heading={2}>联系我们</Title>
        <Paragraph>
          如果有任何问题或建议，请填写下面的表单。
        </Paragraph>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Input
            placeholder="姓名"
            value={name}
            onChange={setName}
            allowClear
          />
          <Input
            placeholder="邮箱"
            value={email}
            onChange={setEmail}
            allowClear
          />
          <Input.TextArea
            placeholder="留言内容"
            value={message}
            onChange={setMessage}
            allowClear
            autoSize={{ minRows: 4, maxRows: 8 }}
          />
          <Button type="primary" onClick={handleSubmit}>
            提交
          </Button>
        </Space>
      </Card>
    </div>
  )
}

export default Contact
