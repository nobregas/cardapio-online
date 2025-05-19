import PageHeader from "../../../components/layout/PageHeader"
import { recentOrders } from "../../../data/mockData";
import PedidosTable from "./_components/PedidosTable";


const Pedidos = () => {
  const handleSearch = (query: string): void => {
    //setSearchQuery(query);
    console.log("Searching for:", query);
  }

  const filters = [
    {
      label: "Status",
      options: [
        { value: "1", label: "Concluído" },
        { value: "2", label: "Pagamento Pendente" },
        { value: "3", label: "Cancelado" },
        { value: "4", label: "Pagamento Concluído" },
        { value: "5", label: "Em Preparo" },
        { value: "6", label: "Pronto Para Retirada" },
        { value: "7", label: "Em Transporte" },
        { value: "8", label: "Entregue" },
      ],
      onChange: (value: string): void => {
        //setStatusFilter(value);
        console.log("Status filter changed:", value);
      }
    }
  ];

  return (
    <div>
        <PageHeader title={'Gerenciar Pedidos'} 
        searchPlaceholder={`Buscar pedidos...`}
        onSearch={handleSearch}
        filters={filters}
        hasAddButton={false}
        />

        <PedidosTable orders={recentOrders} title={"Pedidos"} path={"/pedidos"} />
    </div>
  )
}

export default Pedidos