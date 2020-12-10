/**
 * Debug mode
 */

/* Built-in modules */
import { join as joinPath, resolve as resolvePath } from 'path';
/* Application modules */
import { config as loadEnv } from 'dotenv';

loadEnv({
    path: resolvePath(
        joinPath(
            process.cwd(),
            '.env'
        )
    )
});

// load the main application file
import './main';
