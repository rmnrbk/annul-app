import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from './cookie.service';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  // Кол-во дней, которое токен будет валиден
  saveInDays: number = 365;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private cookieService: CookieService
  ) {}

  handleToken(): void {
    this.route.queryParams.subscribe((params) => {
      const token = params['token'];
      if (token) {
        // Сохраняем токен в cookies
        this.cookieService.setCookie('token', token, this.saveInDays);

        // Удаляем токен из URL
        this.removeTokenFromUrl();
      }
    });
  }

  private removeTokenFromUrl(): void {
    const currentUrl = this.location.path(); // Текущий URL
    const [baseUrl, queryParams] = currentUrl.split('?'); // Разделяем путь и параметры

    if (queryParams) {
      const params = new URLSearchParams(queryParams); // Парсим параметры
      params.delete('token'); // Удаляем только token

      const newQueryString = params.toString(); // Преобразуем оставшиеся параметры в строку
      const newUrl = newQueryString ? `${baseUrl}?${newQueryString}` : baseUrl; // Собираем новый URL

      this.location.replaceState(newUrl); // Заменяем состояние браузера
    }
  }
}
