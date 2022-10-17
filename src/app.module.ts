import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DishesModule } from './dishes/dishes.module';
import { UsersModule } from './users/users.module';
import { SharedModule } from './shared/shared.module';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    DishesModule,
    UsersModule,
    SharedModule,
    LoggerModule.forRoot({
      pinoHttp: {
        transport: { target: 'pino-pretty' },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
