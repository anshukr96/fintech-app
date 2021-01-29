export interface Card {
  number: string;
  name: string;
  expiry: Date;
  cvv?: string;
  amount: number;
}
