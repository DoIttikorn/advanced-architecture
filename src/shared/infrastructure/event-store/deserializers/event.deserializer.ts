import { Injectable, Type } from '@nestjs/common';
import { SerializableEvent } from '../../../domain/interfaces/serializable-event';
import { Event } from '../schemas/event.schema';
// import { AlarmCreatedEvent } from '../../../../alarms/domain/events/alarm-created.event';
import { EventClsRegistry } from '../event-cls.registry';

@Injectable()
export class EventDeserializer {
  // mapping of event types to data objects
  deserialize<T>(event: Event): SerializableEvent<T> {
    const eventCls = this.getEventClassByType(event.type);
    return {
      ...event,
      data: this.instantiateSerializedEvent(eventCls, event.data),
    };
  }

  getEventClassByType(type: string) {
    // // We'll show a more scalable approach later
    // switch (type) {
    //   case AlarmCreatedEvent.name:
    //     return AlarmCreatedEvent;
    // }

    // มันจะเป็นการเรียกใช้งาน EventClsRegistry ที่เราสร้างไว้
    return EventClsRegistry.get(type);
  }

  instantiateSerializedEvent<T extends Type>(
    eventCls: T,
    data: Record<string, any>,
  ) {
    return Object.assign(Object.create(eventCls.prototype), data);
  }
}
