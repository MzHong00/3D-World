import { useQuery } from "@tanstack/react-query"
import { fetchDigitalZone, fetchLabtopZone, fetchRoom1Zone, fetchRoom2Zone } from "shared/api/fetchSeatState"

export const useFetchLabtopZone = () => {
    return useQuery({
        queryKey: ['labtop'],
        queryFn: () => fetchLabtopZone(),
        refetchInterval: 10000,
        staleTime: 10000
    })
}
export const useFetchDigitalZone = () => {
    return useQuery({
        queryKey: ['digital'],
        queryFn: () => fetchDigitalZone(),
        refetchInterval: 10000,
        staleTime: 10000
    })
}
export const useFetchRoom1Zone = () => {
    return useQuery({
        queryKey: ['room1'],
        queryFn: () => fetchRoom1Zone()
    })
}
export const useFetchRoom2Zone = () => {
    return useQuery({
        queryKey: ['room2'],
        queryFn: () => fetchRoom2Zone()
    })
}