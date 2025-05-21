import Sidebar from './Sidebar'

type Props = {
  children: React.ReactNode
}

export default function PageLayout({ children }: Props) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  )
}
