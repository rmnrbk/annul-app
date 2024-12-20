import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
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
  @Output() rowSelected = new EventEmitter<DgPayRule>();

  selectedDgCode?: string;

  today: Date = new Date();
  tomorrow: Date;

  sortState: SortState = 'none';

  constructor() {
    this.tomorrow = new Date(this.today);
    this.tomorrow.setDate(this.tomorrow.getDate() + 1);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Когда входные данные меняются, если сортировка включена, ресортируем
    if (changes['dgPaymentAnnulRules'] && this.dgPaymentAnnulRules) {
      if (this.sortState !== 'none') {
        this.applySort();
      }
    }
  }

  selectRow(dgPaymentAnnulRule: DgPayRule) {
    this.selectedDgCode = dgPaymentAnnulRule.dgCode;
    this.rowSelected.emit(dgPaymentAnnulRule);
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
    // Цикл: none -> asc -> desc -> none
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
      // Без сортировки просто оставляем массив как есть
      return;
    }

    // При сортировке создаём новый отсортированный массив
    this.dgPaymentAnnulRules = [...this.dgPaymentAnnulRules].sort((a, b) => {
      const dateA = a.prepayDate ? new Date(a.prepayDate).getTime() : 0;
      const dateB = b.prepayDate ? new Date(b.prepayDate).getTime() : 0;
      return this.sortState === 'asc' ? dateA - dateB : dateB - dateA;
    });
  }
}
