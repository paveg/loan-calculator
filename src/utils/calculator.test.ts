import { Calculator, RepaymentMethods } from './calculator'

type TestData = {
  name: string
  loanAmount: string
  bonusAmount: string
  repaymentMethod: RepaymentMethods
  repaymentPeriod: string
  annualInterestRate: string
  gotMonthlyPayment: number
  gotAmount: number
}[]
const tests: TestData = [
  {
    name: 'levelPaymentMortgage - 7000000, 0, 1.5%, 10 years',
    loanAmount: '700',
    bonusAmount: '0',
    repaymentMethod: 'level-payment-mortgage',
    repaymentPeriod: '10',
    annualInterestRate: '1.5',
    gotMonthlyPayment: 62854,
    gotAmount: 7542480,
  },
  {
    name: 'levelPaymentMortgage - 5000000, 0, 1.94%, 9 years',
    loanAmount: '500',
    bonusAmount: '0',
    repaymentMethod: 'level-payment-mortgage',
    repaymentPeriod: '9',
    annualInterestRate: '1.94',
    gotMonthlyPayment: 50492,
    gotAmount: 5453136,
  },
  {
    name: 'levelPaymentMortgage - 3000000, 0, 0.8%, 20 years',
    loanAmount: '300',
    bonusAmount: '0',
    repaymentMethod: 'level-payment-mortgage',
    repaymentPeriod: '20',
    annualInterestRate: '0.8',
    gotMonthlyPayment: 13530,
    gotAmount: 3247200,
  },
  {
    name: 'levelPaymentMortgage - 1000000, 0, 2.5%, 10 years',
    loanAmount: '100',
    bonusAmount: '0',
    repaymentMethod: 'level-payment-mortgage',
    repaymentPeriod: '5',
    annualInterestRate: '2.5',
    gotMonthlyPayment: 17747,
    gotAmount: 1064820,
  },
  // TODO: Implement with bonus pattern
  {
    // CHECK: This is simulated by https://www.kitagin.co.jp/simulation/gankin.html
    // TODO: Update this test after implementing linear mortgage
    name: 'linearMortgage - 7000000, 1.5%, 10 years',
    loanAmount: '700',
    bonusAmount: '0',
    repaymentMethod: 'linear-mortgage',
    repaymentPeriod: '10',
    annualInterestRate: '1.5',
    gotMonthlyPayment: 0,
    gotAmount: 0, // 7529380
  },
]
describe('calculator', () => {
  let calc: Calculator
  tests.forEach((t) => {
    it(t.name, () => {
      calc = new Calculator(t.loanAmount, t.bonusAmount, t.repaymentMethod, t.repaymentPeriod, t.annualInterestRate)
      const monthlyPayment = calc.run()
      const amt = monthlyPayment * (calc.repaymentPeriod * 12)
      expect(monthlyPayment).toBe(t.gotMonthlyPayment)
      if (calc.bonusAmount === 0) {
        expect(amt).toBe(t.gotAmount)
      } else {
        // TODO: Implement with bonus pattern
      }
    })
  })
})
