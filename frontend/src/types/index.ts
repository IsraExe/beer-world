export interface FetchOptions {
    method: string;
    headers?: {
        'Cookie'?: string;
        'Content-Type'?: string;
        'Authorization'?: string;
    };
    body?: string;
    credentials?: 'include';
    signal?: AbortSignal | undefined;
}

export type BeerInfo = {
    "tap_id": number,
    "price_ml": number,
    "beer_id": number,
    "beer_name": string,
    "beer_style": string,
    "beer_ibu": number,
    "beer_alcohol": number,
    "beer_description": string,
    "beer_image": string,
    "brewery": string,
    "brewery_image": string
}