import { Injectable } from '@angular/core';
import { DgRulesMockService } from './dg-rules-mock.service';
import { ApiService } from './api.service';
import { DgPayRule } from '../models/dg-pay-rule.model';
import { Observable, of } from 'rxjs';
import { DgFilter } from '../models/dg-filter';

@Injectable({
  providedIn: 'root',
})
export class DgRulesService {
  private useMock: boolean = true;

  dgPaymentAnnulRules: DgPayRule[] = [];

  constructor(private api: ApiService, private mock: DgRulesMockService) {}

  getDgRules(filter: DgFilter): Observable<DgPayRule[]> {
    if (this.useMock) {
      this.dgPaymentAnnulRules =
        this.mock.getFilteredDgPaymentAnnulRules(filter);
      return of(this.dgPaymentAnnulRules);
    }

    this.api.getDgRules(filter).subscribe((data) => {
      this.dgPaymentAnnulRules = data;
    });

    return of(this.dgPaymentAnnulRules);
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
}
