import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { scrollToTopOnPageChange, urlPath } from './scroll-to-top';

@Component({ template: '' })
class PageComponent {}

@Component({ template: '' })
class ScrollHostComponent {
  constructor() {
    scrollToTopOnPageChange();
  }
}

describe('scrollToTopOnPageChange', () => {
  let scroller: jasmine.SpyObj<ViewportScroller>;
  let router: Router;

  beforeEach(async () => {
    scroller = jasmine.createSpyObj<ViewportScroller>('ViewportScroller', ['scrollToPosition', 'getScrollPosition', 'scrollToAnchor', 'setOffset', 'setHistoryScrollRestoration']);
    TestBed.configureTestingModule({
      providers: [
        provideRouter([
          { path: 'a', component: PageComponent },
          { path: 'b', component: PageComponent },
        ]),
        { provide: ViewportScroller, useValue: scroller },
      ],
    });
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/a');
    TestBed.createComponent(ScrollHostComponent);
    router = TestBed.inject(Router);
  });

  it('strips query string and fragment from the path', () => {
    expect(urlPath('/explore/skills?skill=backend#top')).toBe('/explore/skills');
  });

  it('keeps the scroll position when only the query string changes', async () => {
    await router.navigateByUrl('/a?approach=kafka');
    await router.navigateByUrl('/a?approach=rabbitmq');
    expect(scroller.scrollToPosition).not.toHaveBeenCalled();
  });

  it('scrolls to the top when the page changes', async () => {
    await router.navigateByUrl('/b');
    expect(scroller.scrollToPosition).toHaveBeenCalledOnceWith([0, 0]);
  });
});
