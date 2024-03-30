import { Module } from '@nestjs/common';
import { InmemoryAlarmPersistenceModule } from './in-memory/in-memory-persistence.module';
import { OrmAlarmPersistenceModule } from './orm/orm-persistence.module';

@Module({})
export class AlarmsInfrastructureModule {
  static use(dive: 'orm' | 'in-memory') {
    const persistenceModule =
      dive === 'orm'
        ? OrmAlarmPersistenceModule
        : InmemoryAlarmPersistenceModule;

    return {
      module: AlarmsInfrastructureModule,
      imports: [persistenceModule],
      exports: [persistenceModule],
    };
  }
}
