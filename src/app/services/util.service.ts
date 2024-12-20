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
