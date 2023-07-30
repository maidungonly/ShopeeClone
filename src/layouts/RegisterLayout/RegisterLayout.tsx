import React from 'react'
import RegisterHeader from 'src/components/RegisterHeader'
import Footer from 'src/components/Footer'
//rfc
interface Props {
  children?: React.ReactNode
}
export default function RegisterLayout({ children }: Props) {
  return (
    <div>
      <RegisterHeader />
      {children}
      <Footer />
    </div>
  )
}
