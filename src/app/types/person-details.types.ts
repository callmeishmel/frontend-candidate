export interface PersonDetails {
    id: string;
    name: string;
    favorite_color: string;
    quotes: { [key: string]: string[] };
}