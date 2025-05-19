import { useState } from "react";
import PageHeader from "../../../components/layout/PageHeader";
import Geral from "./_components/Geral";
import Estabelecimento from "./_components/Estabelecimento";
import Pagamento from "./_components/Pagamento";
import Envio from "./_components/Envio";
import Notificacoes from "./_components/Notificacoes";
import ContaESeguranca from "./_components/ContaESeguranca";

const Configuracoes = () => {
  const [currentTab, setCurrentTab] = useState<string>("1");

  const tabs = [
    { id: "1", label: "Geral" },
    { id: "2", label: "Estabelecimento" },
    { id: "3", label: "Pagamento" },
    { id: "4", label: "Envio" },
    { id: "5", label: "Notificações" },
    { id: "6", label: "Conta e Segurança" },
  ];

  const tabsComponents = {
    "1": <Geral />,
    "2": <Estabelecimento />,
    "3": <Pagamento />,
    "4": <Envio />,
    "5": <Notificacoes />,
    "6": <ContaESeguranca />,
  };

  const onTabChange = (tabId: string) => {
    if (tabId !== currentTab) {
      setCurrentTab(tabId);
      console.log("Tab changed to:", tabId);
    } else {
      console.log("Tab already selected:", tabId);
    }
  };

  return (
    <div>
      <PageHeader
        title={"Configurações"}
        tabs={tabs}
        activeTab={currentTab}
        onTabChange={onTabChange}
        hasAddButton={false}
        hasSearch={false}
      />
      {tabsComponents[currentTab as keyof typeof tabsComponents]}
    </div>
  );
};

export default Configuracoes;
