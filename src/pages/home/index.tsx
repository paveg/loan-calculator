import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { LoanCalculator } from 'src/components/loan-calculator'

export default function Home() {
  const { t } = useTranslation('translation')
  return (
    <>
      <Helmet>
        <title>{t('title')}</title>
      </Helmet>
      <div className="container m-8">
        <LoanCalculator />
      </div>
    </>
  )
}
