import { Injectable } from '@nestjs/common';
import { CreateAlarmRepository } from 'src/alarms/application/ports/create-alram.repository';
import { Alarm } from 'src/alarms/domain/alarm';
import { Repository } from 'typeorm';
import { AlarmEntity } from '../entities/alarm.entity';
import { AlarmMapper } from '../mappers/alarm.mapper';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrmCreateAlarmRepository extends CreateAlarmRepository {
  constructor(
    @InjectRepository(AlarmEntity)
    private readonly alarmRepository: Repository<AlarmEntity>,
  ) {
    super();
  }

  async save(alarm: Alarm): Promise<Alarm> {
    // save ไม่ได้เพราะว่า alarm ไม่ใช่ entity type ของ typeorm
    // ดังนั้นต้องแปลงจาก domain model ไปเป็น entity ก่อน โดยการใช้ mapper
    // return await this.alarmRepository.save(alarm);
    const persistenceModel = AlarmMapper.toPersistence(alarm);
    const newEntity = await this.alarmRepository.save(persistenceModel);
    return AlarmMapper.toDomain(newEntity);
  }
}
