import { Component } from '@angular/core';
import { certificateCount } from '../../data/certificates';
import { courses, degrees } from '../../data/education';
import { profile, skillGroups } from '../../data/profile';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  standalone: false,
})
export class HomepageComponent {
  readonly profile = profile;
  readonly skillGroups = skillGroups;

  readonly stats = [
    { value: `${profile.yearsOfExperience}+`, label: 'Years of experience', link: '/trabalhos' },
    { value: degrees.length, label: 'Degrees & postgraduate programs', link: '/escolaridades' },
    { value: courses.length, label: 'Bootcamps & courses', link: '/escolaridades/extra' },
    { value: certificateCount, label: 'Certificates', link: '/certificados' },
  ];
}
