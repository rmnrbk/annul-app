import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const apiBaseUrl = 'http://localhost:3891';

  // Добавляем токен только для запросов к вашему API
  if (req.url.startsWith(apiBaseUrl)) {
    const token = getTokenFromCookies();

    if (token) {
      const clonedRequest = req.clone({
        setHeaders: {
          Cookie: `token=${token}`,
        },
        withCredentials: true,
      });

      return next(clonedRequest);
    }
  }

  // Пропускаем запрос без изменений, если он не относится к вашему API
  return next(req);
};

function getTokenFromCookies(): string | null {
  const cookies = document.cookie.split('; ');
  const tokenCookie = cookies.find((cookie) => cookie.startsWith('token='));
  return tokenCookie ? tokenCookie.split('=')[1] : null;
}
