import { Module } from '@nestjs/common';
import { InMemoryAlarmRepository } from './repositories/alarm.repository';
import { CreateAlarmRepository } from 'src/alarms/application/ports/create-alram.repository';
import { FindAlarmRepository } from '../../../application/ports/find-alarm.repository';
import { UpsertMaterializedAlarmRepository } from '../../../application/ports/upsert-materialized-alarm.repository';

@Module({
  imports: [],
  providers: [
    InMemoryAlarmRepository,
    {
      provide: CreateAlarmRepository,
      useExisting: InMemoryAlarmRepository,
    },
    {
      provide: FindAlarmRepository,
      useExisting: InMemoryAlarmRepository,
    },
    {
      provide: UpsertMaterializedAlarmRepository,
      useExisting: InMemoryAlarmRepository,
    },
  ],
  exports: [
    CreateAlarmRepository,
    FindAlarmRepository,
    UpsertMaterializedAlarmRepository,
  ],
})
export class InmemoryAlarmPersistenceModule {}
