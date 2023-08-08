import React, { useContext } from 'react'
import Popover from '../Popover'
import { Link } from 'react-router-dom'
import path from 'src/constants/path'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import authAPI from 'src/apis/auth.api'
import { purchasesStatus } from 'src/constants/purchase'
import { AppContext } from 'src/contexts/app.context'

export default function NavHeader() {
  const { setIsAuthenticated, isAuthenticated, setProfile, profile } = useContext(AppContext)
  const queryClient = useQueryClient()
  const logoutMutation = useMutation({
    mutationFn: authAPI.logout,
    onSuccess: () => {
      setIsAuthenticated(false)
      setProfile(null)
      queryClient.removeQueries({ queryKey: ['purchases', { status: purchasesStatus.inCart }] })
    }
  })
  const handleLogout = () => {
    logoutMutation.mutate()
  }
  return (
    <div className='flex justify-end'>
      <Popover
        className='hover:text-white/700 flex cursor-pointer items-center py-1'
        renderPopover={
          <div className='hover:text-white/700 relative rounded-sm border bg-white shadow-md'>
            <button className='py-2 pl-3 pr-28 hover:text-orange'>Tiếng Việt</button>
            <br />
            <button className='mt-2 px-3 py-2 hover:text-orange'>日本語</button>
          </div>
        }
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-5 w-5'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 5.5-5.03 5.5-9S14.485 3 12 3m0 18c-2.485 0-5.5-5.03-5.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 5.582M12 3a8.997 8.997 0 00-7.843 5.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-5.418'
          />
        </svg>
        <span className='mx-1'>Tiếng Việt</span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-5 w-5'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
        </svg>
      </Popover>
      {isAuthenticated && (
        <Popover
          className='hover:text-white/700 ml-6 flex cursor-pointer items-center py-1'
          renderPopover={
            <div>
              <Link
                to={path.profile}
                className='hover block w-full bg-white px-3 py-2 text-left hover:bg-slate-100 hover:text-cyan-500'
              >
                Tài khoản của tôi
              </Link>
              <Link
                to='/'
                className='hover block w-full bg-white px-3 py-2 text-left hover:bg-slate-100 hover:text-cyan-500'
              >
                Đơn hàng
              </Link>
              <button
                onClick={handleLogout}
                className='hover block w-full bg-white px-3 py-2 text-left hover:bg-slate-100 hover:text-cyan-500'
              >
                Đăng xuất
              </button>
            </div>
          }
        >
          <div className='h-5 w-5 flex-shrink-0'>
            <img
              src='https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png'
              alt='avatar'
              className='h-full w-full rounded-full object-cover'
            />
          </div>
          <div className='mx-1'>{profile?.email}</div>
        </Popover>
      )}

      {!isAuthenticated && (
        <div className='flex items-center'>
          <Link to={path.register} className='mx-3 capitalize hover:text-white/70'>
            Đăng ký
          </Link>
          <div className='h-4 border-r-[1px] border-r-white/40' />
          <Link to={path.login} className='mx-3 capitalize hover:text-white/70'>
            Đăng nhập
          </Link>
        </div>
      )}
    </div>
  )
}
