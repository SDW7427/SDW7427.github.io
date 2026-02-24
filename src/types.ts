export type TrackId = 'development' | 'infrastructure' | 'itsupport';
export type PathType = 'specialist' | 'manager' | 'common';

export interface CareerNode {
  id: string;
  track: TrackId;
  subtrack?: string;
  stage: 1 | 2 | 3 | 4 | 5 | 6;
  pathType: PathType;
  titleJa: string;
  shortLabel: string;
  summary: string;
  requiredSkills: string[];
  requiredExperience: string[];
  recommendedCerts: string[];
  toolsEnvironmentsLanguages: string[];
  nextStepConditions: string[];
  tags: string[];
  canCoexistWith?: string[];
  relatedNodeIds?: string[];
  position: { x: number; y: number };
  styleKey?: string;
}

export interface CareerEdge {
  source: string;
  target: string;
  type: 'normal' | 'optional' | 'cross-track';
  label?: string;
}
