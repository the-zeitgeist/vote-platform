import { useState, useMemo, useEffect } from 'react';
import { CandidateResult } from '../models';
import { CandidateService } from '../services/candidate.service';

export const useResults = () => {
  const [results, setResults] = useState<CandidateResult[]>([]);
  const totalVotes = useMemo(
    () =>
      results.reduce((acc: number, el: CandidateResult) => acc + el.total, 0),
    [results]
  );

  useEffect(() => {
    const fetchData = async () => {
      const resultData: CandidateResult[] = await CandidateService.getResults();

      setResults(resultData.sort((a, b) => a.total - b.total));
    };

    fetchData();
  }, []);

  return {
    results,
    totalVotes,
  };
};
