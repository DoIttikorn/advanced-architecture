import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateAlarmCommand } from './create-alarm.command';
import { Logger } from '@nestjs/common';
import { AlarmFactory } from '../../domain/factories/alarm.factory';

@CommandHandler(CreateAlarmCommand)
export class CreateAlarmCommandHandler
  implements ICommandHandler<CreateAlarmCommand>
{
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly eventFactory: AlarmFactory,
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
    // aggregate sentence around using apply message of the aggregate to apply the event to the aggregate
    this.eventPublisher.mergeObjectContext(alarm);
    alarm.commit();
    return alarm;
  }
}
