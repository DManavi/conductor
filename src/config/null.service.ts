/**
 * Null adapter
 */

/* Application modules */
import { ConfigAdapter } from './config-adapter.service';


export class NullAdapter implements ConfigAdapter {

    async load<T>(moduleName: string, defaultValue?: T): Promise<T | undefined> {
        return defaultValue;
    }
}

