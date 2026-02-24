export interface Recipe {
  title: string;
  time: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  ingredients: string[];
  instructions: string[];
  tips: string;
  notes?: string; // Optional field to handle API responses
}

export type EggsStatus = 'unknown' | 'yes' | 'no';
export type StarchStatus = 'unknown' | 'pasta' | 'rice' | 'both' | 'neither';
export type DietaryRestriction = 'none' | 'vegetarian' | 'vegan' | 'gluten-free' | 'dairy-free';

export interface FormData {
  hasEggs: EggsStatus;
  hasStarch: StarchStatus;
  dietary: DietaryRestriction;
  timeLimit: string;
  extras: string;
}

export type Step = 'api-key' | 'photo' | 'questions' | 'loading' | 'result';
