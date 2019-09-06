import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Produto } from '../models/produto.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ProdutoService } from '../services/produto.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  // propriedades do cadastro
  produto:Produto;
  produtoForm: FormGroup;
  private edit: boolean = false;

  constructor(private formBuilder: FormBuilder, 
              private router: Router,
              private route: ActivatedRoute,
              private produtoService: ProdutoService) {}

  ngOnInit() {
    this.produtoForm = this.formBuilder.group({
      id: [''],
      nome: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(150),
          Validators.pattern(/^[a-zA-Z0-9 ]+$/)
        ]
      ],
      preco: [
        '', 
        [
          Validators.required,
          Validators.pattern(/^[0-9]+$/)
        ]
      ],
      quantidade: [
        '', 
        [
          Validators.required,
          Validators.pattern(/^[0-9]+$/)
        ]
      ],
      url: [
        '', 
        [
          Validators.required,
        ]
      ]
    });

    this.route.paramMap.subscribe(params => {
      const produtoID =+ params.get('id');
      if(produtoID) {
        this.getProduto(produtoID);
        this.edit = true;
      }
    });
  }

  addProduto() {
    const novoProduto = this.produtoForm.getRawValue() as Produto;
    
    this.produtoService.insertProduto(novoProduto).subscribe(
      () => {
        this.router.navigateByUrl('/list');
        this.produtoForm.reset();
      },
      error => {
        console.log(error);
        this.produtoForm.reset();
      }
    );
  }

  getProduto(id: number) {
    this.produtoService.selectProduto(id).subscribe(
      (produtoDB: Produto) => this.loadForm(produtoDB),
      errorDB => console.log(errorDB)
    );
  }

  loadForm(produto: Produto) {
    this.produtoForm.patchValue({
      nome: produto.nome,
      quantidade: produto.quantidade,
      preco: produto.preco,
      url: produto.url,
      id: produto.id
    });
  }

  editProduto() {
    const editedProduto = this.produtoForm.getRawValue() as Produto;
    this.produtoService.updateProduto(editedProduto).subscribe(
      () => {
        this.router.navigateByUrl('/list');
        this.produtoForm.reset();
      },
      error => {
        console.log(error);
        this.produtoForm.reset();
      }
    );
  }
}
