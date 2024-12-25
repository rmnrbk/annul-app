export function processDgCodesString(dgCodesString: string): string[] {
  // Удаляем всё, кроме английских букв и цифр
  const cleanedString = dgCodesString.replace(/[^a-zA-Z0-9]/g, '');
  // .toUpperCase();

  // Разбиваем строку на части по 10 символов
  const dgCodes: string[] = [];
  for (let i = 0; i < cleanedString.length; i += 10) {
    dgCodes.push(cleanedString.substring(i, i + 10));
  }

  return dgCodes;
}

export function parseRuDate(dateStr: string | null): Date | null {
  if (!dateStr) return null;

  // Предположим, пришло "26.12.2024 23:59:00"
  // Разделяем дату и время
  const [datePart, timePart] = dateStr.split(' '); // ["26.12.2024", "23:59:00"]
  if (!datePart) return null;

  const [dayStr, monthStr, yearStr] = datePart.split('.'); // ["26","12","2024"]
  if (!dayStr || !monthStr || !yearStr) return null;

  const day = parseInt(dayStr, 10);
  // Месяц в JS — от 0 до 11, поэтому вычитаем 1
  const month = parseInt(monthStr, 10) - 1;
  const year = parseInt(yearStr, 10);

  let hours = 0;
  let minutes = 0;
  let seconds = 0;

  if (timePart) {
    // timePart = "23:59:00"
    const [hStr, mStr, sStr] = timePart.split(':');
    hours = parseInt(hStr || '0', 10);
    minutes = parseInt(mStr || '0', 10);
    seconds = parseInt(sStr || '0', 10);
  }

  return new Date(year, month, day, hours, minutes, seconds);
}
