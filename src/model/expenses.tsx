export class Expenses {
  id: string;
  description: string;
  amount: number;
  date: Date;

  constructor(id: string, description: string, amout: number, date: Date) {
    this.id = id;
    this.description = description;
    this.amount = amout;
    this.date = date;
  }
}
