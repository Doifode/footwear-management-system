export interface apiResponse<T> {
    data?: T,
    message: string,
    success: boolean
}