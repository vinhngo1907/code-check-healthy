import { extractFrame } from "./processor";

import { ExtractFrameParams } from "./params";

export default class VideoProcessingService {
    public static async extracFrameInBase64(params: ExtractFrameParams): Promise<string> {
        const buffers: Buffer = await extractFrame(params);
        const base64 = buffers.toString("base64");
        return base64;
    }
}