import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CandidateData } from '../models';
import { AuthService, AuthState } from '../services/auth.service';
import { CandidateService } from '../services/candidate.service';

export const useVote = () => {
  const [candidates, setCandidates] = useState<CandidateData[]>([]);
  const [user, setUser] = useState<string>('');
  const [busy, setBusy] = useState<boolean>(false);
  const [voteError, setVoteError] = useState<Error>({} as Error);
  const navigate = useNavigate();
  const onVoteCandidate: (id: number) => void = useCallback(
    (id) => {
      if (busy) {
        return;
      }
      setBusy(true);

      const process = async (candidateId: number) => {
        try {
          await CandidateService.vote({ user, candidateId });
          await AuthService.revokeToken();
          navigate('/results');
        } catch (e: any) {
          setVoteError(e);
        } finally {
          setBusy(false);
        }
      };

      process(id);
    },
    [navigate, busy, user]
  );

  useEffect(() => {
    const fetchData = async () => {
      const responseData: CandidateData[] =
        await CandidateService.getCandidates();
      setCandidates(responseData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const subscription = AuthService.authState$().subscribe(
      ({ user }: AuthState) => {
        setUser(user);
      }
    );

    return () => subscription.unsubscribe();
  });

  return {
    onVoteCandidate,
    voteError,
    candidates,
  };
};
