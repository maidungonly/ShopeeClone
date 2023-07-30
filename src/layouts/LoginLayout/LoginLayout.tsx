import React from 'react'
import LoginHeader from 'src/components/LoginHeader'
import Footer from 'src/components/Footer'
//rfc
interface Props {
  children?: React.ReactNode
}
export default function LoginLayout({ children }: Props) {
  return (
    <div>
      <LoginHeader />
      {children}
      <Footer />
    </div>
  )
}
