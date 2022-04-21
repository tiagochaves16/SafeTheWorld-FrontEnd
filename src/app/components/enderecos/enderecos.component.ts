import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
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

  endereco!: Endereco

  enderecoMap!: any;

  nomeEndereco!: string;
  enderecoId!: number;


  visibilidadeTabela: boolean = true;
  visibilidadeFormulario: boolean = false;

  modalRef!: BsModalRef;

  constructor(private enderecosService: EnderecosService,
    private modalService: BsModalService,
    private sanitizer: DomSanitizer) { 
      // this.enderecoMap = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.google.com/maps/embed/v1/place?q=" + this.EnderecoCompleto() + "&key=x");

    }

  ngOnInit(): void {

    this.enderecosService.GetAll().subscribe((resultado) => {
      this.enderecos = resultado;
    })
  }

  exibirFormularioCadastro(): void {
    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;
    this.tituloFormulario = "Novo Endereço"
    this.formulario = new FormGroup({
      // id: new FormControl(null),
      nome: new FormControl(null),
      rua: new FormControl(null),
      numero: new FormControl(null),
      cep: new FormControl(null),
      bairro: new FormControl(null),
      cidade: new FormControl(null),
      estado: new FormControl(null),
    });
  }

  exibirFormularioAtualizacao(id: any): void {
    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;

    this.enderecosService.GetById(id).subscribe(resultado => {
      this.tituloFormulario = `Atualizar ${resultado.nome}`;

      this.formulario = new FormGroup({
        id: new FormControl(resultado.id),
        nome: new FormControl(resultado.nome),
        rua: new FormControl(resultado.rua),
        numero: new FormControl(resultado.numero),
        cep: new FormControl(resultado.cep),
        bairro: new FormControl(resultado.bairro),
        cidade: new FormControl(resultado.cidade),
        estado: new FormControl(resultado.estado),
      });
    });
  }

  enviarFormulario(): void {
    const endereco: Endereco = this.formulario.value;

    if (endereco.id > 0) {
      this.enderecosService.Update(endereco).subscribe((resultado) => {
        this.visibilidadeFormulario = false;
        this.visibilidadeTabela = true;
        alert('Endereço atualizada com sucesso');
        this.enderecosService.GetAll().subscribe((registros) => {
          this.enderecos = registros;
        });
      });
    } else {

      this.enderecosService.Post(endereco).subscribe(resultado => {
        this.visibilidadeFormulario = false;
        this.visibilidadeTabela = true;
        alert("Endereço inserido com sucesso!");
        this.enderecosService.GetAll().subscribe((registros) => {
          this.enderecos = registros;
        });
      });
    }
  }



  voltar(): void {
    this.visibilidadeTabela = true;
    this.visibilidadeFormulario = false;
  }

  ExibirConfirmacaoExclusao(enderecoId: any, nomeEndereco: any, conteudoModal: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(conteudoModal);
    this.enderecoId = enderecoId;
    this.nomeEndereco = nomeEndereco;
  }

  ExcluirEndereco(enderecoId: any) {
    this.enderecosService.Delete(enderecoId).subscribe(resultado => {
      this.modalRef.hide();
      alert('Endereço excluída com sucesso');
      this.enderecosService.GetAll().subscribe(registros => {
        this.enderecos = registros;
      });
    });
  }

  public EnderecoCompleto(): string {

    return this.formulario.nome + ", " + this.formulario.rua + ", " + this.formulario.numero + ", " + 
    this.formulario.cep + ", " + this.formulario.bairro + ", " +  this.formulario.cidade +  ", " +  this.formulario.estado;;
  }
}