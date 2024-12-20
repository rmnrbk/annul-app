import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export class FilterValidators {
  // Общий валидатор для диапазона дат
  private static dateRangeValidator(
    dateStart: string,
    dateEnd: string,
    formGroup: FormGroup
  ) {
    const startDate = formGroup.get(dateStart)?.value;
    const endDate = formGroup.get(dateEnd)?.value;
    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      return false;
    }
    return true;
  }

  // Валидатор для диапазона дат заезда/выезда/создания путёвки
  static dgDateRangeValidator(dgDateStart: string, dgDateEnd: string) {
    return (formGroup: FormGroup) => {
      return this.dateRangeValidator(dgDateStart, dgDateEnd, formGroup)
        ? null
        : { dgDateRangeInvalid: true };
    };
  }

  // Валидатор для диапазона дат оплат/предоплат
  static payDateRangeValidator(dgDateStart: string, dgDateEnd: string) {
    return (formGroup: FormGroup) => {
      return this.dateRangeValidator(dgDateStart, dgDateEnd, formGroup)
        ? null
        : { payDateRangeInvalid: true };
    };
  }

  // Общий валидатор для диапазона цен
  private static costsRangeValidator(
    minCost: string,
    maxCost: string,
    formGroup: FormGroup
  ): boolean {
    const minC = formGroup.get(minCost)?.value;
    const maxC = formGroup.get(maxCost)?.value;

    if (
      (minC && (minC < 0 || minC > Number.MAX_VALUE - 1)) ||
      (maxC && (maxC < 0 || maxC > Number.MAX_VALUE - 1))
    ) {
      return false;
    }

    if (minC && maxC && minC > maxC) {
      return false;
    }

    return true;
  }

  // Валидатор для сумм оплат
  static paymentRangeValidator(minPayment: string, maxPayment: string) {
    return (formGroup: FormGroup) => {
      return this.costsRangeValidator(minPayment, maxPayment, formGroup)
        ? null
        : { paymentRangeInvalid: true };
    };
  }

  // Валидатор для сумм предоплат
  static prepaymentRangeValidator(
    minPrepayment: string,
    maxPrepayment: string
  ) {
    return (formGroup: FormGroup) => {
      return this.costsRangeValidator(minPrepayment, maxPrepayment, formGroup)
        ? null
        : { prepaymentRangeInvalid: true };
    };
  }

  // Валидатор для кодов путёвок
  static dgCodesValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value as string;
      if (!value) {
        return null;
      }
      const isValid = validateDgCodes(value);
      return isValid ? null : { dgCodesInvalid: true };
    };

    // Если количество цифр и англ символов кратно 10,
    // то коды путёвок валидны
    function validateDgCodes(dgCodes: string): boolean {
      return (
        [...dgCodes].filter((char) => /[a-zA-Z0-9]/.test(char)).length % 10 ===
        0
      );
    }
  }
}
