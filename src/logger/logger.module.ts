import { Module } from '@nestjs/common';
import { loggerProviders } from './logger.provider';

@Module({
  providers: [...loggerProviders],
  exports: [...loggerProviders],
})
export class LoggerModule {}
