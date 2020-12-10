/**
 * Core module
 */

import { Module } from '@nestjs/common';
import { CommunicationModule } from './communication/communication.module';
import { WorkflowStateModule } from './workflow-state/workflow-state.module';
import { WorkflowStorageModule } from './workflow-storage/workflow-storage.module';
import { LoggerModule } from './logger/logger.module';

@Module({
    imports: [CommunicationModule, WorkflowStateModule, WorkflowStorageModule, LoggerModule],
    controllers: [],
    providers: [],
})
export class AppModule { }
