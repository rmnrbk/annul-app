import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DgPayRuleRaw } from '../models/dg-pay-rule.model';
import { Injectable } from '@angular/core';
import { DgFilter } from '../models/dg-filter';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl =
    'http://localhost:3891/api/PaymentMonitor/GetPaymentMonitorInfo?take=1000&skip=0';

  constructor(private http: HttpClient) {}

  getDgRules(filter: DgFilter): Observable<DgPayRuleRaw[]> {
    const response = this.http.post<DgPayRuleRaw[]>(`${this.apiUrl}`, filter);
    return response;
  }
}
