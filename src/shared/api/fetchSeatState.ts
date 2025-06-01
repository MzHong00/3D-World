import { SeatStateDto, SeatStatus } from "shared/types/type";

const LAPTOP_SEAT_COUNT = 200;
const DIGITAL_SEAT_COUNT = 50;
const ROOM1_SEAT_COUNT = 180;
const ROOM2_SEAT_COUNT = 240;

const SEAT_PROBABILITY = 0.05;
const SEAT_STATUS: SeatStatus[] = ["사용 중", "배정가능"];

// 우송 도서관에서 요청하는 데이터를 가져다 썼는데 최근에 막혀서 임시 데이터를 제공하는 방식으로 수정
export const fetchLabtopZone = async (): Promise<SeatStateDto[]> => {
  return exampleSeatData(LAPTOP_SEAT_COUNT);
};

export const fetchDigitalZone = async () => {
  return exampleSeatData(DIGITAL_SEAT_COUNT);
};

export const fetchRoom1Zone = async () => {
  return exampleSeatData(ROOM1_SEAT_COUNT);
};

export const fetchRoom2Zone = async () => {
  return exampleSeatData(ROOM2_SEAT_COUNT);
};

const exampleSeatData = (count: number) => {
  const seat: SeatStateDto[] = Array.from({
    length: count,
  }).map((_, i) => ({
    number: i + 1,
    status: Math.random() < SEAT_PROBABILITY ? SEAT_STATUS[0] : SEAT_STATUS[1],
  }));

  return seat;
};
