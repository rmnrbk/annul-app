import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltersComponent } from './components/filters/filters.component';
import { TableComponent } from './components/table/table.component';
import { DetailsComponent } from './components/details/details.component';
import { DgPayRule } from './models/dg-pay-rule.model';
import { DgRulesService } from './services/dg-rules.service';
import { TokenService } from './services/auth/token.service';
import { DgFilter } from './models/dg-filter';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FiltersComponent, TableComponent, DetailsComponent],
  templateUrl: './app.component.html',
  providers: [DgRulesService],
})
export class AppComponent implements OnInit {
  dgPaymentAnnulRules: DgPayRule[] = [];
  selectedDgs: DgPayRule[] = [];

  constructor(
    private dgRulesService: DgRulesService,
    private tokenService: TokenService
  ) {}

  ngOnInit() {
    this.tokenService.handleToken();
  }

  onFiltersChanged(filters: DgFilter) {
    this.dgRulesService.getDgRules(filters).subscribe((data) => {
      this.dgPaymentAnnulRules = data;
    });
  }

  onRowSelected(selected: DgPayRule[]) {
    this.selectedDgs = [...selected];
  }

  onSaveChanges(updatedDg: DgPayRule) {
    if (!this.selectedDgs.length) return;

    const updatedItems = this.selectedDgs.map((dgItem) => ({
      ...dgItem,
      prepayPerc: updatedDg.prepayPerc,
      prepayDate: updatedDg.prepayDate,
      payDate: updatedDg.payDate,
      autoAnnulNoFineDate: updatedDg.autoAnnulNoFineDate,
      autoAnnulDate: updatedDg.autoAnnulDate,
      guaranteeLetterDate: updatedDg.guaranteeLetterDate,
      autoAnnulBlockEnabled: updatedDg.autoAnnulBlockEnabled,
      prepayAmount: dgItem.prepayAmount
        ? (dgItem.prepayAmount * updatedDg.prepayPerc) / 100
        : dgItem.prepayAmount,
    }));

    this.dgRulesService
      .updateMultipleDgRules(updatedItems)
      .subscribe((newData) => {
        this.dgPaymentAnnulRules = newData;
      });
  }
}
