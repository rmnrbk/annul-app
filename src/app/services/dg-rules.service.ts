import { Injectable } from '@angular/core';
import { DgRulesMockService } from './dg-rules-mock.service';
import { ApiService } from './api.service';
import { DgPayRule, DgPayRuleRaw } from '../models/dg-pay-rule.model';
import { map, Observable, of, tap } from 'rxjs';
import { DgFilter } from '../models/dg-filter';
import { toLocalMidnight } from './util.service';

@Injectable({
  providedIn: 'root',
})
export class DgRulesService {
  private useMock: boolean = false;

  dgPaymentAnnulRules: DgPayRule[] = [];

  constructor(private api: ApiService, private mock: DgRulesMockService) {}

  getDgRules(filter: DgFilter): Observable<DgPayRule[]> {
    if (this.useMock) {
      this.dgPaymentAnnulRules =
        this.mock.getFilteredDgPaymentAnnulRules(filter);
      return of(this.dgPaymentAnnulRules);
    }

    return this.api.getDgRules(filter).pipe(
      // Преобразуем все даты-строки в объекты Date:
      map((data: DgPayRuleRaw[]) => {
        console.log(data);
        return data.map((dg) => {
          return {
            ...dg,
            dgCrDate: dg.dgCrDate ? toLocalMidnight(dg.dgCrDate) : null,
            dgTurDateStart: dg.dgTurDateStart
              ? toLocalMidnight(dg.dgTurDateStart)
              : null,
            dgTurDateEnd: dg.dgTurDateEnd
              ? toLocalMidnight(dg.dgTurDateEnd)
              : null,
            prepayDate: dg.prepayDate ? toLocalMidnight(dg.prepayDate) : null,
            payDate: dg.payDate ? toLocalMidnight(dg.payDate) : null,
            autoAnnulNoFineDate: dg.autoAnnulNoFineDate
              ? toLocalMidnight(dg.autoAnnulNoFineDate)
              : null,
            autoAnnulDate: dg.autoAnnulDate
              ? toLocalMidnight(dg.autoAnnulDate)
              : null,
            guaranteeLetterDate: dg.guaranteeLetterDate
              ? toLocalMidnight(dg.guaranteeLetterDate)
              : null,
          };
        });
      }),
      tap((parsedData) => {
        this.dgPaymentAnnulRules = parsedData;
        console.log(parsedData);
      })
    );
  }

  updateDgRule(dgCode: string, updatedDg: DgPayRule): Observable<DgPayRule[]> {
    const index = this.dgPaymentAnnulRules.findIndex(
      (b) => b.dgCode === dgCode
    );
    if (index !== -1) {
      // Создадим новый массив, чтобы явно было видно изменение
      this.dgPaymentAnnulRules = this.dgPaymentAnnulRules.map((item, i) =>
        i === index ? updatedDg : item
      );
    }
    return of(this.dgPaymentAnnulRules);
  }

  updateMultipleDgRules(updatedList: DgPayRule[]): Observable<DgPayRule[]> {
    this.dgPaymentAnnulRules = this.dgPaymentAnnulRules.map((oldItem) => {
      const updatedItem = updatedList.find((u) => u.dgCode === oldItem.dgCode);
      // Если нашли – подменяем. Иначе оставляем старый
      return updatedItem ? updatedItem : oldItem;
    });

    // Возвращаем «новый» массив
    return of(this.dgPaymentAnnulRules);
  }
}
