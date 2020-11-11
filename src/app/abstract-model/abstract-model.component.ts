import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-abstract-model',
  templateUrl: './abstract-model.component.html',
  styleUrls: ['./abstract-model.component.scss']
})
export class AbstractModelComponent implements OnInit {

  @Input() tableModel;
  @Input() title;
  @Input() name;
  @Output() saveModel = new EventEmitter<any>();

  activeColTitle: string;

  activeColl: null | { content: object };

  activeModal: null | {
    result: Promise<any>;
    close(): void
  };

  constructor(
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {}

  saveColumn(): void {
    if (this.activeModal) {
      this.activeModal.close();
      this.saveModel.emit({ model: this.tableModel, name: this.name });
    }
  }


  editColumn(rowIndex, colIndex, modalTemplate): void {
    const prevContent = this.tableModel.row[rowIndex][colIndex].content;

    this.activeColl = this.tableModel.row[rowIndex][colIndex];
    this.activeModal = this.modalService.open(modalTemplate );
    this.activeColTitle = `${this.tableModel.row[rowIndex][0].content} – ${this.tableModel.heading[colIndex].content}`;

    this.activeModal.result.then(
      () => {
        this.activeColl = null;
      },
      () => {
        this.activeColl.content = prevContent;
        this.activeColl = null;
      }
    );
  }

  getColumn($event, modalTemplate): void {
    let rowIndex;
    let colIndex;

    if ($event.target) {
      if ($event.target.dataset.editable) {
        rowIndex = Number($event.target.dataset.trIndex);
        colIndex = Number($event.target.dataset.tdIndex);
      } else {
        const td = $event.target.closest('td');

        if (td && td.target && td.target.dataset.editable) {
          rowIndex = Number($event.target.dataset.trIndex);
          colIndex = Number($event.target.dataset.tdIndex);
        }
      }

      if (rowIndex !== undefined && colIndex !== undefined) {
        this.editColumn(rowIndex, colIndex, modalTemplate);
      }
    }
  }
}
