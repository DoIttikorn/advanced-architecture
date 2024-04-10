import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateAlarmCommand } from './create-alarm.command';
import { Logger } from '@nestjs/common';
import { AlarmFactory } from '../../domain/factories/alarm.factory';
import { CreateAlarmRepository } from '../ports/create-alram.repository';
import { AlarmCreatedEvent } from '../../domain/events/alarm-created.event';

@CommandHandler(CreateAlarmCommand)
export class CreateAlarmCommandHandler
  implements ICommandHandler<CreateAlarmCommand>
{
  constructor(
    private readonly alarmsRepository: CreateAlarmRepository,
    private readonly eventFactory: AlarmFactory,
    private readonly eventBus: EventBus,
  ) {}
  private readonly logger = new Logger(CreateAlarmCommandHandler.name);
  async execute(command: CreateAlarmCommand) {
    this.logger.debug(`Processing command ${JSON.stringify(command)}`);
    const alarm = this.eventFactory.create(
      command.name,
      command.severity,
      command.triggeredAt,
      command.items,
    );
    const newAlarm = await this.alarmsRepository.save(alarm);

    // This is not yet the best way to dispatch events
    // Domain events should be dispatched from the aggregate root, inside the domain layer.
    // We'll cover this in the upcoming lessons.
    this.eventBus.publish(new AlarmCreatedEvent(alarm));

    return newAlarm;
  }
}
