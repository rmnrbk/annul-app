import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DgPayRule } from '../models/dg-pay-rule.model';
import { MOCK_DGPAYMENTANNULRULES } from '../models/mock-data';
import { DgFilter } from '../models/dg-filter';

@Injectable({
  providedIn: 'root',
})
export class DgRulesMockService {
  dgPaymentAnnulRules: DgPayRule[] = MOCK_DGPAYMENTANNULRULES;

  getFilteredDgPaymentAnnulRules(filters: DgFilter): DgPayRule[] {
    const {
      dgCodes,
      dgDateType,
      paymentDateType,
      dgDateStart,
      dgDateEnd,
      paymentDateStart,
      paymentDateEnd,
      minPrepayment,
      maxPrepayment,
      minPayment,
      maxPayment,
    } = filters;

    let filtered = [...this.dgPaymentAnnulRules];

    // Фильтрация по коду(ам) путёвки
    // Если указан код путёвки, то остальные фильтры игнорируются.
    if (dgCodes.length !== 0) {
      return filtered.filter((dg) => {
        return dgCodes.includes(dg.dgCode);
      });
    }

    // Фильтрация по диапазону дат (создание, заезд, выезд)
    if (dgDateStart && dgDateEnd) {
      filtered = filtered.filter((dg) => {
        const comparedDate =
          dgDateType === 'CreationDate'
            ? dg.dgCrDate
            : dgDateType === 'CheckInDate'
            ? dg.dgTurDateStart
            : dg.dgTurDateEnd;

        return (
          comparedDate &&
          new Date(comparedDate) >= new Date(dgDateStart) &&
          new Date(comparedDate) <= new Date(dgDateEnd)
        );
      });
    }

    // Фильтрация по диапазону дат (предоплаты, полной оплаты)
    if (paymentDateStart || paymentDateEnd) {
      filtered = filtered.filter((dg) => {
        const comparedDate =
          paymentDateType === 'PrePaymentDate' ? dg.prepayDate : dg.payDate;

        return (
          comparedDate &&
          new Date(comparedDate) >=
            (paymentDateStart
              ? new Date(paymentDateStart)
              : new Date(1700, 0)) &&
          new Date(comparedDate) <=
            (paymentDateEnd ? new Date(paymentDateEnd) : new Date(2100, 0))
        );
      });
    }

    // Фильтрация по диапазону размера предоплаты
    // minPrepayment всегда минимум 0, поэтому на null не проверяем
    filtered = filtered.filter(
      (dg) =>
        dg.prepayAmount >= (minPrepayment ?? 0) &&
        dg.prepayAmount <= (maxPrepayment ?? Infinity)
    );

    // Фильтрация по диапазону размера оплаты
    // minPayment всегда минимум 0, поэтому на null не проверяем
    filtered = filtered.filter(
      (dg) =>
        dg.payAmount >= (minPayment ?? 0) &&
        dg.payAmount <= (maxPayment ?? Infinity)
    );

    return filtered;
  }
}
