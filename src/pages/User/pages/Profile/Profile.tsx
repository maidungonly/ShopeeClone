import React from 'react'
import Input from 'src/components/Input'

export default function Profile() {
  return (
    <div className='rounded-sm bg-white px-2 pb-20 shadow md:px-7'>
      <div className='border-b border-b-gray-200 py-6 text-left'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>Hồ sơ của tôi</h1>
        <div className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
      </div>
      <form className='mt-8 flex flex-col-reverse md:flex-row md:items-start'>
        <div className='mt-6 flex-grow md:mt-0 md:pr-12'>
          <div className='mt-2 flex flex-wrap'>
            <div className='w-[20%] truncate pt-3 text-right capitalize'>Email</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <div className='ml-5 pt-3 text-gray-400'>dung***@gmail.com</div>
            </div>
          </div>

          <div className='mt-7 flex flex-wrap'>
            <div className='w-[20%] truncate pt-3 text-right capitalize'>Tên</div>
            <div className='pl-5 sm:w-[80%]'>
              <Input classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm' />
            </div>
          </div>
          <div className='mt-2 flex flex-wrap'>
            <div className='w-[20%] truncate pt-3 text-right capitalize'>Số điện thoại</div>
            <div className='pl-5 sm:w-[80%]'>
              <Input classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm' />
            </div>
          </div>
          <div className='mt-2 flex flex-wrap'>
            <div className='w-[20%] truncate pt-3 text-right capitalize'>Địa chỉ</div>
            <div className='pl-5 sm:w-[80%]'>
              <Input classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm' />
            </div>
          </div>
          <div className='mt-2 flex flex-wrap'>
            <div className='w-[20%] truncate pt-3 text-right capitalize'>Ngày sinh</div>
            <div className='pl-5 sm:w-[80%]'>
              <div className='flex justify-between'>
                <select className='h-10 w-[32%] rounded-sm border border-black/10 px-3'>
                  <option disabled>Ngày</option>
                </select>
                <select className='h-10 w-[32%] rounded-sm border border-black/10 px-3'>
                  <option disabled>Tháng</option>
                </select>
                <select className='h-10 w-[32%] rounded-sm border border-black/10 px-3'>
                  <option disabled>Năm</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className='flex justify-center md:w-72 md:border-l md:border-l-gray-200'>
          <div className='flex flex-col items-center'>
            <div className='h-22 my-5 w-24'>
              <img
                src='https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png'
                alt=''
                className='h-full w-full rounded-full object-cover'
              />
            </div>
            <input className='hidden' type='file' accept='.jpg, .jpeg, .png' />
            <button className='flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm'>
              Chọn ảnh
            </button>
            <div className='mt-3 text-gray-600'>
              <div>Dung lượng tối đa là 1MB</div>
              <div>Định dạng: .JPEG, .PNG </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
