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
  // styleUrls: ['./app.component.css'],
  providers: [DgRulesService],
})
export class AppComponent implements OnInit {
  dgPaymentAnnulRules: DgPayRule[] = [];
  selectedDg?: DgPayRule;

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
      console.log(this.dgPaymentAnnulRules);
    });
  }

  onRowSelected(dg: DgPayRule) {
    this.selectedDg = { ...dg };
  }

  onSaveChanges(updatedDgPaymentAnnulRule: DgPayRule) {
    if (updatedDgPaymentAnnulRule.dgCode) {
      this.dgRulesService
        .updateDgRule(
          updatedDgPaymentAnnulRule.dgCode,
          updatedDgPaymentAnnulRule
        )
        .subscribe((updatedArray) => {
          // Присваиваем обновлённый массив данных, полученный из сервиса
          this.dgPaymentAnnulRules = updatedArray;
        });
    }
  }
}
