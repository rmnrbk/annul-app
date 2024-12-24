import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DgPayRule } from '../../models/dg-pay-rule.model';

type SortState = 'none' | 'asc' | 'desc';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnChanges {
  @Input() dgPaymentAnnulRules: DgPayRule[] = [];
  @Output() rowSelected = new EventEmitter<DgPayRule[]>();

  // Массив выбранных кодов (строк)
  selectedDgCodes: string[] = [];
  ctrlDown = false;

  today: Date = new Date();
  tomorrow: Date;

  sortState: SortState = 'none';

  constructor() {
    this.tomorrow = new Date(this.today);
    this.tomorrow.setDate(this.tomorrow.getDate() + 1);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dgPaymentAnnulRules'] && this.dgPaymentAnnulRules) {
      if (this.sortState !== 'none') {
        this.applySort();
      }
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Control') {
      this.ctrlDown = true;
    }
  }

  @HostListener('document:keyup', ['$event'])
  handleKeyUp(event: KeyboardEvent) {
    if (event.key === 'Control') {
      this.ctrlDown = false;
    }
  }

  selectRow(dgPaymentAnnulRule: DgPayRule) {
    const dgCode = dgPaymentAnnulRule.dgCode;

    if (this.ctrlDown) {
      // Если Ctrl зажат, включаем мультивыбор
      if (this.selectedDgCodes.includes(dgCode)) {
        // Если строка уже есть в выборе, уберём её (поведение как toggle)
        this.selectedDgCodes = this.selectedDgCodes.filter(
          (code) => code !== dgCode
        );
      } else {
        // Добавляем новую строку к выбору
        this.selectedDgCodes = [...this.selectedDgCodes, dgCode];
      }
    } else {
      // Обычный режим — заменяем весь выбор одной строкой
      this.selectedDgCodes = [dgCode];
    }

    // Эмитим массив выбранных строк целиком
    const selectedDgs = this.dgPaymentAnnulRules.filter((dg) =>
      this.selectedDgCodes.includes(dg.dgCode)
    );
    this.rowSelected.emit(selectedDgs);
  }

  private getStartOfDay(d: Date): Date {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }

  isOverdue(date1: Date | null): boolean {
    if (!date1) return false;
    const date = this.getStartOfDay(new Date(date1));
    const todayDate = this.getStartOfDay(this.today);
    return date < todayDate;
  }

  isLastDay(date1: Date | null): boolean {
    if (!date1) return false;
    const date = this.getStartOfDay(new Date(date1));
    const todayDate = this.getStartOfDay(this.today);
    const tomorrowDate = this.getStartOfDay(this.tomorrow);
    return (
      date.getTime() === todayDate.getTime() ||
      date.getTime() === tomorrowDate.getTime()
    );
  }

  toggleSort(): void {
    if (this.sortState === 'none') {
      this.sortState = 'asc';
    } else if (this.sortState === 'asc') {
      this.sortState = 'desc';
    } else {
      this.sortState = 'none';
    }
    this.applySort();
  }

  applySort(): void {
    if (this.sortState === 'none') {
      return;
    }

    this.dgPaymentAnnulRules = [...this.dgPaymentAnnulRules].sort((a, b) => {
      const dateA = a.prepayDate ? new Date(a.prepayDate).getTime() : 0;
      const dateB = b.prepayDate ? new Date(b.prepayDate).getTime() : 0;
      return this.sortState === 'asc' ? dateA - dateB : dateB - dateA;
    });
  }

  isSelected(dgCode: string): boolean {
    return this.selectedDgCodes.includes(dgCode);
  }
}
