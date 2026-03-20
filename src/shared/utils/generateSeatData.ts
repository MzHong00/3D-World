import { SeatStateDto } from "shared/types/type";

const SEAT_PROBABILITY = 0.05;

export const generateSeatData = (count: number): SeatStateDto[] =>
  Array.from({ length: count }).map((_, i) => ({
    number: i + 1,
    status: Math.random() < SEAT_PROBABILITY ? "사용 중" : "배정가능",
  }));
