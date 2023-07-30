import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'
// import { AnyObject } from 'yup/lib/types'
type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
  email: {
    required: {
      value: true,
      message: 'Vui lòng nhập email'
    },
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: 'Email không đúng định dạng'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài từ 5 - 160 ký tự'
    },
    minLength: {
      value: 5,
      message: 'Độ dài từ 5 - 160 ký tự'
    }
  },
  password: {
    required: {
      value: true,
      message: 'Vui lòng nhập mật khẩu'
    },
    pattern: {
      value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      message: `Mật khẩu phải từ 8 ký tự.
                Có chữ cái viết hoa, số và ký tự đặc biệt
                `
    }
  },
  confirm_password: {
    required: {
      value: true,
      message: 'Nhập lại mật khẩu'
    },
    validate:
      typeof getValues === 'function'
        ? (value) => value === getValues('password') || 'Nhập lại password không khớp'
        : undefined
  }
})

export const schema = yup
  .object({
    email: yup
      .string()
      .required('Vui lòng nhập email')
      .email('Email không đúng định dạng')
      .min(5, 'Độ dài từ 5-160 ký tự')
      .max(160, 'Độ dài từ 5-160 ký tự')
      .matches(/^\S+@\S+\.\S+$/, 'Email không đúng định dạng'),
    password: yup
      .string()
      .required('Vui lòng nhập mật khẩu')
      .min(8, 'Mật khẩu phải từ 8 ký tự')
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        'Mật khẩu phải bao gồm chữ cái viết hoa, số và ký tự đặc biệt'
      ),
    confirm_password: yup
      .string()
      .required('Nhập lại mật khẩu')
      .oneOf([yup.ref('password')], 'Mật khẩu không khớp'),
    price_min: yup.string().test({
      name: 'price-not-allowed',
      message: 'Giá không phù hợp',
      test: function (value) {
        const price_min = value
        const { price_max } = this.parent
        if (price_min !== '' && price_max !== '') {
          return Number(price_max) >= Number(price_min)
        }
        return price_min !== '' || price_max !== ''
      }
    }),
    price_max: yup.string().test({
      name: 'price-not-allowed',
      message: 'Giá không phù hợp',
      test: function (value) {
        const price_max = value
        const { price_min } = this.parent
        if (price_min !== '' && price_max !== '') {
          return Number(price_max) >= Number(price_min)
        }
        return price_min !== '' || price_max !== ''
      }
    }),
    name: yup.string().trim().required('Phải nhập tên sản phẩm')
  })
  .required()
export type Schema = yup.InferType<typeof schema>
