export class DgFilter {
  dgCodes: string[] = [''];
  dgDateType: string = 'CreationDate';
  paymentDateType: string = 'PrePaymentDate';
  dgDateStart?: Date;
  dgDateEnd?: Date;
  paymentDateStart?: Date;
  paymentDateEnd?: Date;
  minPrepayment?: number;
  maxPrepayment?: number;
  minPayment?: number;
  maxPayment?: number;
}
