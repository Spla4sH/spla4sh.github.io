import type { Lang } from '../lib/i18n';

export interface TimelineEntry {
  role: string;
  org: string;
  period: string;
  location?: string;
  description?: string;
  highlights?: string[];
  stack?: string[];
}

export interface SkillsGroup {
  category: string;
  items: string[];
}

export const experience: Record<Lang, TimelineEntry[]> = {
  de: [
    {
      role: '— Deine Rolle —',
      org: '— Aktueller / letzter Arbeitgeber —',
      period: '2024 – heute',
      location: 'Remote / Stadt',
      description:
        'Kurze Beschreibung deiner Aufgaben und Verantwortlichkeiten. Bitte hier deine echten Stationen eintragen.',
      highlights: [
        'Highlight 1 — eine messbare Wirkung oder ein konkretes Ergebnis',
        'Highlight 2 — Technologien eingeführt, Probleme gelöst',
        'Highlight 3 — Team / Stakeholder',
      ],
      stack: ['Kubernetes', 'Python', 'AWS'],
    },
    {
      role: 'Werkstudent / Praktikant Data Science',
      org: 'Fraunhofer ISE',
      period: '2022 – 2023',
      location: 'Freiburg',
      description:
        'Forschung im Bereich Lastprognose für Gebäude. Aufbau von Rolling-Window-Backtesting-Pipelines mit LightGBM, NHiTS und TSMixer.',
      highlights: [
        'Bachelorarbeit zum Thema Energy Load Forecasting',
        'Reproduzierbare Experimente mit Darts und MLflow',
      ],
      stack: ['Python', 'Darts', 'LightGBM', 'pandas'],
    },
  ],
  en: [
    {
      role: '— Your role —',
      org: '— Current / latest employer —',
      period: '2024 – present',
      location: 'Remote / City',
      description:
        'Short description of your tasks and responsibilities. Replace with your real experience.',
      highlights: [
        'Highlight 1 — a measurable impact or concrete outcome',
        'Highlight 2 — technologies introduced, problems solved',
        'Highlight 3 — team / stakeholders',
      ],
      stack: ['Kubernetes', 'Python', 'AWS'],
    },
    {
      role: 'Working student / Intern in Data Science',
      org: 'Fraunhofer ISE',
      period: '2022 – 2023',
      location: 'Freiburg, Germany',
      description:
        'Research on load forecasting for buildings. Built rolling-window backtesting pipelines using LightGBM, NHiTS and TSMixer.',
      highlights: [
        "Bachelor's thesis on energy load forecasting",
        'Reproducible experiments with Darts and MLflow',
      ],
      stack: ['Python', 'Darts', 'LightGBM', 'pandas'],
    },
  ],
};

export const education: Record<Lang, TimelineEntry[]> = {
  de: [
    {
      role: 'Bachelor Wirtschaftsingenieurwesen',
      org: 'Hochschule — bitte einfügen',
      period: '2018 – 2023',
      description: 'Schwerpunkt: Energiesysteme, Data Science. Bachelorarbeit am Fraunhofer ISE.',
    },
  ],
  en: [
    {
      role: "Bachelor's in Industrial Engineering",
      org: 'University — please insert',
      period: '2018 – 2023',
      description:
        'Focus: energy systems, data science. Thesis written at Fraunhofer ISE.',
    },
  ],
};

export const skills: Record<Lang, SkillsGroup[]> = {
  de: [
    { category: 'DevOps & Cloud', items: ['Kubernetes', 'ArgoCD', 'Helm', 'Docker', 'GitHub Actions', 'Terraform', 'kind', 'Linux'] },
    { category: 'Data & ML', items: ['Python', 'PyTorch', 'scikit-learn', 'Darts', 'LightGBM', 'pandas', 'NumPy'] },
    { category: 'Backend', items: ['Go', 'Node.js', 'MongoDB', 'REST', 'Java'] },
    { category: 'Frontend', items: ['TypeScript', 'Astro', 'React', 'Tailwind', 'HTML/CSS'] },
    { category: 'Methoden', items: ['Git', 'GitOps', 'Agile', 'CI/CD', 'Code Review'] },
  ],
  en: [
    { category: 'DevOps & Cloud', items: ['Kubernetes', 'ArgoCD', 'Helm', 'Docker', 'GitHub Actions', 'Terraform', 'kind', 'Linux'] },
    { category: 'Data & ML', items: ['Python', 'PyTorch', 'scikit-learn', 'Darts', 'LightGBM', 'pandas', 'NumPy'] },
    { category: 'Backend', items: ['Go', 'Node.js', 'MongoDB', 'REST', 'Java'] },
    { category: 'Frontend', items: ['TypeScript', 'Astro', 'React', 'Tailwind', 'HTML/CSS'] },
    { category: 'Methods', items: ['Git', 'GitOps', 'Agile', 'CI/CD', 'Code Review'] },
  ],
};
