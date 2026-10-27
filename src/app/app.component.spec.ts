import { TestBed } from '@angular/core/testing';
import { RouterModule, provideRouter } from '@angular/router';
import { AppComponent } from './app.component';
import { MenuModule } from './menu/menu.module';
import { RodapeComponent } from './rodape/rodape.component';
import { SharedModule } from './shared/shared.module';
import { TopoComponent } from './topo/topo.component';

describe('AppComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [RouterModule, SharedModule, MenuModule],
      declarations: [AppComponent, TopoComponent, RodapeComponent],
      providers: [provideRouter([])],
    }),
  );

  function render(): HTMLElement {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('renders the header, main content area and footer', () => {
    const el = render();
    expect(el.querySelector('.site-header')).not.toBeNull();
    expect(el.querySelector('main#conteudo router-outlet')).not.toBeNull();
    expect(el.querySelector('app-rodape')).not.toBeNull();
  });

  it('keeps every existing navigation item and adds Explore', () => {
    const links = Array.from(render().querySelectorAll<HTMLAnchorElement>('.nav-link-x')).map((a) => [
      a.textContent?.trim(),
      a.getAttribute('href'),
    ]);
    expect(links).toEqual([
      ['Home', '/home'],
      ['Experience', '/trabalhos'],
      ['Education', '/escolaridades'],
      ['Courses', '/escolaridades/extra'],
      ['Certificates', '/certificados'],
      ['Explore', '/explore'],
    ]);
  });

  it('keeps the resume viewer available in the header', () => {
    expect(render().querySelector('button[aria-label="View resume"]')).not.toBeNull();
  });
});
