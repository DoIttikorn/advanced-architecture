import { Injectable, Type } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { EventStore } from './ports/event-store';
import { VersionedAggregateRoot } from '../domain/aggregate-root';

@Injectable()
export class AggregateRehydrator {
  constructor(
    private readonly eventStore: EventStore,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async rehydrate<T extends VersionedAggregateRoot>(
    aggregateId: string,
    AggregateCls: Type<T>,
  ): Promise<T> {
    // Get all events for the aggregate
    const events = await this.eventStore.getEventsByStreamId(aggregateId);

    // Create a new instance of the aggregate
    const AggregateClsWithDispatcher =
      this.eventPublisher.mergeClassContext(AggregateCls);
    const aggregate = new AggregateClsWithDispatcher(aggregateId);
    // Load the aggregate from the history
    aggregate.loadFromHistory(events);

    return aggregate;
  }
}
