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

  currency: string;
}

export interface DgPayRuleRaw {
  dgKey: number;
  dgCode: string;

  prepayPerc: number;
  prepayAmount: number;

  prepayDate: string | null;
  payDate: string | null;
  autoAnnulDate: string | null;
  autoAnnulNoFineDate: string | null;

  guaranteeLetterDate: string | null;
  autoAnnulBlockEnabled: boolean;

  dgCrDate: string | null;
  dgTurDateStart: string | null;
  dgTurDateEnd: string | null;
  payAmount: number;

  partnerEmails: string[];

  currency: string;
}
