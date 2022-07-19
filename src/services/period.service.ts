import { axiosInstance as axios } from '../axios';
import { notifySuccess, notifyError } from './notify.service';
import { Period, PeriodData, Response } from '../models';

const periodService = () => {
  const getPeriods: () => Promise<PeriodData[]> = async () => {
    try {
      const { data } = await axios.get('/general/election_periods');

      return data;
    } catch (e: any) {
      // TODO: delete when connected
      if (Math.random() > 0.1) {
        return [
          {
            id: 1,
            initialDate: '2022-06-29T00:00:00.000',
            finalDate: '2022-07-29T23:59:59.999',
            name: 'ELECTION PERIOD 2022-2',
          },
        ];
      }

      notifyError();

      return [];
    }
  };

  const createPeriod: (data: Period) => Promise<Response<any>> = async (
    data
  ) => {
    try {
      await axios({
        method: 'post',
        url: '/admin/create/election_period',
        data: { ...data, status: 1 },
      });

      notifySuccess('Created');

      return { success: true };
    } catch (e: any) {
      // TODO: delete when connected
      if (Math.random() > 0.3) {
        notifySuccess('Created');
        return { success: true };
      }

      notifyError();

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
      await axios({
        method: 'put',
        url: `/admin/disable/election_period`,
        data: {
          id,
        },
      });

      notifySuccess('Invalidated');

      return { success: true };
    } catch (e: any) {
      // TODO: delete when connected
      if (Math.random() > 0.8) {
        notifySuccess('Invalidated');
        return { success: true };
      }

      notifyError();

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
