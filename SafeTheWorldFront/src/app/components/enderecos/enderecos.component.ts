import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Endereco } from 'src/app/Endereco';
import { EnderecosService } from 'src/app/enderecos.service';

@Component({
  selector: 'app-enderecos',
  templateUrl: './enderecos.component.html',
  styleUrls: ['./enderecos.component.css']
})
export class EnderecosComponent implements OnInit {

  formulario: any;
  tituloFormulario!: string;
  enderecos!: Endereco[];

  constructor(private enderecosService : EnderecosService) { }

  ngOnInit(): void {

    this.enderecosService.GetAll().subscribe(resultado => {
      this.enderecos = resultado;
    })

    this.tituloFormulario = "Novo Endereço"
    this.formulario = new FormGroup({
      nome: new FormControl(null),
      rua: new FormControl(null),
      numero: new FormControl(null),
      cep: new FormControl(null),
      bairro: new FormControl(null),
      cidade: new FormControl(null),
      estado: new FormControl(null),
    });
  }

  enviarFormulario(): void {
    const endereco : Endereco = this.formulario.value;

    this.enderecosService.Post(endereco).subscribe(resultado => {
      alert("Endereço inserido com sucesso!");
    })
  }
}
