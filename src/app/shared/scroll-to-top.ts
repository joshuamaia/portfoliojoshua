import { ViewportScroller } from '@angular/common';
import { DestroyRef, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

/** Caminho da URL sem query string e sem fragmento */
export function urlPath(url: string): string {
  return url.split(/[?#]/)[0];
}

/**
 * Rola para o topo apenas quando a página muda. Navegações que só alteram a
 * query string (abas, seleções e filtros guardados na URL) mantêm a posição.
 */
export function scrollToTopOnPageChange(): void {
  const router = inject(Router);
  const scroller = inject(ViewportScroller);
  let previous = urlPath(router.url);

  const subscription = router.events
    .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
    .subscribe((event) => {
      const current = urlPath(event.urlAfterRedirects);
      const hasFragment = event.urlAfterRedirects.includes('#');
      if (current !== previous && !hasFragment) scroller.scrollToPosition([0, 0]);
      previous = current;
    });

  inject(DestroyRef).onDestroy(() => subscription.unsubscribe());
}
