import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAlarmsQuery } from './get-alarms.query';
import { Logger } from '@nestjs/common';
import { FindAlarmRepository } from '../ports/find-alarm.repository';
import { AlarmReadModel } from '../../domain/read-models/alarm.read-model';

@QueryHandler(GetAlarmsQuery)
export class GetAlarmsQueryHandler
  implements IQueryHandler<GetAlarmsQuery, AlarmReadModel[]>
{
  private readonly logger = new Logger(GetAlarmsQueryHandler.name);
  // @dependency injection เพื่อให้สามารถเรียกใช้งาน AlarmRepository ได้ตาม business logic ที่กำหนด
  constructor(private readonly alarmRepositry: FindAlarmRepository) {}

  //   override execute function
  async execute(query: GetAlarmsQuery): Promise<AlarmReadModel[]> {
    this.logger.debug(`Processing query ${JSON.stringify(query)}`);
    return this.alarmRepositry.findAll();
  }
}
