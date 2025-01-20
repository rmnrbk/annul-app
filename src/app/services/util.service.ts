export function processDgCodesString(dgCodesString: string): string[] {
  // Удаляем всё, кроме английских букв и цифр
  const cleanedString = dgCodesString.replace(/[^a-zA-Z0-9]/g, '');

  // Разбиваем строку на части по 10 символов
  const dgCodes: string[] = [];
  for (let i = 0; i < cleanedString.length; i += 10) {
    dgCodes.push(cleanedString.substring(i, i + 10));
  }

  return dgCodes;
}

// Конвертируем string в Date и устанавливаем время 00:00
export function toLocalMidnight(dateStr: string): Date {
  const d = new Date(dateStr);
  return d;
}

// Преобразование Date -> "YYYY-MM-DD" для <input type="date">
export function formatDate(d: Date | null): string {
  if (d == null) return '';

  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');

  return `${yyyy}-${mm}-${dd}`;
}

export function mergeDateAndDatetime(
  oldDate: Date | null,
  newDateStr: string
): Date | null {
  if (oldDate && newDateStr) {
    const [yyyyStr, mmStr, ddStr] = newDateStr.split('-');
    const oldHours = oldDate.getUTCHours();
    const oldMinutes = oldDate.getUTCMinutes();
    const oldSeconds = oldDate.getUTCSeconds();

    // 3. Создаём новую дату в UTC:
    const updatedPrepayDate = new Date(
      Date.UTC(+yyyyStr, +mmStr - 1, +ddStr, oldHours, oldMinutes, oldSeconds)
    );

    return updatedPrepayDate;
  }
  return null;
}

export function parseRuDate(dateStr: string | null): Date | null {
  if (!dateStr) return null;

  const [datePart, timePart] = dateStr.split(' ');
  if (!datePart) return null;

  const [dayStr, monthStr, yearStr] = datePart.split('.');
  if (!dayStr || !monthStr || !yearStr) return null;

  const day = parseInt(dayStr, 10);
  const month = parseInt(monthStr, 10) - 1;
  const year = parseInt(yearStr, 10);

  let hours = 0;
  let minutes = 0;
  let seconds = 0;

  if (timePart) {
    const [hStr, mStr, sStr] = timePart.split(':');
    hours = parseInt(hStr || '0', 10);
    minutes = parseInt(mStr || '0', 10);
    seconds = parseInt(sStr || '0', 10);
  }

  return new Date(year, month, day, hours, minutes, seconds);
}
