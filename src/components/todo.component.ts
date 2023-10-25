import { NgFor } from "@angular/common";
import { HttpClient, provideHttpClient } from "@angular/common/http";
import { Component, Input, inject, type OnInit } from "@angular/core";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: "app-todos",
  standalone: true,
  imports: [NgFor],
  template: `
    <h2>Todos</h2>

    <ul>
      <li *ngFor="let todo of todos">
        {{ todo.title }}
      </li>
    </ul>
  `,
})
export class TodosComponent implements OnInit {
  static clientProviders = [provideHttpClient()];
  static renderProviders = [provideHttpClient()];

  http = inject(HttpClient);
  todos: Todo[] = [];
  @Input() min = 0;
  @Input() max = 5;

  ngOnInit() {
    this.http
      .get<Todo[]>("https://jsonplaceholder.typicode.com/todos")
      .subscribe((todos) => (this.todos = todos.slice(this.min, this.max)));
  }
}
