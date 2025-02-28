import { useTranslation } from 'react-i18next'
import { Link, useRouteError } from 'react-router-dom'
import { Button } from 'src/components/ui/button'

export default function ErrorPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const error = useRouteError() as any
  const { t } = useTranslation('notfound')

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4 text-left">
      <h1>{t('oops')}</h1>
      <p>{t('title')}</p>
      <p className="font-mono">
        <span className="mr-2">{error?.status}</span>
        <i>{error?.statusText || error?.message}</i>
      </p>
      <Button asChild>
        <Link to="/">{t('backToHome')}</Link>
      </Button>
    </div>
  )
}
