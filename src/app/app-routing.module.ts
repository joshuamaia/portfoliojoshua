import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const SITE = 'Joshua Maia Rodrigues';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    title: `${SITE} · Software Architect`,
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'trabalhos',
    title: `Work Experience · ${SITE}`,
    loadChildren: () =>
      import('./trabalho/trabalho.module').then((m) => m.TrabalhoModule),
  },
  {
    path: 'escolaridades',
    title: `Education · ${SITE}`,
    loadChildren: () =>
      import('./escolaridades/escolaridades.module').then(
        (m) => m.EscolaridadesModule
      ),
  },
  {
    path: 'certificados',
    title: `Certificates · ${SITE}`,
    loadChildren: () =>
      import('./certificados/certificados.module').then(
        (m) => m.CertificadosModule
      ),
  },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
