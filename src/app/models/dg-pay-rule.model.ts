export interface DgPayRule {
  dgKey: number;
  dgCode: string;

  prepayPerc: number;
  prepayAmount: number;

  prepayDate: Date | null;
  payDate: Date | null;
  autoAnnulDate: Date | null;
  autoAnnulNoFineDate: Date | null;

  guaranteeLetterDate: Date | null;
  autoAnnulBlockEnabled: boolean;

  dgCrDate: Date | null;
  dgTurDateStart: Date | null;
  dgTurDateEnd: Date | null;
  payAmount: number;

  partnerEmails: string[];
  statuses: number;
}
