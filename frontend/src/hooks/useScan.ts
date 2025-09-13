import { useQuery, useMutation, useQueryClient } from 'react-query';
import { scanApi } from '../services/api';

export const useScans = () => {
  return useQuery('scans', scanApi.getScans, {
    refetchInterval: 5000,
  });
};

export const useScan = (id: string) => {
  return useQuery(['scan', id], () => scanApi.getScan(id), {
    enabled: !!id,
    refetchInterval: 3000,
  });
};

export const useCreateScan = () => {
  const queryClient = useQueryClient();
  
  return useMutation(scanApi.createScan, {
    onSuccess: () => {
      queryClient.invalidateQueries('scans');
    },
  });
};

export const useDeleteScan = () => {
  const queryClient = useQueryClient();
  
  return useMutation(scanApi.deleteScan, {
    onSuccess: () => {
      queryClient.invalidateQueries('scans');
    },
  });
};