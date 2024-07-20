export interface FetchOptions {
    method: string;
    headers?: {
        'Cookie'?: string;
        'Content-Type'?: string;
    };
    body?: string;
    credentials?: 'include';
    signal?: AbortSignal | undefined;
}
