import puppeteer from 'puppeteer'
import * as cheerio from 'cheerio';

export default async (url: string, selector: string) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    const status = await page.goto(url, {timeout: 0});

    const content = await page.content();
    const $ = cheerio.load(content);
    const seatListState = $(selector) as cheerio.Cheerio<cheerio.Element>;

    let seatStatus: Array<Object> = [];
    seatListState.map((idx, seat) => {
        const seatState = {
            number: idx+1,
            status: seat.attribs.title
        }

        seatStatus.push(seatState);
    })

    await browser.close(); // 브라우저 종료

    return seatStatus;
}