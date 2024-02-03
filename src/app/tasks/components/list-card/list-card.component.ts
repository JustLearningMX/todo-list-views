import {Component, inject, Input, OnInit} from '@angular/core';
import {ListOfTasks} from "../../interfaces/list-tasks.interface";
import {ListTasksService} from "../../services/list-tasks.service";

@Component({
  selector: 'list-card',
  templateUrl: './list-card.component.html',
  styleUrl: './list-card.component.css'
})
export class ListCardComponent implements OnInit {

  private listTasksService: ListTasksService = inject(ListTasksService);

  @Input()
  listTasks!: ListOfTasks;

  ngOnInit(): void {
    this.listTasksService.listTasks = this.listTasks;
  }

}
