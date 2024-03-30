import { Module } from '@nestjs/common';
import { InMemoryAlarmRepository } from './repositories/alarm.repository';
import { AlarmRepository } from 'src/alarms/application/ports/alram.repository';

@Module({
  imports: [],
  providers: [
    {
      provide: AlarmRepository,
      useClass: InMemoryAlarmRepository,
    },
  ],
  exports: [AlarmRepository],
})
export class InmemoryAlarmPersistenceModule {}
