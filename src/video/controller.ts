import {
    Controller, Get, Query, Route, Request,
    // Path,
} from "tsoa";

import VideoProcessingService from "./service";
import * as express from "express";
import * as validator from "./validator";
import { ExtractFrameParams } from "./params";
import { StatusCodes } from "http-status-codes";

@Route("ffmpeg")
export class VideoProccessorController extends Controller {
    @Get("image")
    public async extractFrameInBase64(
      @Query() url: string,
      @Query() timestamp: number,
      @Request() request: express.Request
    ) {
        const response = (<any>request).res as express.Response;
        try {
            const params: ExtractFrameParams = {
                videoUrl: url,
                timestamp
            }

            const result = validator.validateExtractFrameParams(params);
            if(!result.valid){
                this.setStatus(StatusCodes.BAD_REQUEST);
                response.json({
                    error: result.error
                });
                return;
            }

            this.setStatus(StatusCodes.OK);
            response.contentType("text/text");

            const data = await VideoProcessingService.extractFrameInBase64(params);
            response.send(data).end();
            return;
        } catch (error) {
            console.error(error);
            this.setStatus(StatusCodes.INTERNAL_SERVER_ERROR);
            response.end();
        }        
    }
}