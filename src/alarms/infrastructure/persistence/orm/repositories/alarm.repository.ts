import { Injectable } from '@nestjs/common';
import { AlarmRepository } from 'src/alarms/application/ports/alram.repository';
import { Alarm } from 'src/alarms/domain/alarm';
import { Repository } from 'typeorm';
import { AlarmEntity } from '../entities/alarm.entity';
import { AlarmMapper } from '../mappers/alarm.mapper';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrmAlarmRepository extends AlarmRepository {
  constructor(
    @InjectRepository(AlarmEntity)
    private readonly alarmRepository: Repository<AlarmEntity>,
  ) {
    super();
  }

  async findAll(): Promise<Alarm[]> {
    const entities = await this.alarmRepository.find();
    return entities.map((item) => AlarmMapper.toDomain(item));
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
