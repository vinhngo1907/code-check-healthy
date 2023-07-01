import path from "path";
import { isURL } from "../common/utils/http";
import { isPositiveInteger } from "../common/utils/math";

interface fieldvalidator {
    fieldName: string;
    validate: (field: any) => boolean;
    message: string
}

interface validatorResult {
    valid: boolean;
    error: string;
}

const VIDEO_EXTENSSION = {
    MP4: "mp4",
    WEBM: "webm"
}

const validateExtractFrameParams = (params: any): validatorResult => {
    const validators: fieldvalidator[] = [
        {
            fieldName: "videoUrl",
            validate: (url: string) => {
                const extname = path.extname(url);
                return (
                    isURL(url) && (extname.endsWith(VIDEO_EXTENSSION.MP4) || extname.endsWith(VIDEO_EXTENSSION.WEBM))
                );
            },
            message: "Invalid video URL"
        },
        {
            fieldName: "timestamp",
            validate: isPositiveInteger,
            message: "Timestamp is not a positive integer"
        }
    ];

    for (const validator of validators) {
        if (!validator.validate(params[validator.fieldName])) {
            return {
                valid: false,
                error: `Error validating ${validator.fieldName}: ${validator.message}`
            }
        }
    };

    return {
        valid: true,
        error: ""
    };
}

export { validateExtractFrameParams };