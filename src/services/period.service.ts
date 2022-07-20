import { axiosInstance as axios } from '../axios';
import { notifySuccess, notifyError } from './notify.service';
import { Period, PeriodData, Response } from '../models';

const periodService = () => {
  const getPeriods: () => Promise<PeriodData[]> = async () => {
    try {
      const { data } = await axios.get('/general/election_periods');

      return data;
    } catch (e: any) {
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
        data: {
          ...data,
          start_date: data.initialDate,
          end_date: data.finalDate,
          status: 1,
        },
      });

      notifySuccess('Created');

      return { success: true };
    } catch (e: any) {
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
        url: `/admin/disable/election_period/${id}`,
      });

      notifySuccess('Invalidated');

      return { success: true };
    } catch (e: any) {
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
