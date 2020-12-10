/**
 * etcd adapter
 */

/* 3rd-party modules */
import { Etcd3, IOptions as Etcd3Options } from 'etcd3';
/* Application modules */
import { ConfigAdapter } from './config-adapter.service';


/**
 * etcd adpter config
 */
export type EtcdAdapterOptions = {

    /**
     * Configuration keys prefix
     */
    prefix: string,

    /**
     * etcd client options
     */
    client?: Etcd3Options,
}

/**
 * Default configuration
 */
export const etcdAdapterDefaultOptions: EtcdAdapterOptions = {

    prefix: 'KeenDev.ProjectParticle.',
}

export class EctdAdapter implements ConfigAdapter {

    /**
     * Options
     */
    protected readonly options: EtcdAdapterOptions;

    /**
     * etcd config
     */
    protected readonly client: Etcd3;

    /**
     * etcd adapter
     * @param options ETCD provider options
     */
    constructor(

        options: EtcdAdapterOptions = etcdAdapterDefaultOptions

    ) {

        if (!options) {

        }

        this.options = options;
        this.client = new Etcd3(options.client);
    }

    async load<T>(moduleName: string, defaultValue?: T): Promise<T | undefined> {

        const configKey = this.options.prefix ? `${this.options.prefix}${moduleName}` : moduleName;
        const configValue = await this.client.get(configKey).string('utf-8');

        return configValue ? JSON.parse(configValue) : defaultValue ? defaultValue : undefined;
    }
}
