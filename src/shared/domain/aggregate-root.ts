import { AggregateRoot } from '@nestjs/cqrs';
import { Version } from './value-objects/version';
import { SerializableEvent } from './interfaces/serializable-event';

const VERSION = Symbol('version');

// AggregateRoot is a base class for domain objects that are not just simple data objects, but have a lifecycle, and can be the root of an aggregate.
// AggregateRoot คือ คลาสหลักสำหรับวัตถุในโดเมนที่ไม่ใช่เพียงแค่วัตถุข้อมูล แต่มีวงจรชีวิต และสามารถเป็นรากของกลุ่มข้อมูลได้
export class VersionedAggregateRoot extends AggregateRoot {
  public id: string;

  private [VERSION] = new Version(0);

  get version(): Version {
    return this[VERSION];
  }

  // MARK
  loadFromHistory(history: SerializableEvent[]): void {
    const domainEvents = history.map((event) => event.data);
    super.loadFromHistory(domainEvents);

    const lastEvent = history[history.length - 1];
    this.setVersion(new Version(lastEvent.position));
  }

  private setVersion(version: Version): void {
    this[VERSION] = version;
  }
}
