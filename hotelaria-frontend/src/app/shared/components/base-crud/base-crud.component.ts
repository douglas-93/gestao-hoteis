import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {ModeEnum} from "../../enums/mode.enum";
import {Router} from "@angular/router";
import {ToolbarComponent} from "../toolbar/toolbar.component";

@Component({
  selector: 'base-crud',
  templateUrl: './base-crud.component.html',
  styleUrls: ['./base-crud.component.scss']
})
export class BaseCrudComponent {

  @ViewChild('toolbarList') toolbarList: ToolbarComponent;
  @ViewChild('toolbarEdit') toolbarEdit: ToolbarComponent;

  @Input() listTitle: string;
  @Input() editTitle: string;
  @Input() mode: ModeEnum = ModeEnum.LIST;

  @Output() filterFunction: EventEmitter<any> = new EventEmitter<any>();
  @Output() novoCadastroFunction: EventEmitter<any> = new EventEmitter<any>();
  @Output() saveFunction: EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteFunction: EventEmitter<any> = new EventEmitter<any>();

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  protected readonly ModeEnum = ModeEnum;

  filterFunctionEnv() {
    this.filterFunction.emit();
  }
  novoCadastroFunctionEnv() {
    this.novoCadastroFunction.emit();
  }
  saveFunctionEnv() {
    this.saveFunction.emit();
  }
  deleteFunctionEnv() {
    this.deleteFunction.emit();
  }
}
