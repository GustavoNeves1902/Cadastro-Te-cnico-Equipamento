// mockData.js
export const fabricantesMock = [
    {
      id: 1,
      codigo: "FAB001",
      nome: "Siemens",
      cnpj: "12.345.678/0001-99",
      endereco: {
        logradouro: "Av. Central, 100",
        cidade: "São Paulo",
        estado: "SP",
      }
    },
    {
      id: 2,
      codigo: "FAB002",
      nome: "Philips",
      cnpj: "98.765.432/0001-11",
      endereco: {
        logradouro: "Rua das Flores, 230",
        cidade: "Curitiba",
        estado: "PR",
      }
    }
  ];
  
  
  export const tiposEquipamentoMock = [
    { id: 1, nome: "Eletrônico" },
    { id: 2, nome: "Refrigeração" },
    { id: 3, nome: "Eletrodoméstico" }
  ];
  
  export const caracteristicasMock = [
    { id: 201, nome: "Memória RAM", unidade: "Gb" },
    { id: 202, nome: "Armazenamento", unidade: "Gb" },
    { id: 203, nome: "Potência", unidade: "W" }
  ];
  
  export const equipamentosMock = [
    {
      id: 1,
      codigo: "EQ001",
      nome: "Latitude 5420",
      tipoId: 1,
      fabricanteId: 1,
      caracteristicas: [],
    },
    {
      id: 2,
      codigo: "EQ002",
      nome: "ProDesk 400",
      tipoId: 2,
      fabricanteId: 2,
      caracteristicas: [],
    },
  ];
  