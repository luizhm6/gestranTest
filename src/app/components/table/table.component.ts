import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  reduced: any[] = [];
  constructor(
    private service: CrudService,
    public dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initializeTable();
  }

  initializeTable() {
    this.service.getUsers().subscribe((users) => {
      this.users = [...users];
      this.reduced = [...users];
      console.log('called')
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

    dialogRef.afterClosed().subscribe(() => {
      this.service.getUsers();
    });
  }
  removeUser(user: any) {
    this.service.removeUser(user);
  }

  filter(term: any) {
    this.reduced = this.users
      .filter(
        (user) =>
          user.nome.toLocaleLowerCase().includes(term.value) ||
          user.idade.toString().includes(term.value)
      )
      .map(({ id, nome, idade, observacoes }) => ({
        id,
        nome,
        idade,
        observacoes,
      }));
  }
}
