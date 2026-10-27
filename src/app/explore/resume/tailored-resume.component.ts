import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { profile } from '../../data/profile';
import { ResumeProfileId, findResumeProfile, resumeProfiles } from '../../data/resume-profiles';
import { ResumePdfService } from './resume-pdf.service';
import { buildTailoredResume } from './tailored-resume';

type Status = { kind: 'idle' } | { kind: 'working' } | { kind: 'done'; fileName: string } | { kind: 'error' };

@Component({
  selector: 'app-tailored-resume',
  imports: [FontAwesomeModule],
  templateUrl: './tailored-resume.component.html',
  styleUrl: './tailored-resume.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TailoredResumeComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly pdf = inject(ResumePdfService);

  readonly profiles = resumeProfiles;
  readonly originalResume = profile.resume;

  private readonly query = toSignal(this.route.queryParamMap, { initialValue: this.route.snapshot.queryParamMap });

  readonly selected = computed(() => findResumeProfile(this.query().get('profile')) ?? resumeProfiles[2]);
  readonly resume = computed(() => buildTailoredResume(this.selected()));

  readonly status = signal<Status>({ kind: 'idle' });

  select(id: ResumeProfileId): void {
    this.status.set({ kind: 'idle' });
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { profile: id },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }

  onKeydown(event: KeyboardEvent, index: number): void {
    const step = event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : event.key === 'ArrowLeft' || event.key === 'ArrowUp' ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const target = (index + step + this.profiles.length) % this.profiles.length;
    this.select(this.profiles[target].id);
    (event.currentTarget as HTMLElement).parentElement?.querySelectorAll<HTMLElement>('[role="radio"]')[target]?.focus();
  }

  async download(): Promise<void> {
    const resume = this.resume();
    this.status.set({ kind: 'working' });
    try {
      const blob = await this.pdf.generate(resume, this.selected().focusTitle);
      this.pdf.download(blob, resume.fileName);
      this.status.set({ kind: 'done', fileName: resume.fileName });
    } catch {
      this.status.set({ kind: 'error' });
    }
  }

  isHighlighted(group: { highlighted: string[] }, item: string): boolean {
    return group.highlighted.includes(item);
  }
}
