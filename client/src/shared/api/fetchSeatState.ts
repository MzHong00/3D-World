import axios from "axios";

export const fetchLabtopZone = async () => {
  try {
    const digitalZoneSeat = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/api/seat-laptop`
    );

    return digitalZoneSeat.data;
  } catch (error) {
    throw error;
  }
};

export const fetchDigitalZone = async () => {
  try {
    const digitalZoneSeat = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/api/seat-digital`
    );

    return digitalZoneSeat.data;
  } catch (error) {
    throw error;
  }
};

export const fetchRoom1Zone = async () => {
  try {
    const digitalZoneSeat = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/api/seat-room1`
    );

    return digitalZoneSeat.data;
  } catch (error) {
    throw error;
  }
};

export const fetchRoom2Zone = async () => {
  try {
    const digitalZoneSeat = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/api/seat-room2`
    );

    return digitalZoneSeat.data;
  } catch (error) {
    throw error;
  }
};
