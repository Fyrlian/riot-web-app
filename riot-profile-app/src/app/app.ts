// app.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';  // crea este archivo con tus rutas

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule], // Solo importa RouterModule (sin forRoot)
  template: `<router-outlet></router-outlet>`
})
export class App {}
