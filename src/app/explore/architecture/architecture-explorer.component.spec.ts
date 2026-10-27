import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { registerIcons } from '../../testing/test-icons';
import { ArchitectureExplorerComponent } from './architecture-explorer.component';

describe('ArchitectureExplorerComponent', () => {
  let harness: RouterTestingHarness;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideRouter([{ path: 'explore', component: ArchitectureExplorerComponent }])],
    });
    registerIcons();
    harness = await RouterTestingHarness.create();
  });

  async function open(url: string): Promise<HTMLElement> {
    await harness.navigateByUrl(url, ArchitectureExplorerComponent);
    harness.detectChanges();
    return harness.routeNativeElement!;
  }

  async function settle(): Promise<void> {
    await harness.fixture.whenStable();
    harness.detectChanges();
  }

  const selectedTab = (el: HTMLElement) => el.querySelector('[role="tab"][aria-selected="true"]')?.textContent?.trim();
  const panelTitle = (el: HTMLElement) => el.querySelector('app-architecture-panel .card-title')?.textContent?.trim();

  it('shows the four architectures and opens Modern Monolith by default', async () => {
    const el = await open('/explore');
    expect(el.querySelectorAll('[role="tab"]').length).toBe(4);
    expect(selectedTab(el)).toBe('Modern Monolith');
    expect(el.querySelectorAll('app-diagram .dg-node').length).toBeGreaterThan(0);
    expect(el.querySelector('.ap-kicker')?.textContent?.trim()).toBe('Overview');
  });

  it('reads the selected pattern from the URL', async () => {
    const el = await open('/explore?pattern=bpmn');
    expect(selectedTab(el)).toBe('BPMN');
    expect(el.querySelector('.ax-diagram-card .card-title')?.textContent?.trim()).toBe(
      'Business Process Management (BPMN)',
    );
  });

  it('switches architecture when a tab is clicked and keeps it in the URL', async () => {
    const el = await open('/explore');
    (el.querySelectorAll<HTMLButtonElement>('[role="tab"]')[2]).click();
    await settle();
    expect(TestBed.inject(Router).url).toContain('pattern=event-driven');
    expect(selectedTab(el)).toBe('Event-Driven');
  });

  it('moves between tabs with the arrow keys', async () => {
    const el = await open('/explore?pattern=bpmn');
    const tab = el.querySelector<HTMLButtonElement>('[role="tab"][aria-selected="true"]')!;
    tab.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    await settle();
    expect(selectedTab(el)).toBe('Modern Monolith');
  });

  it('shows component details when a diagram node is selected', async () => {
    const el = await open('/explore?pattern=microservices');
    const gateway = Array.from(el.querySelectorAll<HTMLButtonElement>('.dg-node')).find((b) =>
      b.textContent?.includes('API Gateway'),
    )!;
    gateway.click();
    harness.detectChanges();

    expect(panelTitle(el)).toBe('API Gateway');
    const labels = Array.from(el.querySelectorAll('app-architecture-panel .label')).map((l) => l.textContent?.trim());
    expect(labels).toEqual(['Responsibility', 'Technologies', 'Benefits', 'Trade-offs', 'Common challenges']);
    expect(el.querySelector('app-architecture-panel .chips')?.textContent).toContain('Spring Cloud Gateway');
  });

  it('returns to the overview from the panel and when the architecture changes', async () => {
    const el = await open('/explore?pattern=microservices');
    el.querySelector<HTMLButtonElement>('.dg-node')!.click();
    harness.detectChanges();
    el.querySelector<HTMLButtonElement>('.ap-back')!.click();
    harness.detectChanges();
    expect(el.querySelector('.ap-kicker')?.textContent?.trim()).toBe('Overview');

    el.querySelector<HTMLButtonElement>('.dg-node')!.click();
    harness.detectChanges();
    (el.querySelectorAll<HTMLButtonElement>('[role="tab"]')[3]).click();
    await settle();
    expect(el.querySelector('.ap-kicker')?.textContent?.trim()).toBe('Overview');
    expect(panelTitle(el)).toBe('BPMN');
  });

  it('toggles the comparison view', async () => {
    const el = await open('/explore?pattern=event-driven');
    el.querySelector<HTMLButtonElement>('.ax-head button')!.click();
    await settle();
    expect(TestBed.inject(Router).url).toContain('view=compare');
    expect(el.querySelector('app-architecture-comparison')).not.toBeNull();
    expect(el.querySelector('[role="tablist"]')).toBeNull();

    el.querySelector<HTMLButtonElement>('.ax-head button')!.click();
    await settle();
    expect(el.querySelector('app-architecture-comparison')).toBeNull();
    expect(selectedTab(el)).toBe('Event-Driven');
  });
});
