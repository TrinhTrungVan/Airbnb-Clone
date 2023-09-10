import './globals.css'
import type {Metadata} from 'next'
import {Poppins, Nunito} from 'next/font/google'
import StyledComponentsRegistry from './libs/registry'
import Navbar from './components/navbar/Navbar'
import ClientOnly from './components/ClientOnly'
import RegisterModal from './components/modals/RegisterModal'
import ToasterProvider from './providers/ToasterProvider'
import LoginModal from './components/modals/LoginModal'
import getCurrentUser from './actions/getCurrentUser'
import RentModal from './components/modals/RentModal'
import SearchModal from './components/modals/SearchModal'

const font = Nunito({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '900'],
})

export const metadata: Metadata = {
  title: 'Airbnb',
  description: 'Airbnb Clone',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser()
  return (
    <html lang="en">
      <body className={font.className}>
        <StyledComponentsRegistry>
          <ClientOnly>
            <ToasterProvider />
            <LoginModal />
            <RegisterModal />
            <RentModal />
            <SearchModal />
            <Navbar currentUser={currentUser} />
          </ClientOnly>
          <div
            style={{
              padding: '120px 0 300px',
            }}>
            {children}
          </div>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
