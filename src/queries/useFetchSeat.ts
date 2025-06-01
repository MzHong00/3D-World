import { queryOptions } from "@tanstack/react-query";
import {
  fetchDigitalZone,
  fetchLabtopZone,
  fetchRoom1Zone,
  fetchRoom2Zone,
} from "shared/api/fetchSeatState";

export class SeatQueries {
  static fetchLabtopZoneOptions() {
    return queryOptions({
      queryKey: ["labtop"],
      queryFn: () => fetchLabtopZone(),
    });
  }

  static fetchDigitalZoneOptions() {
    return queryOptions({
      queryKey: ["digital"],
      queryFn: () => fetchDigitalZone(),
    });
  }

  static fetchRoom1ZoneOptions() {
    return queryOptions({
      queryKey: ["room1"],
      queryFn: () => fetchRoom1Zone(),
    });
  }

  static fetchRoom2ZoneOptions() {
    return queryOptions({
      queryKey: ["room2"],
      queryFn: () => fetchRoom2Zone(),
    });
  }
}
