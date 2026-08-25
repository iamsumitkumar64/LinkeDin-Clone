import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  async getHello() {
    await fetch('https://birwal-kart.onrender.com');
    return this.appService.getHello();
  }
}
