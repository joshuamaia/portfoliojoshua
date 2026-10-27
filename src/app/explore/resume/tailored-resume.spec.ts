import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { experiences, formatPeriod } from '../../data/experience';
import { profile } from '../../data/profile';
import { findResumeProfile, resumeProfiles } from '../../data/resume-profiles';
import { registerIcons } from '../../testing/test-icons';
import { ResumePdfService, pdfSafe } from './resume-pdf.service';
import { buildTailoredResume, experienceRelevance, missingFocus } from './tailored-resume';
import { TailoredResumeComponent } from './tailored-resume.component';

const backend = findResumeProfile('backend')!;
const frontend = findResumeProfile('frontend')!;

describe('tailored resume builder', () => {
  it('offers the three requested profiles', () => {
    expect(resumeProfiles.map((p) => p.name)).toEqual(['Backend Java', 'Frontend Angular', 'Full Stack Engineering']);
  });

  for (const resumeProfile of resumeProfiles) {
    it(`preserves companies, roles, periods and activities (${resumeProfile.name})`, () => {
      const resume = buildTailoredResume(resumeProfile);
      expect(resume.experience.map((e) => [e.company, e.role, e.client, e.period])).toEqual(
        experiences.map((job) => [job.company, job.role, job.client, formatPeriod(job)]),
      );
      resume.experience.forEach((entry, i) => {
        expect(entry.activities).toEqual(experiences[i].activities);
        expect([...entry.technologies].sort()).toEqual([...experiences[i].technologies].sort());
      });
      expect(resume.title).toBe(profile.role);
      expect(resume.summary).toEqual(profile.summary);
    });
  }

  it('orders skill groups and puts the prioritized skills first', () => {
    const resume = buildTailoredResume(backend);
    expect(resume.skills[0].title).toBe('Back End');
    expect(resume.skills.at(-1)?.title).toBe('Front End');
    const backEnd = resume.skills[0];
    expect(backEnd.items.slice(0, backEnd.highlighted.length).every((item) => backEnd.highlighted.includes(item))).toBeTrue();
    expect(buildTailoredResume(frontend).skills[0].title).toBe('Front End');
  });

  it('classifies relevance from matching technologies', () => {
    const job = { company: 'X', start: '2020-01', activities: [], technologies: ['Angular', 'Git'] };
    expect(experienceRelevance(job, frontend)).toEqual({ relevance: 'medium', matched: ['Angular'] });
    expect(experienceRelevance({ ...job, technologies: ['Git'] }, frontend).relevance).toBe('low');
  });

  it('never claims focus areas that are missing from the portfolio data', () => {
    expect(missingFocus(frontend)).toEqual(['RxJS', 'Reactive Forms', 'Component Architecture']);
    expect(buildTailoredResume(frontend).focus).toEqual(['Angular', 'TypeScript', 'Frontend Testing']);
    expect(missingFocus(backend)).toEqual([]);
  });

  it('uses a separate file name per profile', () => {
    const names = resumeProfiles.map((p) => buildTailoredResume(p).fileName);
    expect(new Set(names).size).toBe(3);
    expect(names).not.toContain('Joshua_MaiaRodrigues_Resume.pdf');
  });
});

describe('ResumePdfService', () => {
  it('replaces characters outside the PDF standard fonts', () => {
    expect(pdfSafe('Apr 2026 — Present · Brasília – DF “x” → y…')).toBe('Apr 2026 - Present · Brasília - DF "x" -> y...');
  });

  it('generates a text-based PDF', async () => {
    const service = TestBed.inject(ResumePdfService);
    const blob = await service.generate(buildTailoredResume(backend), backend.focusTitle);
    expect(blob.type).toBe('application/pdf');
    const content = await blob.text();
    expect(content.startsWith('%PDF')).toBeTrue();
    expect(content).toContain('(Joshua Maia Rodrigues)');
    expect(content).toContain('(PROFESSIONAL EXPERIENCE)');
    expect(content).toContain('Focus: Backend Java');
  });
});

describe('TailoredResumeComponent', () => {
  let harness: RouterTestingHarness;
  let pdf: jasmine.SpyObj<ResumePdfService>;

  beforeEach(async () => {
    pdf = jasmine.createSpyObj<ResumePdfService>('ResumePdfService', ['generate', 'download']);
    pdf.generate.and.resolveTo(new Blob(['%PDF'], { type: 'application/pdf' }));
    TestBed.configureTestingModule({
      providers: [
        provideRouter([{ path: 'resume', component: TailoredResumeComponent }]),
        { provide: ResumePdfService, useValue: pdf },
      ],
    });
    registerIcons();
    harness = await RouterTestingHarness.create();
  });

  async function open(url = '/resume'): Promise<HTMLElement> {
    await harness.navigateByUrl(url);
    harness.detectChanges();
    return harness.routeNativeElement!;
  }

  async function settle(): Promise<void> {
    await harness.fixture.whenStable();
    harness.detectChanges();
  }

  it('starts with Full Stack Engineering and keeps the original resume available', async () => {
    const el = await open();
    expect(el.querySelector('[role="radio"][aria-checked="true"]')?.textContent).toContain('Full Stack Engineering');
    expect(el.querySelector('.tr-actions a')?.getAttribute('href')).toBe(profile.resume);
  });

  it('updates the preview when another profile is selected', async () => {
    const el = await open();
    el.querySelectorAll<HTMLButtonElement>('[role="radio"]')[1].click();
    await settle();
    expect(TestBed.inject(Router).url).toContain('profile=frontend');
    expect(el.querySelector('.tr-title')?.textContent).toContain('Focus: Frontend Angular');
    expect(el.querySelector('.tr-skill strong')?.textContent).toContain('Front End');
    expect(el.querySelectorAll('.tr-job').length).toBe(experiences.length);
  });

  it('generates and downloads the tailored PDF', async () => {
    const el = await open('/resume?profile=backend');
    el.querySelector<HTMLButtonElement>('.tr-actions .btn-primary-x')!.click();
    await settle();
    expect(pdf.generate).toHaveBeenCalledWith(jasmine.objectContaining({ profileId: 'backend' }), 'Backend Java');
    expect(pdf.download).toHaveBeenCalledWith(jasmine.any(Blob), 'Joshua_MaiaRodrigues_Resume_Backend_Java.pdf');
    expect(el.querySelector('.tr-status')?.textContent).toContain('Generated');
  });

  it('reports a generation error', async () => {
    pdf.generate.and.rejectWith(new Error('boom'));
    const el = await open();
    el.querySelector<HTMLButtonElement>('.tr-actions .btn-primary-x')!.click();
    await settle();
    expect(pdf.download).not.toHaveBeenCalled();
    expect(el.querySelector('.tr-status')?.textContent).toContain('could not be generated');
  });
});
