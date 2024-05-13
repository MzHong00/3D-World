export interface Coordinate { x: number, z: number }

export interface SeatStateDto { number: number, status: string }

export interface SeatState extends Coordinate { seat: SeatStateDto }

export interface CharSpeed { xSpeed: number, ySpeed: number}