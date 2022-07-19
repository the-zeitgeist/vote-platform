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
