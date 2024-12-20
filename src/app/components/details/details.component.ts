import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { DgPayRule } from '../../models/dg-pay-rule.model';
import { DetailsValidators } from './validators/details-validators';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './details.component.html',
  // styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnChanges {
  @Input() dg?: DgPayRule;
  @Output() onSaveEdited = new EventEmitter<DgPayRule>();

  form?: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.dg) {
      // Инициализируем форму и выставляем начальные значения из полученного объекта
      this.form = this.fb.group(
        {
          prepayPerc: [this.dg.prepayPerc],
          prepayDate: [this.dg.prepayDate?.toISOString().split('T')[0]],
          payDate: [this.dg.payDate?.toISOString().split('T')[0]],
          autoAnnulNoFineDate: [
            this.dg.autoAnnulNoFineDate?.toISOString().split('T')[0],
          ],
          autoAnnulDate: [this.dg.autoAnnulDate?.toISOString().split('T')[0]],
          guaranteeLetterDate: [
            this.dg.guaranteeLetterDate?.toISOString().split('T')[0],
          ],
          autoAnnulBlockEnabled: [this.dg.autoAnnulBlockEnabled],
        },
        {
          validators: [
            DetailsValidators.prepayPercValidator('prepayPerc'),
            DetailsValidators.prepayAndPayDateRangeValidator(
              'prepayDate',
              'payDate'
            ),
          ],
        }
      );
    } else {
      this.form = undefined;
    }
  }

  save() {
    if (this.form?.valid) {
      // Обновляем объект с учётом изменений
      const updatedDg: DgPayRule = {
        ...this.dg,
        ...this.form.value,
        prepayAmount: this.dg?.prepayAmount
          ? (this.dg?.prepayAmount * this.form.value.prepayPerc) / 100
          : this.dg?.prepayAmount,
      };

      this.onSaveEdited.emit({
        ...updatedDg,
        prepayDate: updatedDg.prepayDate
          ? new Date(updatedDg.prepayDate)
          : null,
        payDate: updatedDg.payDate ? new Date(updatedDg.payDate) : null,
        autoAnnulNoFineDate: updatedDg.autoAnnulNoFineDate
          ? new Date(updatedDg.autoAnnulNoFineDate)
          : null,
        autoAnnulDate: updatedDg.autoAnnulDate
          ? new Date(updatedDg.autoAnnulDate)
          : null,
        guaranteeLetterDate: updatedDg.guaranteeLetterDate
          ? new Date(updatedDg.guaranteeLetterDate)
          : null,
      });
      // alert('Changes saved (local simulation)');
    }
  }

  cancel() {
    if (this.dg && this.form) {
      // Возвращаемся к исходным значениям
      this.form.patchValue({
        prepayPerc: this.dg.prepayPerc,
        prepayDate: this.dg.prepayDate,
        payDate: this.dg.payDate,
        autoAnnulNoFineDate: this.dg.autoAnnulNoFineDate,
        autoAnnulDate: this.dg.autoAnnulDate,
        guaranteeLetterDate: this.dg.guaranteeLetterDate,
        autoAnnulBlockEnabled: this.dg.autoAnnulBlockEnabled,
      });
    }
  }
}
