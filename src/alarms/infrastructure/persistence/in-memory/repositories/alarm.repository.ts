import { Injectable } from '@nestjs/common';
import { CreateAlarmRepository } from 'src/alarms/application/ports/create-alram.repository';
import { Alarm } from 'src/alarms/domain/alarm';
import { AlarmMapper } from '../mappers/alarm.mapper';
import { AlarmEntity } from '../entities/alarm.entity';
import { UpsertMaterializedAlarmRepository } from '../../../../application/ports/upsert-materialized-alarm.repository';
import { FindAlarmRepository } from '../../../../application/ports/find-alarm.repository';
import { AlarmReadModel } from '../../../../domain/read-models/alarm.read-model';

@Injectable()
export class InMemoryAlarmRepository
  implements
    CreateAlarmRepository,
    UpsertMaterializedAlarmRepository,
    FindAlarmRepository
{
  private readonly alarms = new Map<string, AlarmEntity>();
  private readonly materializedAlarmViews = new Map<string, AlarmReadModel>();

  async findAll(): Promise<AlarmReadModel[]> {
    return Array.from(this.materializedAlarmViews.values());
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

  async upsert(
    alarm: Pick<AlarmReadModel, 'id'> & Partial<AlarmReadModel>,
  ): Promise<void> {
    if (this.materializedAlarmViews.has(alarm.id)) {
      this.materializedAlarmViews.set(alarm.id, {
        ...this.materializedAlarmViews.get(alarm.id),
        ...alarm,
      });
      return;
    }
    this.materializedAlarmViews.set(alarm.id, alarm as AlarmReadModel);
  }
}
