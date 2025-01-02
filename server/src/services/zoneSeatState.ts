import { type Request, type Response } from "express";
const postWsLibUrl = "https://library.wsu.ac.kr/Clicker/GetSeatObjects";

const zoneId = {
  노트북존: "20190508144137153",
  디지털존: "20190508154441173",
  제1열람실: "20190508155637616",
  제2열람실: "20190513132933529",
};

export const lapTopZoneCrawling = async (req: Request, res: Response) => {
  console.log("노트북존 요청");
  try {
    const response = await fetch(postWsLibUrl, {
      method: "POST",
      body: new URLSearchParams({
        strRoomId: zoneId["노트북존"],
        Cname: "userseat",
      }),
    });

    const result = await response.json();
    const seatStateDto = result._Model_lg_clicker_for_compact_object_list.map(
      (data: any) => ({
        number: data.l_seat_number,
        status: data.l_tooltip,
      })
    );

    res.send(seatStateDto);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Server Error");
  }
};

export const digitalZoneCrawling = async (req: Request, res: Response) => {
  console.log("디지털존 요청");
  try {
    const response = await fetch(postWsLibUrl, {
      method: "POST",
      body: new URLSearchParams({
        strRoomId: zoneId["디지털존"],
        Cname: "userseat",
      }),
    });
    console.log(response);

    const result = await response.json();
    const seatStateDto = result._Model_lg_clicker_for_compact_object_list.map(
      (data: any) => ({
        number: data.l_seat_number,
        status: data.l_tooltip,
      })
    );

    res.send(seatStateDto);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Server Error");
  }
};

export const firstReadingRoomCrawling = async (req: Request, res: Response) => {
  console.log("제1열람실 요청");
  try {
    const response = await fetch(postWsLibUrl, {
      method: "POST",
      body: new URLSearchParams({
        strRoomId: zoneId["제1열람실"],
        Cname: "userseat",
      }),
    });
    const result = await response.json();
    const seatStateDto = result._Model_lg_clicker_for_compact_object_list.map(
      (data: any) => ({
        number: data.l_seat_number,
        status: data.l_tooltip,
      })
    );

    res.send(seatStateDto);
  } catch (error) {
    throw error;
  }
};

export const secondReadingRoomCrawling = async (
  req: Request,
  res: Response
) => {
  console.log("제2열람실 요청");
  try {
    const response = await fetch(postWsLibUrl, {
      method: "POST",
      body: new URLSearchParams({
        strRoomId: zoneId["제2열람실"],
        Cname: "userseat",
      }),
    });
    const result = await response.json();
    const seatStateDto = result._Model_lg_clicker_for_compact_object_list.map(
      (data: any) => ({
        number: data.l_seat_number,
        status: data.l_tooltip,
      })
    );

    res.send(seatStateDto);
  } catch (error) {
    throw error;
  }
};
