import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAlarmsQuery } from './get-alarms.query';
import { Alarm } from '../../domain/alarm';
import { AlarmRepository } from '../ports/alram.repository';
import { Logger } from '@nestjs/common';

@QueryHandler(GetAlarmsQuery)
export class GetAlarmsQueryHandler
  implements IQueryHandler<GetAlarmsQuery, Alarm[]>
{
  private readonly logger = new Logger(GetAlarmsQueryHandler.name);
  // @dependency injection เพื่อให้สามารถเรียกใช้งาน AlarmRepository ได้ตาม business logic ที่กำหนด
  constructor(private readonly alarmRepositry: AlarmRepository) {}

  //   override execute function
  async execute(query: GetAlarmsQuery): Promise<Alarm[]> {
    this.logger.debug(`Processing query ${JSON.stringify(query)}`);
    return this.alarmRepositry.findAll();
  }
}
