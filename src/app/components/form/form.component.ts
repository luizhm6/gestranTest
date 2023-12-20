import { CrudService } from 'src/app/services/crud.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  form: FormGroup;
  update = false;
  constructor(
    private fb: FormBuilder,
    private service: CrudService,
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      id: [null],
      nome: [
        null,
        [
          Validators.required,
          Validators.maxLength(30),
          Validators.minLength(3),
        ],
      ],
      idade: [
        null,
        [Validators.required, Validators.max(100), Validators.min(18)],
      ],
      observacoes: [null],
    });
  }

  ngOnInit(): void {
    if (this.data.nome) {
      this.fillForm();
      this.update = true;
    }
  }

  sendForm() {
    this.form.value.id ?
    this.service.updateUser(this.form.value) :
    this.service.addUser(this.form.value) ;
    this.close();
  }

  close(): void {
    this.dialogRef.close();
  }

  formReset() {
    this.form.reset();
  }

  fillForm() {
    this.form.patchValue({
      id: this.data.id,
      nome: this.data.nome,
      idade: this.data.idade,
      observacoes: this.data.observacoes,
    });
  }
}
