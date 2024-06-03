import { useQuery } from "@tanstack/react-query";
import {
  fetchDigitalZone,
  fetchLabtopZone,
  fetchRoom1Zone,
  fetchRoom2Zone,
} from "shared/api/fetchSeatState";

const staleTime = 30000;

export const useFetchLabtopZone = () => {
  return useQuery({
    queryKey: ["labtop"],
    queryFn: () => fetchLabtopZone(),
    refetchInterval: staleTime,
    staleTime: staleTime,
  });
};

export const useFetchDigitalZone = () => {
  return useQuery({
    queryKey: ["digital"],
    queryFn: () => fetchDigitalZone(),
    refetchInterval: staleTime,
    staleTime: staleTime,
  });
};

export const useFetchRoom1Zone = () => {
  return useQuery({
    queryKey: ["room1"],
    queryFn: () => fetchRoom1Zone(),
    refetchInterval: staleTime,
    staleTime: staleTime,
  });
};

export const useFetchRoom2Zone = () => {
  return useQuery({
    queryKey: ["room2"],
    queryFn: () => fetchRoom2Zone(),
    refetchInterval: staleTime,
    staleTime: staleTime,
  });
};
