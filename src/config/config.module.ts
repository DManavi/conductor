/**
 * Configuration module
 */

/* Built-in modules */
import { readFileSync, existsSync } from 'fs';
import { resolve as resolvePath, join as joinPath } from 'path';
/* 3rd-party modules */
import { Module } from '@nestjs/common';
import { get as env } from 'env-var';
/* Application modules */
import { ConfigAdapter } from './config-adapter.service';
import { EctdAdapter, etcdAdapterDefaultOptions } from './etcd.service';
import { NullAdapter } from './null.service';


@Module({

    providers: [
        {
            provide: ConfigAdapter,
            useFactory: async () => {

                // retrieve provider name
                const providerName = env('PARTICLE_CONDUCTOR_CONFIG_PROVIDER').required().asEnum(['etcd', 'null']);

                switch (providerName) {

                    // etcd provider
                    case 'etcd': {

                        // retrieve
                        const optionsFilePath = env('PARTICLE_CONDUCTOR_CONFIG_ETCD_OPTIONS_FILE_PATH').asString();
                        let ectdOptions: any | undefined = undefined;

                        // check file existence
                        if (existsSync(optionsFilePath)) {

                            // read file content
                            const optionsFileContent = readFileSync(
                                resolvePath(joinPath(optionsFilePath)),
                                'utf-8'
                            );

                            // try parsing JSON content
                            ectdOptions = JSON.parse(optionsFileContent);
                        }

                        return new EctdAdapter({
                            ...etcdAdapterDefaultOptions,
                            ...(ectdOptions || {})
                        });
                    }

                    // null adapter (testing purpose)
                    case 'null': {

                        return new NullAdapter();
                    }

                    // unknown provider
                    default:
                        throw new Error('NotImplemented');
                }
            },
        },
    ],

    exports: [ConfigAdapter]
})
export class ConfigModule { }
