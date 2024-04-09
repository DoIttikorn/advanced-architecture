import { Injectable } from '@nestjs/common';
import { AlarmRepository } from 'src/alarms/application/ports/alram.repository';
import { Alarm } from 'src/alarms/domain/alarm';
import { AlarmMapper } from '../mappers/alarm.mapper';
import { AlarmEntity } from '../entities/alarm.entity';

@Injectable()
export class InMemoryAlarmRepository extends AlarmRepository {
  private readonly alarms = new Map<string, AlarmEntity>();

  async findAll(): Promise<Alarm[]> {
    const entities = Array.from(this.alarms.values());
    return entities.map((item) => AlarmMapper.toDomain(item));
  }

  // save ไม่ได้เพราะว่า alarm ไม่ใช่ entity type ของ in-memory
  async save(alarm: Alarm): Promise<Alarm> {
    // ใช้ in-memory จึงต้องแปลงจาก domain model ไปเป็น entity ก่อน โดยการใช้ mapper
    const persistenceModel = AlarmMapper.toPersistence(alarm);
    // ใช้ id ของ entity เป็น key ในการเก็บข้อมูล
    this.alarms.set(persistenceModel.id, persistenceModel);

    // แปลง entity ที่เพิ่มเข้าไปใหม่ให้เป็น domain model ก่อน return
    const newEntity = this.alarms.get(persistenceModel.id);
    return AlarmMapper.toDomain(newEntity);
  }
}
