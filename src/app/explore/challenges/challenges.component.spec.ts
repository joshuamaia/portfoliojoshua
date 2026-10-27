import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { challenges } from '../../data/challenges';
import { registerIcons } from '../../testing/test-icons';
import { ChallengeDetailComponent } from './challenge-detail.component';
import { ChallengeListComponent } from './challenge-list.component';

describe('Engineering Challenges', () => {
  let harness: RouterTestingHarness;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([
          { path: 'challenges', component: ChallengeListComponent },
          { path: 'challenges/:id', component: ChallengeDetailComponent },
        ]),
      ],
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

  describe('list', () => {
    it('shows a card per challenge with category, complexity and a link', async () => {
      const el = await open('/challenges');
      const cards = el.querySelectorAll('.ch-card');
      expect(cards.length).toBe(challenges.length);
      expect(cards[0].querySelector('.ch-category')?.textContent?.trim()).toBe(challenges[0].category);
      expect(cards[0].querySelector('.ch-complexity')?.textContent).toContain(challenges[0].complexity);
      expect(cards[0].querySelector('a')?.getAttribute('href')).toBe(`/challenges/${challenges[0].id}`);
    });

    it('filters by category', async () => {
      const el = await open('/challenges');
      const filter = Array.from(el.querySelectorAll<HTMLButtonElement>('.ch-filter')).find(
        (b) => b.textContent?.trim() === 'Databases',
      )!;
      filter.click();
      harness.detectChanges();
      const titles = Array.from(el.querySelectorAll('.ch-card .card-title')).map((t) => t.textContent?.trim());
      expect(titles).toEqual(['Database Performance Optimization']);
      expect(filter.getAttribute('aria-pressed')).toBe('true');
    });
  });

  describe('detail', () => {
    const url = '/challenges/high-volume-messaging';

    it('presents the problem and requirements before any approach is chosen', async () => {
      const el = await open(url);
      expect(el.querySelector('#cd-title')?.textContent?.trim()).toBe('High-Volume Message Processing');
      expect(el.querySelectorAll('[role="radio"]').length).toBe(3);
      expect(el.querySelector('app-diagram')).toBeNull();
      expect(el.textContent).not.toContain('Reference solution');
    });

    it('shows the diagram, trade-offs and reference after choosing an approach', async () => {
      const el = await open(url);
      el.querySelectorAll<HTMLButtonElement>('[role="radio"]')[1].click();
      await settle();

      expect(TestBed.inject(Router).url).toContain('approach=rabbitmq');
      expect(el.querySelector('[role="radio"][aria-checked="true"] strong')?.textContent).toContain('RabbitMQ');
      expect(el.querySelector('app-diagram .dg-node')).not.toBeNull();
      expect(el.textContent).toContain('Reference solution');
      expect(el.querySelector('.cd-ref-name')?.textContent).toContain('Kafka');
      expect(el.querySelector('.cd-ref-name .link-btn')).not.toBeNull();
    });

    it('cycles to another approach without leaving the challenge', async () => {
      const el = await open(`${url}?approach=db-queue`);
      el.querySelector<HTMLButtonElement>('.cd-actions button')!.click();
      await settle();
      expect(TestBed.inject(Router).url).toBe(`${url}?approach=kafka`);
      expect(el.querySelector('.badge-live')?.textContent).toContain('Your choice');
    });

    it('explains the role of a diagram component when selected', async () => {
      const el = await open(`${url}?approach=kafka`);
      el.querySelector<HTMLButtonElement>('.dg-node')!.click();
      harness.detectChanges();
      expect(el.querySelector('.cd-node')?.textContent).toContain('Producers');
    });

    it('compares all approaches side by side', async () => {
      const el = await open(`${url}?approach=kafka`);
      const headers = Array.from(el.querySelectorAll('.cd-compare thead th')).slice(1);
      expect(headers.length).toBe(3);
      expect(el.querySelector('.cd-compare thead th.is-current')?.textContent).toContain('Kafka');
    });

    it('links to the related architecture pattern', async () => {
      const el = await open(`${url}?approach=kafka`);
      const link = el.querySelector<HTMLAnchorElement>('.cd-reference a.btn-x');
      expect(link?.getAttribute('href')).toBe('/explore/architecture?pattern=event-driven');
    });

    it('handles an unknown challenge', async () => {
      const el = await open('/challenges/unknown');
      expect(el.textContent).toContain('This challenge does not exist.');
    });
  });
});
