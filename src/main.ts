import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './app/services/auth/auth.interceptor';
import { routes } from './app/app.routes';

// Регистрация приложения
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), // Подключаем маршруты
    provideHttpClient(
      withInterceptors([
        authInterceptor, // Регистрируем Interceptor
      ])
    ),
  ],
}).catch((err) => console.error(err));
