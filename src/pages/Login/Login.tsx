import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { omit } from 'lodash'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import authAPI from 'src/apis/auth.api'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import { AppContext } from 'src/contexts/app.context'
import { ErrorResponseApi } from 'src/types/utils.type'
import { Schema, schema } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'

type FormData = Pick<Schema, 'email' | 'password'>
const loginSchema = schema.pick(['email', 'password'])
export default function Login() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })
  const loginAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => authAPI.loginAccount(body)
  })
  const onSubmit = handleSubmit((data) => {
    loginAccountMutation.mutate(data, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        navigate('/')
      },
      onError: (errors) => {
        if (isAxiosUnprocessableEntityError<ErrorResponseApi<FormData>>(errors)) {
          const formError = errors.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof FormData, {
                message: formError[key as keyof FormData],
                type: 'Server'
              })
            })
          }
        }
      }
    })
  })

  return (
    <div className='bg-orange'>
      <div className='container'>
        <div className='grid grid-cols-1 py-14 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-left text-2xl'>Đăng nhập</div>
              <Input
                name='email'
                register={register}
                type='email'
                className='mt-8'
                errorMessage={errors.email?.message}
                placeholder='Email'
              />
              <Input
                name='password'
                register={register}
                type='password'
                className='mt-2'
                errorMessage={errors.password?.message}
                placeholder='Mật khẩu'
                autoComplete='on'
              />
              <div className='mt-3'>
                <Button
                  type='submit'
                  className='flex w-full items-center justify-center rounded bg-red-500 px-2 py-4 text-center text-sm uppercase text-white hover:bg-red-600'
                  isLoading={loginAccountMutation.isLoading}
                  disabled={loginAccountMutation.isLoading}
                >
                  Đăng nhập
                </Button>
              </div>
              <div className='mt-1'>
                <div className=''>
                  <div className='inline-flex w-full items-center justify-center'>
                    <hr className='my-8 h-0.5 w-64 rounded-sm border-0 bg-gray-200 dark:bg-gray-700' />
                    <span className='text-center'> Hoặc </span>
                    <hr className='my-8 h-0.5 w-64 rounded-sm border-0 bg-gray-200 dark:bg-gray-700' />
                  </div>
                </div>
              </div>
              <div className='flex items-center p-3'>
                <div className='border-1.5 w-50 rounded-sm border'>
                  <button className='flex items-center'>
                    <div className='px-4'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-8 w-8 text-red-400'
                        fill='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path d='M7 11v2.4h3.97c-.16 1.029-1.2 3.02-3.97 3.02-2.39 0-4.34-1.979-4.34-4.42 0-2.44 1.95-4.42 4.34-4.42 1.36 0 2.27.58 2.79 1.08l1.9-1.83c-1.22-1.14-2.8-1.83-4.69-1.83-3.87 0-7 3.13-7 7s3.13 7 7 7c4.04 0 6.721-2.84 6.721-6.84 0-.46-.051-.81-.111-1.16h-6.61zm0 0 17 2h-3v3h-2v-3h-3v-2h3v-3h2v3h3v2z' />
                      </svg>
                    </div>
                    <div className='mr-1 p-2 text-base'>Google</div>
                  </button>
                </div>
                <div className='border-1.5 w-50 mx-20 rounded-sm border '>
                  <button className='flex items-center'>
                    <div className='px-2'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-6 w-8 text-blue-500'
                        fill='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path d='M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z' />
                      </svg>
                    </div>
                    <div className='mr-1 p-2 text-base '>Facebook</div>
                  </button>
                </div>
              </div>
              <div className='mt-3 flex items-center justify-center'>
                <span className='text-gray-400'>Bạn chưa có tài khoản?</span>
                <Link className='ml-2 text-red-400' to='/register'>
                  Đăng ký
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
