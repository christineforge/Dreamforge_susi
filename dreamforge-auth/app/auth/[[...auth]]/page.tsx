import dynamic from 'next/dynamic'

const AuthClientPage = dynamic(() => import('./AuthClientPage'), {
  ssr: false,
})

export default function Page() {
  return <AuthClientPage />
}
