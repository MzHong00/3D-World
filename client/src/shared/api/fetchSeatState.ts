import axios from "axios";

import { SeatStateDto, SeatStatus } from "shared/types/type";

const LAPTOP_SEAT_COUNT = 200;
const DIGITAL_SEAT_COUNT = 50;
const ROOM1_SEAT_COUNT = 180;
const ROOM2_SEAT_COUNT = 240;

export const fetchLabtopZone = async (): Promise<SeatStateDto[]> => {
  try {
    const digitalZoneSeat = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/api/seat-laptop`
    );

    return digitalZoneSeat.data;
  } catch (error) {
    return exampleSeatData(LAPTOP_SEAT_COUNT);
  }
};

export const fetchDigitalZone = async () => {
  try {
    const digitalZoneSeat = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/api/seat-digital`
    );

    return digitalZoneSeat.data;
  } catch (error) {
    return exampleSeatData(DIGITAL_SEAT_COUNT);
  }
};

export const fetchRoom1Zone = async () => {
  try {
    const digitalZoneSeat = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/api/seat-room1`
    );

    return digitalZoneSeat.data;
  } catch (error) {
    return exampleSeatData(ROOM1_SEAT_COUNT);
  }
};

export const fetchRoom2Zone = async () => {
  try {
    const digitalZoneSeat = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/api/seat-room2`
    );

    return digitalZoneSeat.data;
  } catch (error) {
    return exampleSeatData(ROOM2_SEAT_COUNT);
  }
};

const SEAT_PROBABILITY = 0.05;
const SEAT_STATUS: SeatStatus[] = ["사용 중", "배정가능"];

const exampleSeatData = (count: number) => {
  const seat: SeatStateDto[] = Array.from({
    length: count,
  }).map((_, i) => ({
    number: i+1,
    status: Math.random() < SEAT_PROBABILITY ? SEAT_STATUS[0] : SEAT_STATUS[1],
  }));

  return seat;
};
