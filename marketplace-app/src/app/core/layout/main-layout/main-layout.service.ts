import { Routes, Route } from '@angular/router';
import { MainLayoutComponent } from './main-layout.component';

/**
 * Provides helper metodi per creare rotte.
 */
export class MainLayoutService {
  /**
   * Crei rotte usando the MainLayout component.
   * @param routes Le rotte da aggiungere.
   * @return La nuova rotta che utilizza MainLayout come base
   */
  static childRoutes(routes: Routes): Route {
    return {
      path: '',
      component: MainLayoutComponent,
      children: routes,
      canActivate: [],
    };
  }
}