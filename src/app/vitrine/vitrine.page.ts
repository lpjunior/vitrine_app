import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../services/produto.service';
import { Router } from '@angular/router';
import { Produto } from '../models/produto.model';

@Component({
  selector: 'app-vitrine',
  templateUrl: './vitrine.page.html',
  styleUrls: ['./vitrine.page.scss'],
})
export class VitrinePage {

  private produtos: Produto[];
  
  constructor(private produtoService: ProdutoService, private router: Router) {}

  ionViewWillEnter() {
    this.listProduto();
  }


  listProduto() {
    this.produtoService.selectProdutos().subscribe(
      produtosDB => this.produtos = produtosDB,
      errorDB => console.log(errorDB)
    );
  }
}
