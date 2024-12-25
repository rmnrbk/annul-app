import { Injectable } from '@angular/core';
import { DgRulesMockService } from './dg-rules-mock.service';
import { ApiService } from './api.service';
import { DgPayRule } from '../models/dg-pay-rule.model';
import { Observable, of, tap } from 'rxjs';
import { DgFilter } from '../models/dg-filter';

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
      tap((data) => {
        this.dgPaymentAnnulRules = data;
        console.log(data);
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
    // Предположим, что this.dgPaymentAnnulRules – «рабочий» массив данных
    // Делать замену элементов будем через .map:
    this.dgPaymentAnnulRules = this.dgPaymentAnnulRules.map((oldItem) => {
      // Пытаемся найти в updatedList элемент с таким же dgCode
      const updatedItem = updatedList.find((u) => u.dgCode === oldItem.dgCode);
      // Если нашли – подменяем. Иначе оставляем старый
      return updatedItem ? updatedItem : oldItem;
    });

    // Возвращаем «новый» массив
    return of(this.dgPaymentAnnulRules);
  }
}
