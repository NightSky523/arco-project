import { useState } from 'react'
import { Form, Input, Button, Card, Typography, Message } from '@arco-design/web-react'
import { IconUser, IconLock } from '@arco-design/web-react/icon'
import { useNavigate } from 'react-router-dom'
import { useGlobal } from '@/stores/global'

const { Title } = Typography
const FormItem = Form.Item

// 登录表单数据类型
interface LoginFormData {
  username: string
  password: string
}

function Login() {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { setToken, setMe } = useGlobal()

  // 处理登录提交
  const handleSubmit = async (values: LoginFormData) => {
    setLoading(true)
    try {
      // 模拟登录请求 - 实际项目中应该调用真实的 API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // 验证用户名和密码 (这里使用模拟数据)
      if (values.username === 'admin' && values.password === '123456') {
        // 登录成功,保存 token 和用户信息
        const token = 'mock-token-' + Date.now()
        setToken(token)
        setMe({
          id: 1,
          username: values.username,
          email: 'admin@example.com',
        })

        Message.success('登录成功')
        navigate('/')
      } else {
        Message.error('用户名或密码错误')
      }
    } catch (error) {
      Message.error('登录失败,请重试')
      console.error('登录错误:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card
        className="w-full max-w-md shadow-xl"
        style={{ borderRadius: '12px' }}
      >
        <div className="text-center mb-8">
          <Title heading={3} className="text-gray-800">
            欢迎登录
          </Title>
          <p className="text-gray-500 mt-2">请输入您的账号信息</p>
        </div>

        <Form
          form={form}
          onSubmit={handleSubmit}
          autoComplete="off"
          layout="vertical"
          requiredSymbol={false}
        >
          <FormItem
            field="username"
            label="用户名"
            validateTrigger="onBlur"
            rules={[
              { required: true, message: '请输入用户名' },
            ]}
          >
            <Input
              prefix={<IconUser />}
              placeholder="请输入用户名"
              size="large"
            />
          </FormItem>

          <FormItem
            field="password"
            label="密码"
            validateTrigger="onBlur"
            rules={[
              { required: true, message: '请输入密码' },
              { minLength: 6, message: '密码至少6位' },
            ]}
          >
            <Input.Password
              prefix={<IconLock />}
              placeholder="请输入密码 (至少6位)"
              size="large"
            />
          </FormItem>

          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              long
              size="large"
              loading={loading}
            >
              登录
            </Button>
          </FormItem>
        </Form>

        <div className="text-center mt-6 text-sm text-gray-500">
          <p>测试账号: admin / 123456</p>
        </div>
      </Card>
    </div>
  )
}

export default Login
