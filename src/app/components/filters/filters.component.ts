import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DgFilter } from '../../models/dg-filter';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { processDgCodesString } from '../../services/util.service';
import { FilterValidators } from './validators/filter-validators';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './filters.component.html',
  // styleUrls: ['./filters.component.css'],
})
export class FiltersComponent {
  filterForm: FormGroup;

  @Output() filtersChanged = new EventEmitter<DgFilter>();

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group(
      {
        dgCodes: ['', [FilterValidators.dgCodesValidator()]],
        dgDateType: ['CreationDate'],
        dgDateStart: [
          new Date().toISOString().split('T')[0],
          [Validators.required],
        ],
        dgDateEnd: [
          new Date().toISOString().split('T')[0],
          [Validators.required],
        ],
        paymentDateType: ['PrePaymentDate'],
        paymentDateStart: [''],
        paymentDateEnd: [''],
        minPrepayment: [0],
        maxPrepayment: [null],
        minPayment: [0],
        maxPayment: [null],
      },
      {
        validators: [
          FilterValidators.dgDateRangeValidator('dgDateStart', 'dgDateEnd'),
          FilterValidators.payDateRangeValidator(
            'paymentDateStart',
            'paymentDateEnd'
          ),
          FilterValidators.prepaymentRangeValidator(
            'minPrepayment',
            'maxPrepayment'
          ),
          FilterValidators.paymentRangeValidator('minPayment', 'maxPayment'),
        ],
      }
    );
  }

  prepareFiltersForApi(): DgFilter {
    const rawFormValues = this.filterForm.value;
    const dgCodesArray = processDgCodesString(rawFormValues.dgCodes);

    return {
      ...rawFormValues,
      dgCodes: dgCodesArray, // Отдаём массив кодов вместо строки кодов
    };
  }

  onSubmit() {
    const filters = this.prepareFiltersForApi();
    console.log('Filters to send:', filters);
    if (this.filterForm.valid) {
      this.filtersChanged.emit(filters);
    } else {
      console.error('Форма заполнена неверно.', this.filterForm.errors);
      this.filterForm.markAllAsTouched();
    }
  }
}
