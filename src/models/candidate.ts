export interface Candidate {
  fullName: string;
  imageUrl: string;
}

export interface CandidateData extends Candidate {
  id: number;
}

export interface CandidateResult extends Candidate {
  total: number;
}
