import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
@ApiTags('root')
export class AppController {
  constructor(private readonly appService: AppService) {}


  @Get('/health')
  health(): string {
    return this.appService.getHealth();
  }
}
