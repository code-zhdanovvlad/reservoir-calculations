import { Component } from '@angular/core';

import { tableModelK } from './table-model-k';
import { tableModelE } from './table-model-e';
import { tableModelMN } from './table-model-mn';
import { tableModel4 } from './table-model-4';
import { tableModel552 } from './table-model-552';
import { tableModel553 } from './table-model-553';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public tableModelK = tableModelK;
  public tableModelE = tableModelE;
  public tableModelMN = tableModelMN;
  public tableModel4 = tableModel4;
  public tableModel552 = tableModel552;
  public tableModel553 = tableModel553;

  constructor() {
    const savedTableModelK = JSON.parse(localStorage.getItem('tableModelK'))
    const savedTableModelE = JSON.parse(localStorage.getItem('tableModelE'))
    const savedTableModelMN = JSON.parse(localStorage.getItem('tableModelMN'))
    const savedTableModel4 = JSON.parse(localStorage.getItem('tableModel4'))
    const savedTableModel552 = JSON.parse(localStorage.getItem('tableModel552'))
    const savedTableModel553 = JSON.parse(localStorage.getItem('tableModel553'))

    this.tableModelK.row = savedTableModelK && savedTableModelK.row || tableModelK.row;
    this.tableModelE.row = savedTableModelE && savedTableModelE.row || tableModelE.row;
    this.tableModelMN.row = savedTableModelMN && savedTableModelMN.row || tableModelMN.row;
    this.tableModel4.row = savedTableModel4 && savedTableModel4.row || tableModel4.row;
    this.tableModel552.row = savedTableModel552 && savedTableModel552.row || tableModel552.row;
    this.tableModel553.row = savedTableModel553 && savedTableModel553.row || tableModel553.row;

    this.calculateModel553();
  }

  private getRawModel(model: any[]): any[] {
    return model.map((item) => {
      const copy = [...item];

      copy.shift();

      return copy;
    });
  }

  private calculateModel553(): void {
    const model4 = this.getRawModel([ ...this.tableModel4.row ]);
    const model553 = this.getRawModel([ ...this.tableModel553.row ]);

    model553.forEach((item553, x) => {
      if (x === 0) {
        item553.forEach((subItem553, y) => {
          if (y === 0) {
            subItem553.content = model4[2][0].content;
          }

          if (y !== 0) {
            subItem553.content = (Number(model4[0][y].content) * Number(model4[2][y].content) * Number(model4[1][y].content)).toFixed(2);
          }
        });
      }

      if (x === 1) {
        item553.forEach((subItem553, y) => {
          if (y === 0) {
            subItem553.content = model4[3][0].content;
          }

          if (y !== 0) {
            subItem553.content = (Number(model4[0][y].content) * Number(model4[3][y].content) * Number(model4[1][y].content)).toFixed(2);
          }
        });
      }
    })
  }

  public saveModel($event): void {
    localStorage.setItem($event.name, JSON.stringify($event.model.row));
    this.calculateModel553();
  }
}

