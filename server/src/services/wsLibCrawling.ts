import { type Request, type Response } from "express"
import Crawler from 'loaders/wsLibCrawler';

const zone = {
    '노트북존': 'https://library.wsu.ac.kr/Clicker/UserSeat/20190508144137153?DeviceName=normal',
    '디지털존': 'https://library.wsu.ac.kr/Clicker/UserSeat/20190508154441173?DeviceName=normal',
    '제1열람실': 'https://library.wsu.ac.kr/Clicker/UserSeat/20190508155637616?DeviceName=normal',
    '제2열람실': 'https://library.wsu.ac.kr/Clicker/UserSeat/20190513132933529?DeviceName=normal',
}
const selector = 'div.clicker_s_o'

export const lapTopZoneCrawling = async (req: Request, res: Response) => {
    try {
        console.log("노트북존 요청");
        
        const seatStatus = await Crawler(zone['노트북존'], selector);

        res.send(seatStatus)
    } catch (error) {
        throw error
    }
}

export const digitalZoneCrawling = async (req: Request, res: Response) => {
    try {
        console.log("디지털존 요청");
        const seatStatus = await Crawler(zone['디지털존'], selector);

        res.send(seatStatus)
    } catch (error) {
        throw error
    }
}

export const firstReadingRoomCrawling = async (req: Request, res: Response) => {
    try {
        const seatStatus = await Crawler(zone['제1열람실'], selector);

        res.send(seatStatus)
    } catch (error) {
        throw error
    }
}

export const secondReadingRoomCrawling = async (req: Request, res: Response) => {
    try {
        const seatStatus = await Crawler(zone['제2열람실'], selector);

        res.send(seatStatus)
    } catch (error) {
        throw error
    }
}

