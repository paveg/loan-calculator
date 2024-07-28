export type RepaymentMethods = 'level-payment-mortgage' | 'linear-mortgage'

export class Calculator {
  loanAmount: number
  repaymentMethod: RepaymentMethods
  repaymentPeriod: number
  annualInterestRate: number

  constructor(
    loanAmount: string,
    repaymentMethod: RepaymentMethods,
    repaymentPeriod: string,
    annualInterestRate: string,
  ) {
    this.loanAmount = this.initInt(loanAmount) * 10000
    this.repaymentMethod = repaymentMethod
    this.repaymentPeriod = this.initInt(repaymentPeriod)
    this.annualInterestRate = this.initFloat(annualInterestRate)
  }

  // 元利均等返済
  levelPayment() {
    const r = this.annualInterestRate / 12 / 100
    const n = this.repaymentPeriod * 12
    const m = (this.loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)

    return Math.trunc(Number(m.toFixed(3)))
  }

  // TODO: Supports 元金均等返済
  linear() {
    return 0
  }

  run() {
    switch (this.repaymentMethod) {
      case 'level-payment-mortgage':
        return this.levelPayment()
      case 'linear-mortgage':
        return this.linear()
      default:
        return NaN
    }
  }

  private initFloat = (n: string) => {
    return parseFloat(n) || 0.0
  }

  private initInt = (n: string) => {
    return parseInt(n) || 0
  }
}

if (import.meta.vitest) {
  console.info('passed')
  const { it, describe, expect } = import.meta.vitest
  describe('levelPayment', () => {
    it('should return correct value', () => {
      const calculator = new Calculator('700', 'level-payment-mortgage', '1.5', '120')
      expect(calculator.run()).toBe(1)
    })
  })
}
