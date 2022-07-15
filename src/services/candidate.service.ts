// import axios from "axios";
import { CandidateData, CandidateResult, Response } from '../models';

export interface CrateCandidateInterface {
  full_name: string;
  image_url: string;
}

const candidateService = () => {
  const getCandidates: () => Promise<CandidateData[]> = async () => {
    try {
      // const data = await axios.get('/candidates');
      const data: CandidateData[] = [
        {
          id: 1,
          fullName: 'Gustavo Petro',
          imageUrl:
            'http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQiUC9h-pr565uzUBY09vz6Atl7Bu3GSpCkqNapJHIBzSmrWtmsSJQeE1WAZZZ-3HMk',
        },
        {
          id: 2,
          fullName: 'Rodolfo Hernandez',
          imageUrl:
            'https://img.lalr.co/cms/2022/04/18123142/900X1280_HERNANDEZ.jpg?size=sm',
        },
      ];

      return data;
    } catch {
      return [];
    }
  };

  const getResults: () => Promise<CandidateResult[]> = async () => {
    try {
      // const data = await axios.get('/results');

      const data = [
        {
          fullName: 'Gustavo Petro',
          imageUrl:
            'http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQiUC9h-pr565uzUBY09vz6Atl7Bu3GSpCkqNapJHIBzSmrWtmsSJQeE1WAZZZ-3HMk',
          total: 1,
        },
        {
          fullName: 'Rodolfo Hernandez',
          imageUrl:
            'https://img.lalr.co/cms/2022/04/18123142/900X1280_HERNANDEZ.jpg?size=sm',
          total: 1,
        },
      ];

      return data;
    } catch {
      return [];
    }
  };

  const createCandidate: (
    data: CrateCandidateInterface
  ) => Promise<Response<any>> = async (data) => {
    try {
      // const data = axios.post('/vote', { ...data, status: 1 });
      if (Math.random() > 0.8) {
        const error = {
          errors: [
            {
              reason: 'EVT0009 - An error occurred saving the candidate.',
              domain:
                'http://localhost:8093/api/v1/electoral_votes/admin/create/candidate',
              code: 'EVT0009',
              message: 'An error occurred saving the candidate.',
            },
          ],
        };

        throw error;
      }

      return { success: true };
    } catch (e: any) {
      return {
        success: false,
        data: e,
      };
    }
  };

  const vote = async (data: { user: string; candidateId: number }) => {
    try {
      // const data = axios.post('/vote');
    } catch {}
  };

  const invalidateCandidate: (id: number) => Promise<Response<any>> = async (
    id
  ) => {
    try {
      if (Math.random() > 0.8) {
        const error = {
          errors: [
            {
              reason: 'EVT0010 - An error occurred disabling the candidate.',
              domain:
                'http://localhost:8093/api/v1/electoral_votes/admin/disable/candidate',
              code: 'EVT0010',
              message: 'An error occurred disabling the candidate.',
            },
          ],
        };

        throw error;
      }

      return { success: true };
    } catch (e: any) {
      return {
        success: false,
        data: e,
      };
    }
  };

  return {
    getCandidates,
    getResults,
    createCandidate,
    invalidateCandidate,
    vote,
  };
};

export const CandidateService = candidateService();
