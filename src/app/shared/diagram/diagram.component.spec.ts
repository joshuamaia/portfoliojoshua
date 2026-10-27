import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { registerIcons } from '../../testing/test-icons';
import { DiagramComponent } from './diagram.component';
import { Diagram } from './diagram.model';

const diagram: Diagram = {
  title: 'Sample',
  width: 500,
  height: 200,
  nodes: [
    {
      id: 'api',
      label: 'API',
      caption: 'REST',
      summary: 'Receives requests.',
      icon: ['fas', 'cube'],
      tone: 'accent',
      x: 0,
      y: 60,
      w: 120,
      h: 60,
    },
    {
      id: 'db',
      label: 'Database',
      summary: 'Stores data.',
      icon: ['fas', 'database'],
      tone: 'success',
      x: 300,
      y: 60,
      w: 120,
      h: 60,
    },
    {
      id: 'log',
      label: 'Logs',
      summary: 'Unrelated node.',
      icon: ['fas', 'chart-line'],
      tone: 'neutral',
      x: 300,
      y: 0,
      w: 120,
      h: 40,
    },
  ],
  edges: [{ from: 'api', to: 'db', mode: 'sync', label: 'JDBC' }],
};

@Component({
  imports: [DiagramComponent],
  template: `<app-diagram [diagram]="diagram" [(selectedId)]="selected"></app-diagram>`,
})
class HostComponent {
  diagram = diagram;
  selected = signal<string | null>(null);
}

describe('DiagramComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let el: HTMLElement;
  const nodes = () => Array.from(el.querySelectorAll<HTMLButtonElement>('.dg-node'));

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HostComponent] });
    registerIcons();
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    el = fixture.nativeElement;
  });

  it('renders one focusable button per node and one path per edge', () => {
    expect(nodes().length).toBe(3);
    expect(nodes().every((button) => button.tagName === 'BUTTON')).toBeTrue();
    expect(el.querySelectorAll('.dg-edge path').length).toBe(1);
    expect(el.querySelector('.dg-edge-label')?.textContent?.trim()).toBe('JDBC');
  });

  it('selects a node on click, highlights its connections and toggles off on a second click', () => {
    nodes()[0].click();
    fixture.detectChanges();
    expect(fixture.componentInstance.selected()).toBe('api');
    expect(nodes()[0].getAttribute('aria-pressed')).toBe('true');
    expect(nodes()[1].classList).toContain('is-related');
    expect(nodes()[2].classList).not.toContain('is-related');
    expect(el.querySelector('.dg-edge')?.classList).toContain('is-active');

    nodes()[0].click();
    fixture.detectChanges();
    expect(fixture.componentInstance.selected()).toBeNull();
  });

  it('shows a tooltip on keyboard focus', () => {
    nodes()[1].dispatchEvent(new Event('focus'));
    fixture.detectChanges();
    expect(el.querySelector('.dg-tooltip')?.textContent?.trim()).toBe('Stores data.');
    nodes()[1].dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    expect(el.querySelector('.dg-tooltip')).toBeNull();
  });

  it('provides a text alternative with components and connections', () => {
    const items = Array.from(el.querySelectorAll('.dg-text-alt li')).map((li) =>
      li.textContent?.replace(/\s+/g, ' ').trim(),
    );
    expect(items).toContain('API (REST): Receives requests.');
    expect(items).toContain('API → Database (synchronous: JDBC)');
  });

  it('uses unique marker ids per instance', () => {
    const second = TestBed.createComponent(HostComponent);
    second.detectChanges();
    const first = el.querySelector('marker')?.id;
    const other = (second.nativeElement as HTMLElement).querySelector('marker')?.id;
    expect(first).toBeTruthy();
    expect(first).not.toBe(other);
  });
});
