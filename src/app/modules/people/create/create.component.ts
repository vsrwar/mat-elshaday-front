import { Component, OnInit } from '@angular/core';
import { PhysicalPersonRequest } from '../requests/physical-person.request';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddressRequest } from '../requests/address.request';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PeopleService } from '../services/people.service';
import { Router } from '@angular/router';
import { LegalPersonRequest } from '../requests/legal-person.request';

@Component({
  selector: 'home-person-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class PersonCreateComponent implements OnInit {
  
  viaCepAddress: AddressRequest = {} as AddressRequest;
  createPhysicalPersonForm: FormGroup = new FormGroup({});
  createLegalPersonForm: FormGroup = new FormGroup({});

  constructor(private snackBar: MatSnackBar,
    private service: PeopleService,
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.configurePhysicalPersonForm();
    this.configureLegalPersonForm();
  }

  configurePhysicalPersonForm() {
    this.createPhysicalPersonForm = this.fb.group({
      name: ['', Validators.required],
      nickName: [''],
      cpf: ['', Validators.required],
      qualifier: ['', Validators.required],
      cep: ['', Validators.required],
      logradouro: ['', Validators.required],
      complemento: [''],
      bairro: ['', Validators.required],
      localidade: ['', Validators.required],
      uf: ['', Validators.required],
      numero: ['', Validators.required],
    });

    this.createPhysicalPersonForm.controls['logradouro'].disable();
    this.createPhysicalPersonForm.controls['bairro'].disable();
    this.createPhysicalPersonForm.controls['localidade'].disable();
    this.createPhysicalPersonForm.controls['uf'].disable();
  }

  configureLegalPersonForm() {
    this.createLegalPersonForm = this.fb.group({
      corporateName: ['', Validators.required],
      fantasyName: [''],
      cnpj: ['', Validators.required],
      qualifier: ['', Validators.required],
      cep: ['', Validators.required],
      logradouro: ['', Validators.required],
      complemento: [''],
      bairro: ['', Validators.required],
      localidade: ['', Validators.required],
      uf: ['', Validators.required],
      numero: ['', Validators.required],
    });

    this.createLegalPersonForm.controls['logradouro'].disable();
    this.createLegalPersonForm.controls['bairro'].disable();
    this.createLegalPersonForm.controls['localidade'].disable();
    this.createLegalPersonForm.controls['uf'].disable();
  }

  createPhysicalPerson() {
    if(!this.createPhysicalPersonForm?.valid) {
      this.snackBar.open('Fields are required', 'OK', { duration: 3000 });
      return;
    }

    const form = this.createPhysicalPersonForm?.value;
    const request: PhysicalPersonRequest = {
      id: undefined,
      name: form.name,
      nickName: form.nickName,
      cpf: form.cpf,
      qualifier: parseInt(form.qualifier),
      address: this.viaCepAddress
    };

    request.address.numero = form.numero;
    request.address.complemento = form.complemento;

    this.service.createPhysicalPerson(request)
      .subscribe({
        next: () => {
          this.snackBar.open('Physical person created successfully', 'Ok', { duration: 3000 });
          this.router.navigate(['/home/people']);
        },
        error: (err) => {
          console.log(err);
          this.snackBar.open(err.error, 'Ok', { duration: 3000 });
        }
      });
  }

  createLegalPerson() {
    if(!this.createLegalPersonForm?.valid) {
      this.snackBar.open('Fields are required', 'OK', { duration: 3000 });
      return;
    }

    const form = this.createLegalPersonForm?.value;
    const request: LegalPersonRequest = {
      id: undefined,
      corporateName: form.corporateName,
      fantasyName: form.fantasyName,
      cnpj: form.cnpj,
      qualifier: parseInt(form.qualifier),
      address: this.viaCepAddress
    };

    request.address.numero = form.numero;
    request.address.complemento = form.complemento;

    this.service.createLegalPerson(request)
      .subscribe({
        next: () => {
          this.snackBar.open('Legal person created successfully', 'Ok', { duration: 3000 });
          this.router.navigate(['/home/people']);
        },
        error: (err) => {
          this.snackBar.open(err.error, 'Ok', { duration: 3000 });
        }
      });
  }
  
  cepPhysicalChanged(event: any) {
    if(event.target.value.length != 8) return;
    const cep = event.target.value;

    this.service.getAddressesByCep(cep)
      .subscribe({
        next: (address) => {
          this.viaCepAddress = address;
          this.createPhysicalPersonForm.controls['logradouro'].setValue(address.logradouro);
          this.createPhysicalPersonForm.controls['bairro'].setValue(address.bairro);
          this.createPhysicalPersonForm.controls['localidade'].setValue(address.localidade);
          this.createPhysicalPersonForm.controls['uf'].setValue(address.uf);
        },
        error: (error) => {
          this.snackBar.open(error.message, 'Ok', { duration: 3000 });
        }
      });
  }

  cepLegalChanged(event: any) {
    if(event.target.value.length != 8) return;
    const cep = event.target.value;

    this.service.getAddressesByCep(cep)
      .subscribe({
        next: (address) => {
          this.viaCepAddress = address;
          this.createLegalPersonForm.controls['logradouro'].setValue(address.logradouro);
          this.createLegalPersonForm.controls['bairro'].setValue(address.bairro);
          this.createLegalPersonForm.controls['localidade'].setValue(address.localidade);
          this.createLegalPersonForm.controls['uf'].setValue(address.uf);
        },
        error: (error) => {
          this.snackBar.open(error.message, 'Ok', { duration: 3000 });
        }
      });
  }
}
