import { Injectable } from '@angular/core';
import type { jsPDF } from 'jspdf';
import { TailoredResume } from './tailored-resume';

/**
 * Gera o PDF do currículo direcionado com texto selecionável e estrutura simples
 * (uma coluna, títulos claros, sem imagens), o que favorece a leitura por sistemas ATS.
 * O jsPDF é carregado apenas quando o visitante pede o arquivo.
 */
@Injectable({ providedIn: 'root' })
export class ResumePdfService {
  async generate(resume: TailoredResume, focusTitle: string): Promise<Blob> {
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    new ResumeWriter(doc).write(resume, focusTitle);
    return doc.output('blob');
  }

  download(blob: Blob, fileName: string): void {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
}

const MARGIN = 18;
const ACCENT: [number, number, number] = [91, 33, 182];
const TEXT: [number, number, number] = [30, 41, 59];
const SOFT: [number, number, number] = [100, 116, 139];

/** As fontes padrão do PDF usam WinAnsi: troca caracteres fora dessa tabela */
export function pdfSafe(value: string): string {
  return value
    .replace(/[–—]/g, '-')
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/…/g, '...')
    .replace(/→/g, '->')
    .replace(/[^\x00-\xFF]/g, '');
}

class ResumeWriter {
  private y = MARGIN;
  private readonly width: number;
  private readonly height: number;

  constructor(private readonly doc: jsPDF) {
    this.width = doc.internal.pageSize.getWidth() - MARGIN * 2;
    this.height = doc.internal.pageSize.getHeight();
  }

  write(resume: TailoredResume, focusTitle: string): void {
    const doc = this.doc;
    doc.setProperties({
      title: `${resume.name} - Resume (${focusTitle})`,
      author: resume.name,
      subject: `${resume.title} - ${focusTitle}`,
      creator: 'joshuamr.com.br',
    });

    this.text(resume.name, { size: 20, bold: true, color: TEXT, gap: 1 });
    this.text(`${resume.title} | Focus: ${focusTitle}`, { size: 11.5, bold: true, color: ACCENT, gap: 1 });
    this.text(resume.headline, { size: 9.5, color: SOFT, gap: 1 });
    this.text(
      [resume.location, ...resume.links.map((link) => link.url.replace(/^https?:\/\//, ''))].join('  |  '),
      { size: 9, color: SOFT, gap: 2 },
    );

    this.section('Summary');
    resume.summary.forEach((paragraph) => this.text(paragraph, { gap: 1.5 }));
    if (resume.focus.length) this.text(`Focus areas: ${resume.focus.join(', ')}.`, { bold: true, gap: 1 });

    this.section('Core Skills');
    for (const group of resume.skills) {
      this.labelled(group.title, group.items.join(', '));
    }

    this.section('Professional Experience');
    for (const job of resume.experience) {
      this.ensureSpace(18);
      this.row(job.company + (job.role ? ` - ${job.role}` : ''), job.period);
      if (job.client) this.text(`Client: ${job.client}`, { size: 9, color: SOFT, gap: 0.5 });
      job.activities.forEach((activity) => this.bullet(activity.replace(/[;.]$/, '.')));
      this.labelled('Technologies', job.technologies.join(', '));
      this.y += 2;
    }

    this.section('Education');
    for (const degree of resume.education) {
      const details = [degree.institution, degree.inProgress ? 'In progress' : ''].filter(Boolean).join(' - ');
      this.bullet(details ? `${degree.title} (${details})` : degree.title);
    }

    this.section('Certifications');
    resume.certificates.forEach((title) => this.bullet(title));

    this.section('Languages');
    this.text(resume.languages);
  }

  private section(title: string): void {
    this.ensureSpace(14);
    this.y += 3;
    this.text(title.toUpperCase(), { size: 10.5, bold: true, color: ACCENT, gap: 0.5 });
    this.doc.setDrawColor(...ACCENT);
    this.doc.setLineWidth(0.3);
    this.doc.line(MARGIN, this.y, MARGIN + this.width, this.y);
    this.y += 3.5;
  }

  private text(
    value: string,
    { size = 10, bold = false, color = TEXT, gap = 0.8, indent = 0 }: { size?: number; bold?: boolean; color?: [number, number, number]; gap?: number; indent?: number } = {},
  ): void {
    const doc = this.doc;
    doc.setFont('helvetica', bold ? 'bold' : 'normal');
    doc.setFontSize(size);
    doc.setTextColor(...color);
    const lineHeight = size * 0.42;
    const lines: string[] = doc.splitTextToSize(pdfSafe(value), this.width - indent);
    for (const line of lines) {
      this.ensureSpace(lineHeight);
      doc.text(line, MARGIN + indent, this.y + lineHeight * 0.8);
      this.y += lineHeight;
    }
    this.y += gap;
  }

  private bullet(value: string): void {
    this.ensureSpace(5);
    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(10);
    this.doc.setTextColor(...ACCENT);
    this.doc.text('-', MARGIN + 1, this.y + 3.4);
    this.text(value, { indent: 5, gap: 0.6 });
  }

  private labelled(label: string, value: string): void {
    this.text(label, { size: 9.5, bold: true, gap: 0.3 });
    this.text(value, { size: 9.5, color: SOFT, gap: 1.6 });
  }

  /** Título à esquerda e período alinhado à direita na mesma linha */
  private row(left: string, right: string): void {
    const doc = this.doc;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    const rightText = pdfSafe(right);
    const rightWidth = doc.getTextWidth(rightText);
    doc.setTextColor(...SOFT);
    doc.text(rightText, MARGIN + this.width - rightWidth, this.y + 4);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(...TEXT);
    const lines: string[] = doc.splitTextToSize(pdfSafe(left), this.width - rightWidth - 6);
    lines.forEach((line, index) => doc.text(line, MARGIN, this.y + 4 + index * 4.6));
    this.y += 4.6 * lines.length + 1.4;
  }

  private ensureSpace(needed: number): void {
    if (this.y + needed > this.height - MARGIN) {
      this.doc.addPage();
      this.y = MARGIN;
    }
  }
}
