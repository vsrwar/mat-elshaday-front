import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { PeopleService } from '../services/people.service';
import { AddressRequest } from '../requests/address.request';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PhysicalPersonResponse } from '../responses/physical-person.response';
import { LegalPersonResponse } from '../responses/legal-person.response';
import { PhysicalPersonRequest } from '../requests/physical-person.request';
import { LegalPersonRequest } from '../requests/legal-person.request';

@Component({
  selector: 'home-person-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class PersonEditComponent implements OnInit {

  viaCepAddress: AddressRequest = {} as AddressRequest;
  type: number = Number.parseInt(this.route.snapshot.paramMap.get('type') ?? '0');
  updatePhysicalPersonForm: FormGroup = this.fb.group({ name: [''], nickName: [''], cpf: [''], qualifier: [''], cep: [''], logradouro: [''], complemento: [''], bairro: [''], localidade: [''], uf: [''], numero: [''] });
  updateLegalPersonForm: FormGroup = this.fb.group({ corporateName: [''], fantasyName: [''], cnpj: [''], qualifier: [''], cep: [''], logradouro: [''], complemento: [''], bairro: [''], localidade: [''], uf: [''], numero: [''] });
  person: PhysicalPersonResponse | LegalPersonResponse = {} as PhysicalPersonResponse | LegalPersonResponse;
  
  constructor(private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private service: PeopleService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    if(this.type == 0) {
      this.snackBar.open('Invalid person type', 'Ok');
      this.router.navigate(['/home/people']);
    }

    switch(this.type) {
      case 1:
        this.configurePhysicalPersonForm();
        break;
      case 2:
        this.configureLegalPersonForm();
        break;
      default:
        this.snackBar.open('Invalid person type', 'Ok');
        this.router.navigate(['/home/people']);
    }
  }

  configurePhysicalPersonForm() {
    this.service.getPhysicalPerson(Number.parseInt(this.route.snapshot.paramMap.get('id') ?? '0'))
      .subscribe({
        next: (person: PhysicalPersonResponse) => {
          this.person = person;
          this.viaCepAddress = {...person.address, siafi: ''};

          this.updatePhysicalPersonForm = this.fb.group({
            name: [person.name, Validators.required],
            nickName: [person.nickName],
            cpf: [person.cpf.value, Validators.required],
            qualifier: [`${person.qualifier}`, Validators.required],
            cep: [person.address.cep, Validators.required],
            logradouro: [person.address.logradouro, Validators.required],
            complemento: [person.address.complemento],
            bairro: [person.address.bairro, Validators.required],
            localidade: [person.address.localidade, Validators.required],
            uf: [person.address.uf, Validators.required],
            numero: [person.address.numero, Validators.required],
          });
      
          this.updatePhysicalPersonForm.controls['logradouro'].disable();
          this.updatePhysicalPersonForm.controls['bairro'].disable();
          this.updatePhysicalPersonForm.controls['localidade'].disable();
          this.updatePhysicalPersonForm.controls['uf'].disable();
        },
        error: (error) => {
          this.snackBar.open('Error while retriving person, try again later', 'Ok', { duration: 3000 });
          this.router.navigate(['/home/people']);
        }
      });
  }

  configureLegalPersonForm() {
    this.service.getLegalPerson(Number.parseInt(this.route.snapshot.paramMap.get('id') ?? '0'))
      .subscribe({
        next: (person: LegalPersonResponse) => {
          this.person = person;
          this.viaCepAddress = {...person.address, siafi: ''};

          this.updateLegalPersonForm = this.fb.group({
            corporateName: [person.corporateName, Validators.required],
            fantasyName: [person.fantasyName],
            cnpj: [person.cnpj.value, Validators.required],
            qualifier: [`${person.qualifier}`, Validators.required],
            cep: [person.address.cep, Validators.required],
            logradouro: [person.address.logradouro, Validators.required],
            complemento: [person.address.complemento],
            bairro: [person.address.bairro, Validators.required],
            localidade: [person.address.localidade, Validators.required],
            uf: [person.address.uf, Validators.required],
            numero: [person.address.numero, Validators.required],
          });
      
          this.updateLegalPersonForm.controls['logradouro'].disable();
          this.updateLegalPersonForm.controls['bairro'].disable();
          this.updateLegalPersonForm.controls['localidade'].disable();
          this.updateLegalPersonForm.controls['uf'].disable();
        },
        error: (error) => {
          this.snackBar.open('Error while retriving person, try again later', 'Ok', { duration: 3000 });
          this.router.navigate(['/home/people']);
        }
      });
  }

  updatePhysicalPerson() {
    if(!this.updatePhysicalPersonForm?.valid) {
      this.snackBar.open('Fields are required', 'OK', { duration: 3000 });
      return;
    }

    const form = this.updatePhysicalPersonForm?.value;
    const request: PhysicalPersonRequest = {
      id: this.person.id,
      name: form.name,
      nickName: form.nickName,
      cpf: form.cpf,
      qualifier: parseInt(form.qualifier),
      address: this.viaCepAddress
    };

    request.address.numero = form.numero;
    request.address.complemento = form.complemento;

    this.service.updatePhysicalPerson(request)
      .subscribe({
        next: () => {
          this.snackBar.open('Physical person edited successfully', 'Ok', { duration: 3000 });
          this.router.navigate(['/home/people']);
        },
        error: (err) => {
          console.log(err);
          this.snackBar.open(err.error, 'Ok', { duration: 3000 });
        }
      });
  }

  updateLegalPerson() {
    if(!this.updateLegalPersonForm?.valid) {
      this.snackBar.open('Fields are required', 'OK', { duration: 3000 });
      return;
    }

    const form = this.updateLegalPersonForm?.value;
    const request: LegalPersonRequest = {
      id: this.person.id,
      corporateName: form.corporateName,
      fantasyName: form.fantasyName,
      cnpj: form.cnpj,
      qualifier: parseInt(form.qualifier),
      address: this.viaCepAddress
    };

    request.address.numero = form.numero;
    request.address.complemento = form.complemento;

    this.service.updateLegalPerson(request)
      .subscribe({
        next: () => {
          this.snackBar.open('Legal person edited successfully', 'Ok', { duration: 3000 });
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
        next: (address: AddressRequest) => {
          if(!address.cep) {
            this.snackBar.open(`ViaCep error: ${JSON.stringify(address)}`, 'Ok', { duration: 3000 });
            return;
          }

          this.viaCepAddress = address;
          this.updatePhysicalPersonForm.controls['logradouro'].setValue(address.logradouro);
          this.updatePhysicalPersonForm.controls['bairro'].setValue(address.bairro);
          this.updatePhysicalPersonForm.controls['localidade'].setValue(address.localidade);
          this.updatePhysicalPersonForm.controls['uf'].setValue(address.uf);
        },
        error: (error) => {
          this.snackBar.open(`ViaCep error: ${JSON.stringify(error)}`, 'Ok', { duration: 3000 });
        }
      });
  }

  cepLegalChanged(event: any) {
    if(event.target.value.length != 8) return;
    const cep = event.target.value;

    this.service.getAddressesByCep(cep)
      .subscribe({
        next: (address: AddressRequest) => {
          if(!address.cep) {
            this.snackBar.open(`ViaCep error: ${JSON.stringify(address)}`, 'Ok', { duration: 3000 });
            return;
          }

          this.viaCepAddress = address;
          this.updateLegalPersonForm.controls['logradouro'].setValue(address.logradouro);
          this.updateLegalPersonForm.controls['bairro'].setValue(address.bairro);
          this.updateLegalPersonForm.controls['localidade'].setValue(address.localidade);
          this.updateLegalPersonForm.controls['uf'].setValue(address.uf);
        },
        error: (error) => {
          this.snackBar.open(`ViaCep error: ${JSON.stringify(error)}`, 'Ok', { duration: 3000 });
        }
      });
  }
}
