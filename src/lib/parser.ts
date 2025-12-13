export interface PaymentAmount {
  currency: string
  amount: number
  raw: string
}

export interface BcaTransactionDetails {
  recipientName?: string
  status?: string
  transactionDate?: Date
  transactionType?: string
  paymentTo?: string
  merchantLocation?: string
  acquirer?: string
  merchantPan?: string
  terminalId?: string
  sourceOfFund?: string
  customerPan?: string
  totalPayment?: PaymentAmount
  rrn?: string
  referenceNo?: string
}

const cleanText = (input: string) => input.replace(/\r/g, "")

const matchField = (text: string, label: string) => {
  const regex = new RegExp(`${label}\\s*:\\s*(.+)`, "i")
  const match = regex.exec(text)
  return match?.[1].trim()
}

const parseAmount = (raw?: string): PaymentAmount | undefined => {
  if (!raw) return undefined
  const amountMatch = raw.match(/([A-Z]{3})\\s+([\\d,.]+)/)
  if (!amountMatch) {
    return {
      currency: "",
      amount: Number.NaN,
      raw,
    }
  }

  const [, currency, numeric] = amountMatch
  const amount = Number.parseFloat(numeric.replace(/,/g, ""))

  return {
    currency,
    amount,
    raw,
  }
}

/**
 * Parses an email-like notification from BCA QRIS payment receipt into a structured object.
 */
export const parseBcaTransactionEmail = (
  rawText: string,
): BcaTransactionDetails => {
  const text = cleanText(rawText)
  const recipientName =
    text.match(/Hello\\s+([^,]+),/i)?.[1].trim() ?? undefined
  const transactionDate = matchField(text, "Transaction Date")
  return {
    recipientName,
    status: matchField(text, "Status"),
    transactionDate: transactionDate ? new Date(transactionDate) : undefined,
    transactionType: matchField(text, "Transaction Type"),
    paymentTo: matchField(text, "Payment to"),
    merchantLocation: matchField(text, "Merchant Location"),
    acquirer: matchField(text, "Acquirer"),
    merchantPan: matchField(text, "Merchant PAN"),
    terminalId: matchField(text, "Terminal ID"),
    sourceOfFund: matchField(text, "Source of Fund"),
    customerPan: matchField(text, "Customer PAN"),
    totalPayment: parseAmount(matchField(text, "Total Payment")),
    rrn: matchField(text, "RRN"),
    referenceNo: matchField(text, "Reference No."),
  }
}
