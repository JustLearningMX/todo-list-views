import { Component } from '@angular/core';

@Component({
  selector: 'modal-add-list',
  templateUrl: './modal-add-list.component.html',
  styleUrl: './modal-add-list.component.css'
})
export class ModalAddListComponent {
  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }

  closeDialog() {
    this.visible = false;
  }
}
