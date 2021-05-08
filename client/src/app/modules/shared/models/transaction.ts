export interface Transaction {
  userEmail: string,
  bankAccountName: string,
  bankAccountType: string,
  transDate: Date,
  transAmount: number,
  transPayee: string,
  transType: string,
  transNote?: string,
  transCategory?: string,
}
