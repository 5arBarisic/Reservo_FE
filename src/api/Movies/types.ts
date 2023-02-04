import {User} from "../Users/types";

export type Movie = {
    id: number;
    title: string;
    description: string;
    duration_min: number;
    currentRating: number;
    images: Images[];
    trailer: string;

};

export type MovieRequest = {
    title: string;
    description: string;
    duration_min: number | string;
    images: string[];
    trailer: string;
};
export type Images = {
    url: string;
}
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

};

export type Projection = {
    id: number;
    movie: Movie;
    screeningTime: string;
    auditorium: Auditorium;
    seats: Seat[];
};


export type ProjectionRequest = {
    screeningTime: string | undefined;
    auditoriumId: number | string;
    movieId: number | string;

}

export type ReservationSeat = {
    row: number;
    number: number;
}

export type Reservation = {
    movieProjectionId?: number;
    price?: number;
    userId?: number;
    loyaltyPoints?: number;
    seats?: ReservationSeat[];
}

export type ReservationResponse = {
    id: number;
    movieProjection: { id: number, movie: Movie, auditorium: Auditorium, screeningTime: string };
    price: number;
    user: User;
    seatDto: Seat[];
}

export type ReviewResponse = {
    id: number;
    rating: number;
    description: string;
    user: User;

}