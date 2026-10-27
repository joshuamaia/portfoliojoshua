import { Experience } from '../../data/experience';

/** Lógica pura da linha do tempo: posições das barras e frequência das tecnologias. */

export interface TimelineRange {
  startYear: number;
  endYear: number;
  /** Total de meses entre janeiro do primeiro ano e dezembro do último */
  months: number;
}

export function monthIndex(value: string): number {
  const [year, month] = value.split('-').map(Number);
  return year * 12 + (month - 1);
}

function currentMonth(today: Date): string {
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
}

export function experienceKey(job: Experience): string {
  return `${job.company}-${job.start}`;
}

export function timelineRange(jobs: Experience[], today = new Date()): TimelineRange {
  const startYear = Math.min(...jobs.map((job) => Number(job.start.slice(0, 4))));
  const endYear = Math.max(today.getFullYear(), ...jobs.map((job) => Number((job.end ?? job.start).slice(0, 4))));
  return { startYear, endYear, months: (endYear - startYear + 1) * 12 };
}

/** Posição e largura da barra, em % da largura total do eixo */
export function barPosition(job: Experience, range: TimelineRange, today = new Date()): { left: number; width: number } {
  const origin = range.startYear * 12;
  const start = monthIndex(job.start) - origin;
  // O mês final é inclusivo
  const end = monthIndex(job.end ?? currentMonth(today)) - origin + 1;
  return {
    left: round((start / range.months) * 100),
    width: round((Math.max(1, end - start) / range.months) * 100),
  };
}

export function yearTicks(range: TimelineRange): { year: number; left: number }[] {
  const ticks: { year: number; left: number }[] = [];
  for (let year = range.startYear; year <= range.endYear; year++) {
    ticks.push({ year, left: round((((year - range.startYear) * 12) / range.months) * 100) });
  }
  return ticks;
}

/** Tecnologias ordenadas pela quantidade de experiências em que aparecem (e depois por nome) */
export function technologyFrequency(jobs: Experience[]): { name: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const job of jobs) {
    for (const tech of new Set(job.technologies)) counts.set(tech, (counts.get(tech) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

function round(value: number): number {
  return Math.round(value * 100) / 100;
}
