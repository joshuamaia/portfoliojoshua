import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { Experience, experiences } from '../../data/experience';
import { registerIcons } from '../../testing/test-icons';
import { barPosition, monthIndex, technologyFrequency, timelineRange, yearTicks } from './career-timeline';
import { CareerTimelineComponent } from './career-timeline.component';

const job = (start: string, end: string | undefined, technologies: string[] = []): Experience => ({
  company: start,
  start,
  end,
  technologies,
  activities: [],
});

describe('career timeline logic', () => {
  const today = new Date(2026, 9, 15);

  it('spans from January of the first year to December of the current year', () => {
    const range = timelineRange([job('2014-09', '2023-09'), job('2024-04', undefined)], today);
    expect(range).toEqual({ startYear: 2014, endYear: 2026, months: 13 * 12 });
    expect(yearTicks(range)[0]).toEqual({ year: 2014, left: 0 });
    expect(yearTicks(range).length).toBe(13);
  });

  it('positions bars with inclusive end months and uses today for current jobs', () => {
    const range = { startYear: 2020, endYear: 2020, months: 12 };
    expect(barPosition(job('2020-01', '2020-12'), range, today)).toEqual({ left: 0, width: 100 });
    expect(barPosition(job('2020-07', '2020-09'), range, today)).toEqual({ left: 50, width: 25 });
    expect(monthIndex('2020-01')).toBe(2020 * 12);
  });

  it('orders technologies by how many experiences use them', () => {
    const result = technologyFrequency([job('2020-01', '2020-02', ['Java', 'Git']), job('2021-01', '2021-02', ['Git'])]);
    expect(result).toEqual([
      { name: 'Git', count: 2 },
      { name: 'Java', count: 1 },
    ]);
  });
});

describe('CareerTimelineComponent', () => {
  let harness: RouterTestingHarness;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideRouter([{ path: 'timeline', component: CareerTimelineComponent }])],
    });
    registerIcons();
    harness = await RouterTestingHarness.create();
  });

  async function open(url = '/timeline'): Promise<HTMLElement> {
    await harness.navigateByUrl(url);
    harness.detectChanges();
    return harness.routeNativeElement!;
  }

  const companies = (el: HTMLElement) =>
    Array.from(el.querySelectorAll('.tl-list .tl-company')).map((c) => c.textContent?.trim());

  it('shows every existing experience with its real data', async () => {
    const el = await open();
    expect(companies(el)).toEqual(experiences.map((e) => e.company));
    expect(el.querySelectorAll('.tl-bar').length).toBe(experiences.length);
    expect(el.querySelector('.tl-list .tl-role')?.textContent?.trim()).toBe(experiences[0].role);
  });

  it('starts with the current experience expanded and toggles details', async () => {
    const el = await open();
    const heads = el.querySelectorAll<HTMLButtonElement>('.tl-card-head');
    expect(heads[0].getAttribute('aria-expanded')).toBe('true');
    expect(heads[1].getAttribute('aria-expanded')).toBe('false');

    heads[1].click();
    harness.detectChanges();
    expect(heads[1].getAttribute('aria-expanded')).toBe('true');
    const bullets = el.querySelectorAll(`#tl-body-${experiences[1].company}-${experiences[1].start} li`);
    expect(bullets.length).toBe(experiences[1].activities.length);
  });

  it('expands an experience when its bar is selected', async () => {
    const el = await open();
    el.querySelectorAll<HTMLButtonElement>('.tl-bar')[3].click();
    harness.detectChanges();
    expect(el.querySelectorAll<HTMLButtonElement>('.tl-card-head')[3].getAttribute('aria-expanded')).toBe('true');
  });

  it('filters experiences by technology', async () => {
    const el = await open();
    const chip = Array.from(el.querySelectorAll<HTMLButtonElement>('.tl-chip')).find((b) =>
      b.textContent?.trim().startsWith('PrimeFaces'),
    );
    expect(chip).toBeUndefined();

    el.querySelector<HTMLButtonElement>('.tl-filter .link-btn')!.click();
    harness.detectChanges();
    Array.from(el.querySelectorAll<HTMLButtonElement>('.tl-chip'))
      .find((b) => b.textContent?.trim().startsWith('PrimeFaces'))!
      .click();
    await harness.fixture.whenStable();
    harness.detectChanges();

    expect(TestBed.inject(Router).url).toContain('tech=PrimeFaces');
    expect(companies(el)).toEqual(['CODATA']);
    expect(el.querySelectorAll('.tl-row.is-dimmed').length).toBe(experiences.length - 1);
    expect(el.querySelector('.tl-result')?.textContent).toContain('1 of 4');
  });

  it('ignores unknown technologies in the URL', async () => {
    const el = await open('/timeline?tech=Cobol');
    expect(companies(el).length).toBe(experiences.length);
  });
});
