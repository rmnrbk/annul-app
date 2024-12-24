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
  // Раньше было dg?: DgPayRule
  @Input() dgs: DgPayRule[] = [];

  // Вызывается при клике "Сохранить"
  @Output() onSaveEdited = new EventEmitter<DgPayRule>();

  form?: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.dgs && this.dgs.length > 0) {
      // Если выбрано N строк – берём первую в качестве «эталона»
      // (или при желании вычисляем «общие» поля).
      const dg = this.dgs[0];

      // Создаём форму на базе первого dg
      this.form = this.fb.group(
        {
          prepayPerc: [dg.prepayPerc],
          prepayDate: [dg.prepayDate?.toISOString().split('T')[0]],
          payDate: [dg.payDate?.toISOString().split('T')[0]],
          autoAnnulNoFineDate: [
            dg.autoAnnulNoFineDate?.toISOString().split('T')[0],
          ],
          autoAnnulDate: [dg.autoAnnulDate?.toISOString().split('T')[0]],
          guaranteeLetterDate: [
            dg.guaranteeLetterDate?.toISOString().split('T')[0],
          ],
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
      // Берём значения формы
      const values = this.form.value;

      // Создаём «шаблон» изменений
      // (по сути, это «одна строка», которая дальше размножится в app.component)
      const updatedDg: DgPayRule = {
        ...this.dgs[0], // Можно взять первую как основу
        ...values,
        // Преобразуем дату
        prepayDate: values.prepayDate ? new Date(values.prepayDate) : null,
        payDate: values.payDate ? new Date(values.payDate) : null,
        autoAnnulNoFineDate: values.autoAnnulNoFineDate
          ? new Date(values.autoAnnulNoFineDate)
          : null,
        autoAnnulDate: values.autoAnnulDate
          ? new Date(values.autoAnnulDate)
          : null,
        guaranteeLetterDate: values.guaranteeLetterDate
          ? new Date(values.guaranteeLetterDate)
          : null,
      };

      // У поля prepayAmount в исходном коде была логика пересчёта
      // через prepayPerc, но здесь мы можем этот пересчёт не делать,
      // а доверить это уже AppComponent (или наоборот).
      // Для простоты оставим как есть или уберём:
      updatedDg.prepayAmount = this.dgs[0].prepayAmount
        ? (this.dgs[0].prepayAmount * updatedDg.prepayPerc) / 100
        : this.dgs[0].prepayAmount;

      // Отправляем наверх «шаблон» — AppComponent сам знает, сколько строк обновить
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
