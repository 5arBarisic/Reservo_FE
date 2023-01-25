export type Movie = {
    id: number;
    title: string;
    description: string;
    duration_min: number;
    currentRating: number;

};
export type Seat = {
    id: number;
    row: number;
    number: number;
    seatType: { id: number, type: string }
    price: number;
    reserved: number;
}

export type Auditorium = {
    id: number;
    name: string;
    seatsNo: number;
    timestamp: string;

};

export type Projection = {
    id: number;
    movie: Movie;
    screeningTime: string;
    auditorium: Auditorium;
    seats: Seat[];
};
export type ReservationSeat = {
    row: number;
    number: number;
}

export type Reservation = {
    movieProjectionId?: number;
    price?: number;
    userId?: number;
    seats?: ReservationSeat[];


}