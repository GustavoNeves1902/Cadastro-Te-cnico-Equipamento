import { useState, useEffect } from "react";

// --- DADOS MOCKADOS (Carregados inicialmente) ---
const fabricantesMock = [
  {
    id: 1,
    codigo: "FAB001",
    nome: "Dell",
    cnpj: "00.000.000/0001-00",
    endereco: { logradouro: "Rua Tech", cidade: "São Paulo", estado: "SP" },
  },
  {
    id: 2,
    codigo: "FAB002",
    nome: "HP",
    cnpj: "11.111.111/0001-11",
    endereco: {
      logradouro: "Av. Inovação",
      cidade: "Porto Alegre",
      estado: "RS",
    },
  },
  {
    id: 3,
    codigo: "FAB003",
    nome: "Logitech",
    cnpj: "22.222.222/0001-22",
    endereco: { logradouro: "Rodovia Tech", cidade: "Jundiaí", estado: "SP" },
  },
];

const tiposEquipamentoMock = [
  { id: 1, nome: "Notebook" },
  { id: 2, nome: "Desktop" },
  { id: 3, nome: "Monitor" },
  { id: 4, nome: "Periférico" },
];

const equipamentosMock = [
  {
    id: 1,
    codigo: "EQ001",
    nome: "Latitude 5420",
    tipoId: 1, // Notebook
    fabricanteId: 1, // Dell
    caracteristicas: [],
  },
  {
    id: 2,
    codigo: "EQ002",
    nome: "ProDesk 400",
    tipoId: 2, // Desktop
    fabricanteId: 2, // HP
    caracteristicas: [],
  },
  {
    id: 3,
    codigo: "EQ003",
    nome: "Monitor P2419H",
    tipoId: 3, // Monitor
    fabricanteId: 1, // Dell
    caracteristicas: [],
  },
  {
    id: 4,
    codigo: "EQ004",
    nome: "Mouse MX Master 3",
    tipoId: 4, // Periférico
    fabricanteId: 3, // Logitech
    caracteristicas: [],
  },
  {
    id: 5,
    codigo: "EQ005",
    nome: "Vostro 3510",
    tipoId: 1, // Notebook
    fabricanteId: 1, // Dell
    caracteristicas: [],
  },
  {
    id: 6,
    codigo: "EQ006",
    nome: "Teclado Mecânico K835",
    tipoId: 4, // Periférico
    fabricanteId: 3, // Logitech
    caracteristicas: [],
  },
];
// ------------------------------------------------------------------

