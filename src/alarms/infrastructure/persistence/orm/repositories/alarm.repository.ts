import { Injectable } from '@nestjs/common';
import { AlarmRepository } from 'src/alarms/application/ports/alram.repository';
import { Alarm } from 'src/alarms/domain/alarm';
import { Repository } from 'typeorm';
import { AlarmEntity } from '../entities/alarm.entity';

@Injectable()
export class OrmAlarmRepository extends AlarmRepository {
  constructor(
    @InjectRepository(AlarmEntity)
    private readonly alarmRepository: Repository<AlarmEntity>,
  ) {}

  async findAll(): Promise<Alarm[]> {
    return await this.alarmRepository.find();
  }

  async save(alarm: Alarm): Promise<Alarm> {
    // save ไม่ได้เพราะว่า alarm ไม่ใช่ entity ของ typeorm
    // ดังนั้นต้องแปลงจาก domain model ไปเป็น entity ก่อน โดยการใช้ mapper
    // return await this.alarmRepository.save(alarm);
    return await this.alarmRepository.save(alarm);
  }
}
