import React from 'react'
import ProductsTable from '../../components/product/ProductsTable'
import { products } from '../../data/mockData'
import PageTitle from '../../components/ui/PageTitle'

const Products = () => {
  return (
    <div>
        <PageTitle title={'Gerenciar Produtos'} />

        {/* Botoes */}
        <div>Buscar Produtos</div>
        <div>Adicionar Produto</div>

        {/* Tabela de Produtos */}
        <ProductsTable products={products} title={'Produtos'} path={''} />
    </div>
)
}

export default Products