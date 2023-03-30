import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class AppService {
  private formularios = [1, 2, 3, 4];
  private tabelas = [];

  private readonly total = this.formularios.length + this.tabelas.length;

  constructor(private eventEmitter: EventEmitter2) {}

  generateTables() {
    for (let i = 0; i < this.total; i++) {
      this.getPercent();
    }
  }

  private getPercent() {
    const formulario = this.formularios.shift();

    this.tabelas.push(formulario);

    const item = this.tabelas.length;

    this.eventEmitter.emit('table.created', (item * 100) / this.total);
  }
}
