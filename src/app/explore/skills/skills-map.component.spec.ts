import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { registerIcons } from '../../testing/test-icons';
import { SkillsMapComponent } from './skills-map.component';

describe('SkillsMapComponent', () => {
  let harness: RouterTestingHarness;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideRouter([{ path: 'skills', component: SkillsMapComponent }])],
    });
    registerIcons();
    harness = await RouterTestingHarness.create();
  });

  async function open(url: string): Promise<HTMLElement> {
    await harness.navigateByUrl(url);
    harness.detectChanges();
    return harness.routeNativeElement!;
  }

  async function settle(): Promise<void> {
    await harness.fixture.whenStable();
    harness.detectChanges();
  }

  const panelTitle = (el: HTMLElement) => el.querySelector('.sm-panel .card-title')?.textContent?.trim();

  it('renders one node per category and selects Backend Development by default', async () => {
    const el = await open('/skills');
    expect(el.querySelectorAll('.sm-node').length).toBe(8);
    expect(panelTitle(el)).toBe('Backend Development');
    expect(el.querySelector('.sm-node.is-active')?.textContent).toContain('Backend Development');
  });

  it('shows the details of the selected category, without proficiency percentages', async () => {
    const el = await open('/skills');
    const node = Array.from(el.querySelectorAll<HTMLButtonElement>('.sm-node')).find((b) =>
      b.textContent?.includes('Workflow Automation'),
    )!;
    node.click();
    await settle();

    expect(TestBed.inject(Router).url).toContain('skill=workflow');
    expect(panelTitle(el)).toBe('Workflow Automation');
    expect(el.querySelector('.sm-panel .chips')?.textContent).toContain('Flowable');
    const labels = Array.from(el.querySelectorAll('.sm-panel .label')).map((l) => l.textContent?.trim());
    expect(labels).toContain('Responsibilities and practical applications');
    expect(labels).toContain('Related competencies');
    expect(el.querySelector('.sm-panel')?.textContent).not.toMatch(/\d+\s*%/);
  });

  it('lists the roles where the category was applied', async () => {
    const el = await open('/skills?skill=frontend');
    const roles = Array.from(el.querySelectorAll('.sm-roles strong')).map((s) => s.textContent?.trim());
    expect(roles).toContain('CODATA');
  });

  it('navigates to a related competency', async () => {
    const el = await open('/skills?skill=workflow');
    el.querySelector<HTMLButtonElement>('.sm-related-btn')!.click();
    await settle();
    expect(panelTitle(el)).toBe('Backend Development');
  });

  it('moves between categories with the arrow keys', async () => {
    const el = await open('/skills');
    el.querySelector<HTMLButtonElement>('.sm-node.is-active')!.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }),
    );
    await settle();
    expect(panelTitle(el)).toBe('Frontend Development');
  });

  it('switches between the map and the cards view', async () => {
    const el = await open('/skills');
    expect(el.querySelector('.sm-map')).not.toBeNull();
    expect(el.querySelector('.sm-cards')?.classList).toContain('is-fallback');

    el.querySelectorAll<HTMLButtonElement>('.sm-toggle button')[1].click();
    await settle();
    expect(TestBed.inject(Router).url).toContain('view=cards');
    expect(el.querySelector('.sm-map')).toBeNull();
    expect(el.querySelector('.sm-cards')?.classList).not.toContain('is-fallback');
    expect(el.querySelectorAll('.sm-card').length).toBe(8);
  });
});
