import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Select, SelectContent, SelectTrigger, SelectValue } from '../ui/select'
import { SelectItem } from '@radix-ui/react-select'
import { useTranslation } from 'react-i18next'

export const LoanCalculator = () => {
  const { t } = useTranslation('translation')
  const [loanAmount, setLoanAmount] = useState<string>('')
  const [repaymentPeriod, setRepaymentTerm] = useState<string>('')
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

  const result = calculate(loanAmount, repaymentPeriod, annualInterestRate)
  const loanAmountInt = (parseInt(loanAmount) || 0) * 10000
  const totalAmount = result * (parseInt(repaymentPeriod) * 12)

  return (
    <Card id="loan">
      <CardHeader>
        <CardTitle>{t('calculatorTitle')}</CardTitle>
        <CardDescription>{t('calculatorDescription')}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mb-8">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="loan-amount">{t('loanAmount')}</Label>
            <Input
              id="loan-amount"
              value={loanAmount}
              onChange={(event) => {
                setLoanAmount(event.target.value)
              }}
              type="number"
              placeholder={t('loanAmount.placeholder')}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="annual-interest-rate">{t('annualInterestRate')}</Label>
            <Input
              id="annual-interest-rate"
              value={annualInterestRate}
              onChange={(event) => {
                setAnnualInterestRate(event.target.value)
              }}
              type="number"
              placeholder={t('annualInterestRate.placeholder')}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="repayment-term">{t('repaymentPeriod')}</Label>
            <Select
              onValueChange={(value) => {
                setRepaymentTerm(value)
              }}
              value={repaymentPeriod}
            >
              <SelectTrigger>
                <SelectValue placeholder={t('repaymentPeriod.placeholder')}>{repaymentPeriod}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {[...Array(50).keys()].map((i) => {
                  const t = i + 1
                  return (
                    <SelectItem key={i} value={t.toString()}>
                      {t}
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
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
