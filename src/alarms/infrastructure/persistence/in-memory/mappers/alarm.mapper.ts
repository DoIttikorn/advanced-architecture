import { AlarmSeverity } from 'src/alarms/domain/value-objects/alarm-severity';
import { AlarmEntity } from '../entities/alarm.entity';
import { Alarm } from 'src/alarms/domain/alarm';

// เพื่อให้เราสามารถแปลงระหว่าง domain model กับ entity ของ typeorm ได้
// for convert between domain model and entity of typeorm
export class AlarmMapper {
  // แปลงจาก entity ของ typeorm ไปเป็น domain model
  // convert entity to domain model
  static toDomain(alarmEntity: AlarmEntity): Alarm {
    const alarmServerity = new AlarmSeverity(
      alarmEntity.severity as 'critical' | 'high' | 'medium' | 'low',
    );
    const alarmModel = new Alarm(
      alarmEntity.id,
      alarmEntity.name,
      alarmServerity,
    );
    return alarmModel;
  }

  // แปลงจาก domain model ไปเป็น entity ของ typeorm
  // convert domain model to entity
  static toPersistence(alarm: Alarm): AlarmEntity {
    const alarmEntity = new AlarmEntity();
    alarmEntity.id = alarm.id;
    alarmEntity.name = alarm.name;
    alarmEntity.severity = alarm.severity.value;
    return alarmEntity;
  }
}
