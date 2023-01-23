export interface ResourceSummary {
  id: string;
  name: string;
  nameLocal: string;
}

export interface Language extends ResourceSummary {
  script: string;
  scriptDirection: string;
}

export type Country = ResourceSummary;

export interface AudioBibleSummary extends ResourceSummary {
  description: string;
  descriptionLocal: string;
}

export interface BibleSummary extends ResourceSummary {
  dblId: string;
  abbreviation: string;
  abbreviationLocal: string;
  language: Language;
  countries: Country[];

  description: string;
  descriptionLocal: string;
  relatedDbl: string;
  type: string;
  updatedAt: string;
  audioBibles: AudioBibleSummary[];
}
