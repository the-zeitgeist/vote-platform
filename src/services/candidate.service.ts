import { CandidateData, CandidateResult, Response } from '../models';
import { notifySuccess, notifyError } from './notify.service';
import { axiosInstance as axios } from '../axios';

export interface CrateCandidateInterface {
  full_name: string;
  image_url: string;
}

const candidateService = () => {
  const getCandidates: () => Promise<CandidateData[]> = async () => {
    try {
      const { data }: { data: CandidateData[] } = await axios.get(
        '/general/candidates'
      );

      return data;
    } catch {
      // TODO: delete when connected

      if (Math.random() > 0.1) {
        return [
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
      }
      notifyError();

      return [];
    }
  };

  const getResults: () => Promise<CandidateResult[]> = async () => {
    try {
      const { data }: { data: CandidateResult[] } = await axios.get(
        '/general/results'
      );

      return data;
    } catch {
      // TODO: delete when connected
      if (Math.random() > 0.1) {
        return [
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
      }

      notifyError();

      return [];
    }
  };

  const createCandidate: (
    data: CrateCandidateInterface
  ) => Promise<Response<any>> = async (data) => {
    try {
      await axios({
        method: 'post',
        url: '/admin/create/candidate',
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

  const vote = async ({
    user,
    candidateId,
  }: {
    user: string;
    candidateId: number;
  }) => {
    try {
      await axios({
        method: 'post',
        url: '/user/vote',
        data: {
          user,
          candidateId,
        },
      });

      notifySuccess('Voted');

      return { success: true };
    } catch (e: any) {
      // TODO: delete when connected
      if (Math.random() > 0.1) {
        notifySuccess('Voted');
        return { success: true };
      }

      notifyError();

      return {
        success: false,
        data: e,
      };
    }
  };

  const invalidateCandidate: (id: number) => Promise<Response<any>> = async (
    id
  ) => {
    try {
      await axios({
        method: 'put',
        url: `/admin/disable/candidate/${id}`,
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
    getCandidates,
    getResults,
    createCandidate,
    invalidateCandidate,
    vote,
  };
};

export const CandidateService = candidateService();
