import { DgPayRule } from './dg-pay-rule.model';

export const MOCK_DGPAYMENTANNULRULES: DgPayRule[] = [
  {
    dgKey: 1,
    dgCode: '123qwertyu',
    dgCrDate: new Date('2024-12-24'),
    dgTurDateStart: new Date('2024-12-05'),
    dgTurDateEnd: new Date('2024-12-10'),
    prepayPerc: 10,
    prepayAmount: 1000,
    payAmount: 10000,
    prepayDate: new Date('2024-12-20'),
    payDate: new Date('2024-12-30'),
    autoAnnulNoFineDate: new Date('2024-11-10'),
    autoAnnulDate: new Date('2024-11-12'),
    guaranteeLetterDate: new Date('2024-11-05'),
    autoAnnulBlockEnabled: false,
    partnerEmails: [],
    currency: 'руб',
  },
  {
    dgKey: 2,
    dgCode: '124qwertyu',
    dgCrDate: new Date('2024-12-24'),
    dgTurDateStart: new Date('2024-12-05'),
    dgTurDateEnd: new Date('2024-12-10'),
    prepayPerc: 50,
    prepayAmount: 5000,
    payAmount: 10000,
    prepayDate: new Date('2024-12-20'),
    payDate: new Date('2024-12-30'),
    autoAnnulNoFineDate: null,
    autoAnnulDate: new Date('2024-10-25'),
    guaranteeLetterDate: new Date('2024-10-10'),
    autoAnnulBlockEnabled: true,
    partnerEmails: [],
    currency: 'руб',
  },
  {
    dgKey: 3,
    dgCode: '125qwertyu',
    dgCrDate: new Date('2024-12-24'),
    dgTurDateStart: new Date('2024-12-05'),
    dgTurDateEnd: new Date('2024-12-10'),
    prepayPerc: 30,
    prepayAmount: 3000,
    payAmount: 10000,
    prepayDate: new Date('2024-12-25'),
    payDate: null,
    autoAnnulNoFineDate: null,
    autoAnnulDate: null,
    guaranteeLetterDate: null,
    autoAnnulBlockEnabled: false,
    partnerEmails: [],
    currency: 'руб',
  },
  {
    dgKey: 4,
    dgCode: '126qwertyu',
    dgCrDate: new Date('2024-12-24'),
    dgTurDateStart: new Date('2024-12-05'),
    dgTurDateEnd: new Date('2024-12-10'),
    prepayPerc: 10,
    prepayAmount: 1000,
    payAmount: 10000,
    prepayDate: new Date('2024-12-20'),
    payDate: new Date('2024-12-30'),
    autoAnnulNoFineDate: new Date('2024-11-10'),
    autoAnnulDate: new Date('2024-11-12'),
    guaranteeLetterDate: new Date('2024-11-05'),
    autoAnnulBlockEnabled: false,
    partnerEmails: [],
    currency: 'руб',
  },
  {
    dgKey: 5,
    dgCode: '127qwertyu',
    dgCrDate: new Date('2024-12-24'),
    dgTurDateStart: new Date('2024-12-05'),
    dgTurDateEnd: new Date('2024-12-10'),
    prepayPerc: 50,
    prepayAmount: 5000,
    payAmount: 10000,
    prepayDate: new Date('2024-12-20'),
    payDate: new Date('2024-12-30'),
    autoAnnulNoFineDate: null,
    autoAnnulDate: new Date('2024-10-25'),
    guaranteeLetterDate: new Date('2024-10-10'),
    autoAnnulBlockEnabled: true,
    partnerEmails: [],
    currency: 'руб',
  },
  {
    dgKey: 6,
    dgCode: '128qwertyu',
    dgCrDate: new Date('2024-12-24'),
    dgTurDateStart: new Date('2024-12-05'),
    dgTurDateEnd: new Date('2024-12-10'),
    prepayPerc: 30,
    prepayAmount: 3000,
    payAmount: 10000,
    prepayDate: new Date('2024-12-25'),
    payDate: null,
    autoAnnulNoFineDate: null,
    autoAnnulDate: null,
    guaranteeLetterDate: null,
    autoAnnulBlockEnabled: false,
    partnerEmails: [],
    currency: 'руб',
  },
  {
    dgKey: 7,
    dgCode: '129qwertyu',
    dgCrDate: new Date('2024-12-24'),
    dgTurDateStart: new Date('2024-12-05'),
    dgTurDateEnd: new Date('2024-12-10'),
    prepayPerc: 10,
    prepayAmount: 1000,
    payAmount: 10000,
    prepayDate: new Date('2024-12-20'),
    payDate: new Date('2024-12-30'),
    autoAnnulNoFineDate: new Date('2024-11-10'),
    autoAnnulDate: new Date('2024-11-12'),
    guaranteeLetterDate: new Date('2024-11-05'),
    autoAnnulBlockEnabled: false,
    partnerEmails: [],
    currency: 'руб',
  },
  {
    dgKey: 8,
    dgCode: '130qwertyu',
    dgCrDate: new Date('2024-12-24'),
    dgTurDateStart: new Date('2024-12-05'),
    dgTurDateEnd: new Date('2024-12-10'),
    prepayPerc: 50,
    prepayAmount: 5000,
    payAmount: 10000,
    prepayDate: new Date('2024-12-20'),
    payDate: new Date('2024-12-30'),
    autoAnnulNoFineDate: null,
    autoAnnulDate: new Date('2024-10-25'),
    guaranteeLetterDate: new Date('2024-10-10'),
    autoAnnulBlockEnabled: true,
    partnerEmails: [],
    currency: 'руб',
  },
  {
    dgKey: 9,
    dgCode: '131qwertyu',
    dgCrDate: new Date('2024-12-24'),
    dgTurDateStart: new Date('2024-12-05'),
    dgTurDateEnd: new Date('2024-12-10'),
    prepayPerc: 30,
    prepayAmount: 3000,
    payAmount: 10000,
    prepayDate: new Date('2024-12-25'),
    payDate: null,
    autoAnnulNoFineDate: null,
    autoAnnulDate: null,
    guaranteeLetterDate: null,
    autoAnnulBlockEnabled: false,
    partnerEmails: [],
    currency: 'руб',
  },
];
