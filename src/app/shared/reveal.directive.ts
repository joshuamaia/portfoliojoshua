import {
  Directive,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';

/** Anima a entrada do elemento quando ele aparece na viewport. */
@Directive({
  selector: '[appReveal]',
  standalone: false,
})
export class RevealDirective implements OnInit, OnDestroy {
  @Input() revealDelay = 0;

  @HostBinding('class.reveal') readonly reveal = true;
  @HostBinding('class.is-visible') visible = false;
  @HostBinding('style.--reveal-delay') get delay() {
    return `${this.revealDelay}ms`;
  }

  private readonly element = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;

  ngOnInit(): void {
    if (typeof IntersectionObserver === 'undefined') {
      this.visible = true;
      return;
    }
    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          this.visible = true;
          this.observer?.disconnect();
        }
      },
      { rootMargin: '0px 0px -40px 0px', threshold: 0.05 }
    );
    this.observer.observe(this.element.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
