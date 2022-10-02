export interface ApiResponseVO {
    success: boolean;
    message?: string;
    object?: Object | null;
    statusCode: number;
}
