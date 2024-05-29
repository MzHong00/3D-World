export interface Coordinate { x: number, z: number }

export interface SeatStateDto { number: number, status: string }

export interface SeatState extends Coordinate { seat: SeatStateDto }

export interface CharSpeed { xSpeed: number, ySpeed: number}

export interface ChatDto { userId: string, time: string, chat: string }

export interface Area {
    name: string
    bgUrl: string
    floor: string
}