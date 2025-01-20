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
import { formatDate, mergeDateAndDatetime } from '../../services/util.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './details.component.html',
})
export class DetailsComponent implements OnChanges {
  @Input() dgs: DgPayRule[] = [];

  @Output() onSaveEdited = new EventEmitter<DgPayRule>();

  form?: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.dgs && this.dgs.length > 0) {
      // Пока берём первую путёвку из нескольких выбранных
      // TODO: реализовать массовое обновление
      const dg = this.dgs[0];

      // Создаём форму на базе первого dg
      this.form = this.fb.group(
        {
          prepayPerc: [dg.prepayPerc],
          prepayDate: [formatDate(dg.prepayDate)],
          payDate: [formatDate(dg.payDate)],
          autoAnnulNoFineDate: [formatDate(dg.autoAnnulNoFineDate)],
          autoAnnulDate: [formatDate(dg.autoAnnulDate)],
          guaranteeLetterDate: [formatDate(dg.guaranteeLetterDate)],
          autoAnnulBlockEnabled: [dg.autoAnnulBlockEnabled],
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
    if (this.form?.valid && this.dgs && this.dgs.length > 0) {
      const values = this.form.value;
      const dg = this.dgs[0];

      const updatedDg: DgPayRule = {
        ...this.dgs[0],
        ...values,
        prepayDate: mergeDateAndDatetime(dg.prepayDate, values.prepayDate),
        payDate: mergeDateAndDatetime(dg.payDate, values.payDate),
        autoAnnulNoFineDate: mergeDateAndDatetime(
          dg.autoAnnulNoFineDate,
          values.autoAnnulNoFineDate
        ),
        autoAnnulDate: mergeDateAndDatetime(
          dg.autoAnnulDate,
          values.autoAnnulDate
        ),
        guaranteeLetterDate: mergeDateAndDatetime(
          dg.guaranteeLetterDate,
          values.guaranteeLetterDate
        ),
      };

      updatedDg.prepayAmount = this.dgs[0].prepayAmount
        ? (this.dgs[0].prepayAmount * updatedDg.prepayPerc) / 100
        : this.dgs[0].prepayAmount;

      this.onSaveEdited.emit(updatedDg);
    }
  }

  cancel() {
    // Возвращаем форму к значениям первого элемента
    if (this.dgs && this.dgs[0] && this.form) {
      const dg = this.dgs[0];
      this.form.patchValue({
        prepayPerc: dg.prepayPerc,
        prepayDate: dg.prepayDate,
        payDate: dg.payDate,
        autoAnnulNoFineDate: dg.autoAnnulNoFineDate,
        autoAnnulDate: dg.autoAnnulDate,
        guaranteeLetterDate: dg.guaranteeLetterDate,
        autoAnnulBlockEnabled: dg.autoAnnulBlockEnabled,
      });
    }
  }
}
