import { Controller, Post, Redirect, Sse } from '@nestjs/common';
import { AppService } from './app.service';
import { Subject, map, of } from 'rxjs';
import { OnEvent } from '@nestjs/event-emitter';

@Controller()
export class AppController {
  private percent = new Subject<number>();

  constructor(private readonly appService: AppService) {}

  @OnEvent('table.created')
  async sse(data: number) {
    this.percent.next(data);
  }

  @Sse('progress')
  route() {
    return this.percent.pipe(map((value) => ({ value })));
  }

  @Post('generate')
  @Redirect('http://localhost:3000/progress', 301)
  generate() {
    this.appService.generateTables();
  }
}
