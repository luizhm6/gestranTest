import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from '../form/form.component';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  users: any[] = [];
  displayedColumns: string[] = ['acoes', 'nome', 'idade', 'observacoes'];
  constructor(private service: CrudService, public dialog: MatDialog) {}
  reduced: any[] = [];

  ngOnInit(): void {
    this.initializeTable();
  }

  initializeTable() {
    this.service.getUsers().subscribe((users) => {
      this.users = users;
      this.reduced = users;
    });
  }

  openDialog(user?: any) {
    const dialogRef = this.dialog.open(FormComponent, {
      data: {
        id: user?.id,
        nome: user?.nome,
        idade: user?.idade,
        obsercacoes: user?.observacoes,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.initializeTable();
    });
  }
  removeUser(user: any) {
    this.service.removeUser(user);
  }

  filter(term: any) {
    // obs fiz com reduce
    this.reduced = this.users
      .filter(
        (user) =>
          user.nome.toLocaleLowerCase().includes(term.value) ||
          user.idade.toString().includes(term.value)
      )
      .map(({ id, nome, idade, observacoes }) => ({id, nome, idade, observacoes,}));
  }
}
