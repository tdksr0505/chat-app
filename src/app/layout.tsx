import './globals.css'
import { SocketProvider } from '../context/socketContext'
import { UserListProvider } from '../context/userListContext'
export const metadata = {
  title: 'Draw & Guess',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&family=Fredericka+the+Great&family=Noto+Sans+TC:wght@500&display=swap"
          rel="stylesheet"
        ></link>
      </head>
      <body>
        <SocketProvider>
          <UserListProvider>{children}</UserListProvider>
        </SocketProvider>
      </body>
    </html>
  )
}
