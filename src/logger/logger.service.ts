import { Injectable } from "@nestjs/common";

@Injectable()
export class LoggerService {

    constructor() {

        setInterval(
            () => console.log('[RUNNING]'),
            1000
        );
    }
}