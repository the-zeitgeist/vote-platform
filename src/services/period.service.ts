// import axios from "axios";

import { Period, PeriodData, Response } from '../models';

const periodService = () => {
  const getPeriods: () => Promise<PeriodData[]> = async () => {
    // const data = await axios.get('/candidates');

    const data = [
      {
        id: 1,
        initialDate: '2022-06-29 00:00:00.000',
        finalDate: '2022-07-29 23:59:59.999',
        name: 'ELECTION PERIOD 2022-2',
      },
    ];

    return data;
  };

  const createPeriod: (data: Period) => Promise<Response<any>> = async (
    data
  ) => {
    try {
      // const data = axios.post('/period', { ...data, status: 1 });
      if (Math.random() > 0.8) {
        const error = {
          errors: [
            {
              reason: 'EVT0011 - An error occurred saving the election period.',
              domain:
                'http://localhost:8093/api/v1/electoral_votes/admin/create/candidate',
              code: 'EVT0011',
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

  const invalidatePeriod: (id: number) => Promise<Response<any>> = async (
    id
  ) => {
    try {
      // const data = axios.post('/invalidate', { id });
      if (Math.random() > 0.8) {
        const error = {
          errors: [
            {
              reason:
                'EVT0012 - An error occurred disabling the election period.',
              domain:
                'http://localhost:8093/api/v1/electoral_votes/admin/disable/candidate',
              code: 'EVT0010',
              message: 'An error occurred disabling the election period.',
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
    getPeriods,
    createPeriod,
    invalidatePeriod,
  };
};

export const PeriodService = periodService();
