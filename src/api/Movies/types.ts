export type Movie = {
    id: number;
    title: string;
    description:string;
    duration_min:number;
    currentRating: number;

};

export type Projection = {
    id: number;
    movie: Movie;
    screeningTime: string;
};