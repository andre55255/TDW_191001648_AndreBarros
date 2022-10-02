import { ApiResponseVO } from "../viewObjects/utils/APIResponseVO";
import { ResultVO } from "../viewObjects/utils/ResultVO";

export function buildApiResponse(
    success: boolean,
    statusCode: number,
    message?: string | any,
    object?: Object | null
): ApiResponseVO {
    const apiResponse: ApiResponseVO = {
        success,
        statusCode,
        message,
        object,
    };

    return apiResponse;
}

export function buildResult(
    success: boolean,
    message: string,
    object?: Object | null
): ResultVO {
    const resultDto: ResultVO = {
        success,
        message,
        object,
    };

    return resultDto;
}
