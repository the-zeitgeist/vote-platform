export interface Period {
  name: string;
  initialDate: string;
  finalDate: string;
}

export interface PeriodData extends Period {
  id: number;
}
