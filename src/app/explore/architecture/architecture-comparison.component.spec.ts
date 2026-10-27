import { ComponentFixture, TestBed } from '@angular/core/testing';
import { registerIcons } from '../../testing/test-icons';
import { ArchitectureComparisonComponent } from './architecture-comparison.component';

describe('ArchitectureComparisonComponent', () => {
  let fixture: ComponentFixture<ArchitectureComparisonComponent>;
  let el: HTMLElement;

  const headers = () =>
    Array.from(el.querySelectorAll('thead .cmp-arch')).map((h) => h.textContent?.trim());
  const selects = () => Array.from(el.querySelectorAll<HTMLSelectElement>('select'));

  function choose(select: HTMLSelectElement, value: string): void {
    select.value = value;
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();
  }

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [ArchitectureComparisonComponent] });
    registerIcons();
    fixture = TestBed.createComponent(ArchitectureComparisonComponent);
    fixture.componentRef.setInput('initial', 'microservices');
    fixture.detectChanges();
    el = fixture.nativeElement;
  });

  it('starts with the current architecture and the next one', () => {
    expect(headers()).toEqual(['Microservices', 'Event-Driven']);
  });

  it('compares all six qualitative criteria', () => {
    const rows = Array.from(el.querySelectorAll('tbody th')).map((th) => th.textContent?.trim());
    expect(rows).toEqual([
      'Complexity',
      'Scalability',
      'Maintainability',
      'Operational overhead',
      'Fault tolerance',
      'Deployment flexibility',
    ]);
    expect(el.querySelectorAll('tbody td').length).toBe(12);
  });

  it('changes one side without affecting the other', () => {
    choose(selects()[1], 'bpmn');
    expect(headers()).toEqual(['Microservices', 'BPMN']);
  });

  it('swaps both sides when the same architecture is chosen twice', () => {
    choose(selects()[0], 'event-driven');
    expect(headers()).toEqual(['Event-Driven', 'Microservices']);
  });

  it('swaps both sides with the swap button', () => {
    el.querySelector<HTMLButtonElement>('.cmp-swap')!.click();
    fixture.detectChanges();
    expect(headers()).toEqual(['Event-Driven', 'Microservices']);
  });

  it('emits the architecture to explore', () => {
    let emitted: string | undefined;
    fixture.componentInstance.explore.subscribe((id) => (emitted = id));
    el.querySelectorAll<HTMLButtonElement>('.cmp-actions button')[1].click();
    expect(emitted).toBe('event-driven');
  });
});
