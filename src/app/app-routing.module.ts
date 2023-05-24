import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'trabalhos',
    loadChildren: () =>
      import('./trabalho/trabalho.module').then((m) => m.TrabalhoModule),
  },
  {
    path: 'escolaridades',
    loadChildren: () =>
      import('./escolaridades/escolaridades.module').then(
        (m) => m.EscolaridadesModule
      ),
  },
  {
    path: 'certificados',
    loadChildren: () =>
      import('./certificados/certificados.module').then(
        (m) => m.CertificadosModule
      ),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
