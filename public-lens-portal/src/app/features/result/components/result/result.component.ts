import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  PLATFORM_ID,
  ViewChild,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

type DimId = 'voting' | 'age' | 'district';

interface ChartBlock {
  questionId: string;
  title: string;
}

@Component({
  selector: 'app-result',
  standalone: false,
  templateUrl: './result.component.html',
  styleUrl: './result.component.css',
})
export class ResultComponent implements AfterViewInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly browser = isPlatformBrowser(this.platformId);

  @ViewChild('chartSalaries') chartSalariesRef?: ElementRef<HTMLCanvasElement>;
  @ViewChild('chartLawOrder') chartLawOrderRef?: ElementRef<HTMLCanvasElement>;

  private chartSalaries?: Chart;
  private chartLawOrder?: Chart;

  readonly questions: ChartBlock[] = [
    {
      questionId: 'q5',
      title: 'What is your opinion on the increased state sector salaries?',
    },
    {
      questionId: 'q6',
      title:
        'How effective do you think the government has been in maintaining law and order, particularly in addressing underworld and drug-related activities?',
    },
  ];

  readonly dimensions: { id: DimId; label: string }[] = [
    { id: 'voting', label: 'Voting behaviour' },
    { id: 'age', label: 'Age group' },
    { id: 'district', label: 'District' },
  ];

  selectedDimQ5: DimId = 'voting';
  selectedDimQ6: DimId = 'voting';

  /** Demo percentages — replace with API-driven aggregates when available */
  private readonly q5Data: Record<DimId, { labels: string[]; datasets: { label: string; data: number[] }[] }> = {
    voting: {
      labels: ['Ruling party', 'Another party', 'Did not vote', 'Prefer not to say'],
      datasets: [
        { label: 'Strongly agree', data: [45, 30, 40, 50] },
        { label: 'Agree', data: [30, 20, 20, 10] },
        { label: 'Neutral', data: [10, 30, 20, 20] },
        { label: 'Oppose', data: [10, 10, 10, 10] },
        { label: 'Strongly oppose', data: [5, 10, 10, 10] },
      ],
    },
    age: {
      labels: ['18–24', '25–34', '35–44', '45–54', '55+'],
      datasets: [
        { label: 'Strongly agree', data: [38, 42, 44, 48, 52] },
        { label: 'Agree', data: [28, 30, 32, 28, 26] },
        { label: 'Neutral', data: [18, 14, 12, 12, 10] },
        { label: 'Oppose', data: [10, 8, 8, 7, 7] },
        { label: 'Strongly oppose', data: [6, 6, 4, 5, 5] },
      ],
    },
    district: {
      labels: ['Colombo', 'Gampaha', 'Kandy', 'Galle', 'Jaffna'],
      datasets: [
        { label: 'Strongly agree', data: [48, 44, 40, 42, 36] },
        { label: 'Agree', data: [28, 30, 32, 28, 24] },
        { label: 'Neutral', data: [12, 14, 16, 18, 22] },
        { label: 'Oppose', data: [8, 8, 8, 8, 10] },
        { label: 'Strongly oppose', data: [4, 4, 4, 4, 8] },
      ],
    },
  };

  private readonly q6Data: Record<DimId, { labels: string[]; datasets: { label: string; data: number[] }[] }> = {
    voting: {
      labels: ['Ruling party', 'Another party', 'Did not vote', 'Prefer not to say'],
      datasets: [
        { label: 'Very effective', data: [35, 22, 28, 40] },
        { label: 'Somewhat effective', data: [30, 28, 30, 25] },
        { label: 'Neutral', data: [20, 25, 22, 20] },
        { label: 'Ineffective', data: [10, 15, 12, 10] },
        { label: 'Very ineffective', data: [5, 10, 8, 5] },
      ],
    },
    age: {
      labels: ['18–24', '25–34', '35–44', '45–54', '55+'],
      datasets: [
        { label: 'Very effective', data: [28, 32, 34, 36, 38] },
        { label: 'Somewhat effective', data: [32, 30, 28, 26, 24] },
        { label: 'Neutral', data: [22, 20, 20, 18, 18] },
        { label: 'Ineffective', data: [12, 12, 12, 12, 12] },
        { label: 'Very ineffective', data: [6, 6, 6, 8, 8] },
      ],
    },
    district: {
      labels: ['Colombo', 'Gampaha', 'Kandy', 'Galle', 'Jaffna'],
      datasets: [
        { label: 'Very effective', data: [36, 34, 30, 32, 28] },
        { label: 'Somewhat effective', data: [30, 30, 32, 28, 26] },
        { label: 'Neutral', data: [18, 18, 20, 22, 24] },
        { label: 'Ineffective', data: [10, 12, 12, 12, 14] },
        { label: 'Very ineffective', data: [6, 6, 6, 6, 8] },
      ],
    },
  };

  ngAfterViewInit(): void {
    if (!this.browser) return;
    Chart.register(...registerables);
    queueMicrotask(() => {
      this.renderSalaries();
      this.renderLawOrder();
    });
  }

  ngOnDestroy(): void {
    this.chartSalaries?.destroy();
    this.chartLawOrder?.destroy();
  }

  onDimQ5Change(dim: DimId): void {
    this.selectedDimQ5 = dim;
    this.renderSalaries();
  }

  onDimQ6Change(dim: DimId): void {
    this.selectedDimQ6 = dim;
    this.renderLawOrder();
  }

  private renderSalaries(): void {
    const canvas = this.chartSalariesRef?.nativeElement;
    if (!canvas) return;
    this.chartSalaries?.destroy();
    const cfg = this.buildConfig(this.q5Data[this.selectedDimQ5], 'Responses (%)');
    this.chartSalaries = new Chart(canvas, cfg);
  }

  private renderLawOrder(): void {
    const canvas = this.chartLawOrderRef?.nativeElement;
    if (!canvas) return;
    this.chartLawOrder?.destroy();
    const cfg = this.buildConfig(this.q6Data[this.selectedDimQ6], 'Responses (%)');
    this.chartLawOrder = new Chart(canvas, cfg);
  }

  private buildConfig(
    block: { labels: string[]; datasets: { label: string; data: number[] }[] },
    yTitle: string,
  ): ChartConfiguration<'bar'> {
    const colors = ['#0d9488', '#14b8a6', '#5eead4', '#f59e0b', '#ef4444'];
    return {
      type: 'bar',
      data: {
        labels: block.labels,
        datasets: block.datasets.map((ds, i) => ({
          label: ds.label,
          data: ds.data,
          backgroundColor: colors[i % colors.length],
          borderRadius: 4,
        })),
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { boxWidth: 12, font: { size: 11 } },
          },
        },
        scales: {
          x: {
            stacked: false,
            ticks: { maxRotation: 45, minRotation: 0, font: { size: 10 } },
          },
          y: {
            beginAtZero: true,
            max: 100,
            title: { display: true, text: yTitle },
          },
        },
      },
    };
  }
}
