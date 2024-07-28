import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { useTranslation } from 'react-i18next'
import { Slider } from '../ui/slider'

export const LoanCalculator = () => {
  const { t } = useTranslation('translation')
  const [loanAmount, setLoanAmount] = useState<string>('')
  const [repaymentMethod, setRepaymentMethod] = useState<string>('level-payment-mortgage')
  const [repaymentPeriod, setRepaymentPeriod] = useState<string>('1')
  const [annualInterestRate, setAnnualInterestRate] = useState<string>('')

  const calculate = (loanAmount: string, repaymentPeriod: string, annualInterestRate: string) => {
    const la = parseInt(loanAmount) || 0
    const rp = parseInt(repaymentPeriod) || 0
    const air = parseFloat(annualInterestRate) || 0.0

    // Calculate monthly payment
    const r = air / 12 / 100
    const n = rp * 12
    const m = (la * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)

    return Number(m.toFixed(3)) * 10000
  }

  const result = Math.round(calculate(loanAmount, repaymentPeriod, annualInterestRate))
  const loanAmountInt = Math.round((parseInt(loanAmount) || 0) * 10000)
  const totalAmount = Math.round(result * (parseInt(repaymentPeriod) * 12))

  return (
    <Card id="loan">
      <CardHeader>
        <CardTitle>{t('calculatorTitle')}</CardTitle>
        <CardDescription>{t('calculatorDescription')}</CardDescription>
      </CardHeader>
      <CardContent>
        <h4 className="text-xl mb-4">{t('loanCondition')}</h4>
        <div className="space-y-4 mb-8">
          <RadioGroup
            defaultValue={repaymentMethod}
            id="repayment-method"
            onValueChange={(value: string) => {
              setRepaymentMethod(value)
            }}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="level-payment-mortgage" id="level-payment-mortgage" />
              <Label htmlFor="level-payment-mortgage">{t('levelPaymentMortgage')}</Label>
            </div>
            {/* TODO: Support linear mortgage - 元本均等返済
              <div className="flex items-center space-x-2">
                <RadioGroupItem disabled value="linear-mortgage" id="linear-mortgage" />
                <Label htmlFor="linear-mortgage">{t('linearMortgage')}</Label>
              </div>
            */}
          </RadioGroup>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="loan-amount">{t('loanAmount')}</Label>
            <Input
              id="loan-amount"
              value={loanAmount}
              onChange={(event) => {
                setLoanAmount(event.target.value)
              }}
              min={1}
              max={100000}
              type="number"
              placeholder={t('loanAmount.placeholder')}
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="annual-interest-rate">{t('annualInterestRate')}</Label>
            <Input
              id="annual-interest-rate"
              value={annualInterestRate}
              onChange={(event) => {
                setAnnualInterestRate(event.target.value)
              }}
              min={0.1}
              max={30}
              type="number"
              placeholder={t('annualInterestRate.placeholder')}
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="repayment-period">{t('repaymentPeriod')}</Label>
            <div id="repayment-period" className="flex space-x-4">
              <Input
                value={repaymentPeriod}
                onChange={(event) => {
                  setRepaymentPeriod(event.target.value)
                }}
                min={1}
                max={50}
                type="number"
                placeholder={t('repaymentPeriod.placeholder')}
              />
              <Slider
                defaultValue={[parseInt(repaymentPeriod)]}
                max={50}
                min={1}
                value={[parseInt(repaymentPeriod)]}
                onValueChange={(e) => {
                  setRepaymentPeriod(e[0].toString())
                }}
              />
            </div>
          </div>
        </div>
        {!isFinite(result) ? (
          t('conditionIsInvalid')
        ) : (
          <div>
            {t('monthlyRepaymentAmount', { amount: result })}
            <br />
            {t('totalRepaymentAmount', { amount: totalAmount })}
            <br />
            {t('interestExpense', { amount: totalAmount - loanAmountInt })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
