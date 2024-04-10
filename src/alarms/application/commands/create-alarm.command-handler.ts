import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateAlarmCommand } from './create-alarm.command';
import { Logger } from '@nestjs/common';
import { AlarmFactory } from '../../domain/factories/alarm.factory';
import { AlarmRepository } from '../ports/alram.repository';

@CommandHandler(CreateAlarmCommand)
export class CreateAlarmCommandHandler
  implements ICommandHandler<CreateAlarmCommand>
{
  constructor(
    private readonly alarmsRepository: AlarmRepository,
    private readonly eventFactory: AlarmFactory,
  ) {}
  private readonly logger = new Logger(CreateAlarmCommandHandler.name);
  async execute(command: CreateAlarmCommand) {
    this.logger.debug(`Processing command ${JSON.stringify(command)}`);
    const alarm = this.eventFactory.create(command.name, command.severity);
    return this.alarmsRepository.save(alarm);
  }
}