export default function App() {
  // Inicia na aba de equipamentos para visualização imediata
  const [tab, setTab] = useState("equipamentos");

  // Estados de Dados (Inicializados com os Mocks)
  const [fabricantes, setFabricantes] = useState(fabricantesMock);
  const [equipamentos, setEquipamentos] = useState(equipamentosMock);

  // Pesquisa
  const [search, setSearch] = useState("");

  // Efeito para limpar a busca ao trocar de aba (Correção de Bug Visual)
  useEffect(() => {
    setSearch("");
  }, [tab]);

  // Formulários
  const [fabricanteForm, setFabricanteForm] = useState({
    codigo: "",
    nome: "",
    cnpj: "",
    endereco: { logradouro: "", cidade: "", estado: "" },
  });

  const [equipamentoForm, setEquipamentoForm] = useState({
    codigo: "",
    nome: "",
    tipoId: "",
    fabricanteId: "",
    caracteristicas: [],
  });

  // Lógica de Filtro Segura
  const equipamentosFiltrados = equipamentos.filter((e) => {
    // Proteção caso algum campo seja null/undefined
    const nome = e.nome ? e.nome.toLowerCase() : "";
    const codigo = e.codigo ? e.codigo.toLowerCase() : "";
    const termo = search.toLowerCase();
    return nome.includes(termo) || codigo.includes(termo);
  });

  const fabricantesFiltrados = fabricantes.filter((f) => {
    const s = search.toLowerCase();
    const nome = f.nome ? f.nome.toLowerCase() : "";
    const codigo = f.codigo ? f.codigo.toLowerCase() : "";

    return nome.includes(s) || codigo.includes(s);
  });

  // Funções de Cadastro
  function cadastrarFabricante() {
    if (!fabricanteForm.nome || !fabricanteForm.codigo) {
      alert("Preencha ao menos Código e Nome.");
      return;
    }
    const novo = {
      id: Date.now(), // ID único baseado no tempo
      ...fabricanteForm,
      // Garante estrutura correta
      endereco: { ...fabricanteForm.endereco },
    };

    setFabricantes([...fabricantes, novo]);
    alert("Fabricante cadastrado!");
    setFabricanteForm({
      codigo: "",
      nome: "",
      cnpj: "",
      endereco: { logradouro: "", cidade: "", estado: "" },
    });
  }

  function cadastrarEquipamento() {
    if (!equipamentoForm.nome || !equipamentoForm.codigo) {
      alert("Preencha ao menos Código e Nome.");
      return;
    }
    const novo = {
      id: Date.now(),
      ...equipamentoForm,
      tipoId: Number(equipamentoForm.tipoId),
      fabricanteId: Number(equipamentoForm.fabricanteId),
    };
    setEquipamentos([...equipamentos, novo]);
    alert("Equipamento cadastrado!");
    setEquipamentoForm({
      codigo: "",
      nome: "",
      tipoId: "",
      fabricanteId: "",
      caracteristicas: [],
    });
  }

  return (
    <div className="min-h-screen bg-gray-400 flex items-center justify-center p-4 font-sans">
      <div className="bg-gray-200 w-full max-w-4xl rounded-xl shadow-2xl overflow-hidden flex flex-col min-h-[600px]">
        {/* CABEÇALHO */}
        <div className="bg-blue-700 p-6 shadow-md z-10">
          <h1 className="text-2xl font-bold text-white text-center tracking-wide">
            Gestão de Ativos
          </h1>
        </div>

        {/* NAVEGAÇÃO (TABS) */}
        <div className="flex bg-gray-50 border-b">
          <button
            onClick={() => setTab("equipamentos")}
            className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-all duration-200 border-b-4 ${
              tab === "equipamentos"
                ? "border-blue-600 text-blue-800 bg-white"
                : "border-transparent text-gray-400 hover:text-gray-600"
            }`}
          >
            Equipamentos
          </button>
          <button
            onClick={() => setTab("fabricantes")}
            className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-all duration-200 border-b-4 ${
              tab === "fabricantes"
                ? "border-blue-600 text-blue-800 bg-white"
                : "border-transparent text-gray-400 hover:text-gray-600"
            }`}
          >
            Fabricantes
          </button>
        </div>

        {/* CORPO PRINCIPAL */}
        <div className="p-8 flex-1 overflow-y-auto bg-gray-50/30">
          {/* --------- TAB EQUIPAMENTOS --------- */}
          {tab === "equipamentos" && (
            <div className="animate-fade-in">
              {/* FORMULÁRIO */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
                <h2 className="text-lg font-bold text-gray-700 mb-4 border-l-4 border-blue-500 pl-3">
                  Novo Equipamento
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    className="p-3 bg-gray-50 border rounded outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                    placeholder="Código (ex: EQ-999)"
                    value={equipamentoForm.codigo}
                    onChange={(e) =>
                      setEquipamentoForm({
                        ...equipamentoForm,
                        codigo: e.target.value,
                      })
                    }
                  />
                  <input
                    className="p-3 bg-gray-50 border rounded outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                    placeholder="Nome do Equipamento"
                    value={equipamentoForm.nome}
                    onChange={(e) =>
                      setEquipamentoForm({
                        ...equipamentoForm,
                        nome: e.target.value,
                      })
                    }
                  />
                  <select
                    className="p-3 bg-white border rounded outline-none focus:ring-2 focus:ring-blue-200 transition-all cursor-pointer"
                    value={equipamentoForm.tipoId}
                    onChange={(e) =>
                      setEquipamentoForm({
                        ...equipamentoForm,
                        tipoId: e.target.value,
                      })
                    }
                  >
                    <option value="">Selecione o Tipo</option>
                    {tiposEquipamentoMock.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.nome}
                      </option>
                    ))}
                  </select>
                  <select
                    className="p-3 bg-white border rounded outline-none focus:ring-2 focus:ring-blue-200 transition-all cursor-pointer"
                    value={equipamentoForm.fabricanteId}
                    onChange={(e) =>
                      setEquipamentoForm({
                        ...equipamentoForm,
                        fabricanteId: e.target.value,
                      })
                    }
                  >
                    <option value="">Selecione o Fabricante</option>
                    {fabricantes.map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.nome}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  className="mt-4 w-full md:w-auto px-8 py-3 bg-blue-600 text-white font-bold rounded shadow hover:bg-blue-700 transition-colors"
                  onClick={cadastrarEquipamento}
                >
                  + Salvar Equipamento
                </button>
              </div>

              {/* LISTAGEM */}
              <div>
                <div className="flex justify-between items-end mb-4">
                  <h3 className="text-xl font-bold text-gray-800">
                    Equipamentos Cadastrados{" "}
                    <span className="text-sm font-normal text-gray-500 ml-2">
                      ({equipamentosFiltrados.length} itens)
                    </span>
                  </h3>
                </div>

                <input
                  className="w-full p-3 mb-4 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-200 outline-none"
                  placeholder="🔍 Pesquisar equipamento por nome ou código..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

                <div className="space-y-3">
                  {equipamentosFiltrados.length === 0 ? (
                    <div className="text-center py-10 bg-white rounded border border-dashed border-gray-300">
                      <p className="text-gray-400">
                        Nenhum equipamento encontrado com esse termo.
                      </p>
                    </div>
                  ) : (
                    equipamentosFiltrados.map((e) => (
                      <div
                        key={e.id}
                        className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row justify-between items-start md:items-center group"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              {e.codigo}
                            </span>
                            <strong className="text-lg text-gray-800">
                              {e.nome}
                            </strong>
                          </div>
                          <div className="text-sm text-gray-500 mt-1 flex gap-3">
                            <span className="flex items-center gap-1">
                              🏷️{" "}
                              {tiposEquipamentoMock.find(
                                (t) => t.id === e.tipoId
                              )?.nome || "Não definido"}
                            </span>
                            <span className="flex items-center gap-1">
                              {fabricantes.find((f) => f.id === e.fabricanteId)
                                ?.nome || "Desconhecido"}
                            </span>
                          </div>
                        </div>
                        <div className="mt-2 md:mt-0 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-xs text-blue-500 font-bold cursor-pointer hover:underline">
                            Editar
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* --------- TAB FABRICANTES --------- */}
          {tab === "fabricantes" && (
            <div className="animate-fade-in">
              {/* FORMULÁRIO */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
                <h2 className="text-lg font-bold text-gray-700 mb-4 border-l-4 border-blue-500 pl-3">
                  Novo Fabricante
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    className="p-3 bg-gray-50 border rounded outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="Código"
                    value={fabricanteForm.codigo}
                    onChange={(e) =>
                      setFabricanteForm({
                        ...fabricanteForm,
                        codigo: e.target.value,
                      })
                    }
                  />
                  <input
                    className="p-3 bg-gray-50 border rounded outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="Nome"
                    value={fabricanteForm.nome}
                    onChange={(e) =>
                      setFabricanteForm({
                        ...fabricanteForm,
                        nome: e.target.value,
                      })
                    }
                  />
                  <input
                    className="p-3 bg-gray-50 border rounded outline-none focus:ring-2 focus:ring-blue-200 md:col-span-2"
                    placeholder="CNPJ"
                    value={fabricanteForm.cnpj}
                    onChange={(e) =>
                      setFabricanteForm({
                        ...fabricanteForm,
                        cnpj: e.target.value,
                      })
                    }
                  />
                  <input
                    className="p-3 bg-gray-50 border rounded outline-none focus:ring-2 focus:ring-blue-200 md:col-span-2"
                    placeholder="Logradouro"
                    value={fabricanteForm.endereco.logradouro}
                    onChange={(e) =>
                      setFabricanteForm({
                        ...fabricanteForm,
                        endereco: {
                          ...fabricanteForm.endereco,
                          logradouro: e.target.value,
                        },
                      })
                    }
                  />
                  <input
                    className="p-3 bg-gray-50 border rounded outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="Cidade"
                    value={fabricanteForm.endereco.cidade}
                    onChange={(e) =>
                      setFabricanteForm({
                        ...fabricanteForm,
                        endereco: {
                          ...fabricanteForm.endereco,
                          cidade: e.target.value,
                        },
                      })
                    }
                  />
                  <input
                    className="p-3 bg-gray-50 border rounded outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="Estado"
                    value={fabricanteForm.endereco.estado}
                    onChange={(e) =>
                      setFabricanteForm({
                        ...fabricanteForm,
                        endereco: {
                          ...fabricanteForm.endereco,
                          estado: e.target.value,
                        },
                      })
                    }
                  />
                </div>
                <button
                  className="mt-4 w-full md:w-auto px-8 py-3 bg-blue-600 text-white font-bold rounded shadow hover:bg-blue-700 transition-colors"
                  onClick={cadastrarFabricante}
                >
                  + Salvar Fabricante
                </button>
              </div>

              {/* LISTAGEM */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Fabricantes Cadastrados{" "}
                  <span className="text-sm font-normal text-gray-500 ml-2">
                    ({fabricantesFiltrados.length} itens)
                  </span>
                </h3>

                <input
                  className="w-full p-3 mb-4 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-200 outline-none"
                  placeholder="🔍 Pesquisar fabricante..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

                <div className="space-y-3">
                  {fabricantesFiltrados.length === 0 ? (
                    <div className="text-center py-10 bg-white rounded border border-dashed border-gray-300">
                      <p className="text-gray-400">
                        Nenhum fabricante encontrado.
                      </p>
                    </div>
                  ) : (
                    fabricantesFiltrados.map((f) => (
                      <div
                        key={f.id}
                        className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <strong className="text-lg text-gray-900 block">
                              {f.nome}
                            </strong>
                            <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                              {f.codigo}
                            </span>
                            {f.cnpj && (
                              <span className="text-xs text-gray-500 ml-2">
                                CNPJ: {f.cnpj}
                              </span>
                            )}
                          </div>
                        </div>
                        {(f.endereco?.logradouro || f.endereco?.cidade) && (
                          <div className="mt-3 text-sm text-gray-600 bg-blue-50/50 p-2 rounded border border-blue-100 flex items-center gap-2">
                            📍 {f.endereco?.logradouro}, {f.endereco?.cidade} -{" "}
                            {f.endereco?.estado}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
