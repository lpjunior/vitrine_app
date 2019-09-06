import { Component, OnInit } from '@angular/core';
import { Produto } from '../models/produto.model';
import { ProdutoService } from '../services/produto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage {
  
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

  editProduto(id: number) {
    this.router.navigate(['/edit', id]);
  }
  
  deleteProduto(id: number) {
    this.produtoService.deleteProduto(id).subscribe(
      () => {
        this.router.navigateByUrl('/list');
        this.listProduto();
      },
      errorDelete => console.log(errorDelete)
    );
  }
}
