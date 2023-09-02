import {Component, Input} from '@angular/core';
import {ModeEnum} from "../../enums/mode.enum";
import {Router} from "@angular/router";

@Component({
  selector: 'base-crud',
  templateUrl: './base-crud.component.html',
  styleUrls: ['./base-crud.component.scss']
})
export class BaseCrudComponent {

  @Input() listTitle: string;
  @Input() editTitle: string;
  @Input() mode: ModeEnum = ModeEnum.LIST;

  @Input() filterFunction: Function;
  @Input() novoCadastroFunction: Function;
  @Input() saveFunction: Function;
  @Input() deleteFunction: Function;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  protected readonly ModeEnum = ModeEnum;
}
