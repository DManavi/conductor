/**
 * Configuration adapter
 */

export abstract class ConfigAdapter {

    /**
     * Load configuration for a specific module
     * @param moduleName Name of the module
     */
    abstract load<T>(moduleName: string): Promise<T>;
}
