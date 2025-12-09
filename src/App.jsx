import { useState, useEffect } from "react";

// --- DADOS MOCKADOS (Carregados inicialmente) ---
// Endereços (agora sem número/complemento — só os campos globais)
const enderecosMock = [
  {
    id: 1,
    logradouro: "Rua Tech",
    cidade: "São Paulo",
    estado: "SP",
    cep: "01000-000",
  },
  {
    id: 2,
    logradouro: "Av. Inovação",
    cidade: "Porto Alegre",
    estado: "RS",
    cep: "90000-000",
  },
  {
    id: 3,
    logradouro: "Rodovia Tech",
    cidade: "Jundiaí",
    estado: "SP",
    cep: "13200-000",
  },
];

const fabricantesMock = [
  {
    id: 1,
    codigo: "FAB001",
    nome: "Dell",
    cnpj: "00.000.000/0001-00",
    enderecoId: 1,
    numero: "123",
    complemento: "Sala 01",
  },
  {
    id: 2,
    codigo: "FAB002",
    nome: "HP",
    cnpj: "11.111.111/0001-11",
    enderecoId: 2,
    numero: "500",
    complemento: "",
  },
  {
    id: 3,
    codigo: "FAB003",
    nome: "Logitech",
    cnpj: "22.222.222/0001-22",
    enderecoId: 3,
    numero: "Km 45",
    complemento: "Box 3",
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
  // Aba inicial
  const [tab, setTab] = useState("equipamentos");

  // Estados de Dados (Inicializados com os Mocks)
  const [fabricantes, setFabricantes] = useState(fabricantesMock);
  const [equipamentos, setEquipamentos] = useState(equipamentosMock);

  // Endereços (centralizados) — sem número/complemento
  const [enderecos, setEnderecos] = useState(enderecosMock);

  // Novos dados: unidades e características técnicas
  const [unidades, setUnidades] = useState([
    { id: 1, nome: "GHz" },
    { id: 2, nome: "GB" },
    { id: 3, nome: "W" },
  ]);

  const [caracteristicas, setCaracteristicas] = useState([
    { id: 1, nome: "Processador", unidadeId: 1 },
    { id: 2, nome: "Memória RAM", unidadeId: 2 },
    { id: 3, nome: "Potência", unidadeId: 3 },
  ]);

  // Pesquisa
  const [search, setSearch] = useState("");

  // Efeito para limpar a busca ao trocar de aba (Correção de Bug Visual)
  useEffect(() => {
    setSearch("");
  }, [tab]);

  // Forms existentes
  const [fabricanteForm, setFabricanteForm] = useState({
    codigo: "",
    nome: "",
    cnpj: "",
    enderecoId: "", // referenciar um endereço do cadastro
    numero: "",
    complemento: "",
  });

  const [equipamentoForm, setEquipamentoForm] = useState({
    codigo: "",
    nome: "",
    tipoId: "",
    fabricanteId: "",
    caracteristicas: [], // irá guardar objetos {id, nome, unidadeId, valor?}
  });

  // Forms novos
  const [unidadeForm, setUnidadeForm] = useState({ nome: "" });

  const [caracteristicaForm, setCaracteristicaForm] = useState({
    nome: "",
    unidadeId: "",
  });

  // Endereço form (usado para cadastro geral e para "novo endereço inline" em fabricante)
  const [enderecoForm, setEnderecoForm] = useState({
    logradouro: "",
    cidade: "",
    estado: "",
    cep: "",
  });

  // Controla se vai mostrar o mini-form de endereço dentro do formulário de fabricante
  const [showInlineEndereco, setShowInlineEndereco] = useState(false);

  // Lógica de Filtro Segura
  const equipamentosFiltrados = equipamentos.filter((e) => {
    const nome = e.nome ? e.nome.toLowerCase() : "";
    const codigo = e.codigo ? e.codigo.toLowerCase() : "";
    const termo = search.toLowerCase();
    return nome.includes(termo) || codigo.includes(termo);
  });

  // ATUALIZADO: filtra também pelos campos de endereço nos fabricantes
  const fabricantesFiltrados = fabricantes.filter((f) => {
    const s = search.toLowerCase();
    const nome = f.nome ? f.nome.toLowerCase() : "";
    const codigo = f.codigo ? f.codigo.toLowerCase() : "";
    const cnpj = f.cnpj ? f.cnpj.toLowerCase() : "";

    const enderecoObj = enderecos.find((en) => en.id === f.enderecoId);
    const logradouro = enderecoObj?.logradouro ? enderecoObj.logradouro.toLowerCase() : "";
    const cidade = enderecoObj?.cidade ? enderecoObj.cidade.toLowerCase() : "";
    const estado = enderecoObj?.estado ? enderecoObj.estado.toLowerCase() : "";

    return (
      nome.includes(s) ||
      codigo.includes(s) ||
      cnpj.includes(s) ||
      logradouro.includes(s) ||
      cidade.includes(s) ||
      estado.includes(s)
    );
  });

  // ---------- Funções de Cadastro ----------
  function cadastrarFabricante() {
    if (!fabricanteForm.nome || !fabricanteForm.codigo) {
      alert("Preencha ao menos Código e Nome.");
      return;
    }

    // garantir que enderecoId seja number ou null
    const enderecoId = fabricanteForm.enderecoId ? Number(fabricanteForm.enderecoId) : null;

    const novo = {
      id: Date.now(),
      ...fabricanteForm,
      enderecoId,
      // numero/complemento já fazem parte do fabricanteForm
    };

    setFabricantes((prev) => [...prev, novo]);
    alert("Fabricante cadastrado!");
    setFabricanteForm({
      codigo: "",
      nome: "",
      cnpj: "",
      enderecoId: "",
      numero: "",
      complemento: "",
    });
    // esconder inline caso estivesse aberto
    setShowInlineEndereco(false);
    // reset endereçoForm (só por segurança)
    setEnderecoForm({
      logradouro: "",
      cidade: "",
      estado: "",
      cep: "",
    });
  }

  function cadastrarEquipamento() {
    if (!equipamentoForm.nome || !equipamentoForm.codigo) {
      alert("Preencha ao menos Código e Nome.");
      return;
    }
    // Converter ids
    const novo = {
      id: Date.now(),
      codigo: equipamentoForm.codigo,
      nome: equipamentoForm.nome,
      tipoId: Number(equipamentoForm.tipoId) || null,
      fabricanteId: Number(equipamentoForm.fabricanteId) || null,
      caracteristicas: equipamentoForm.caracteristicas.map((c) => {
        // manter snapshot da característica (id, nome, unidadeId)
        return { id: c.id, nome: c.nome, unidadeId: c.unidadeId, valor: c.valor ?? "" };
      }),
    };
    setEquipamentos((prev) => [...prev, novo]);
    alert("Equipamento cadastrado!");
    setEquipamentoForm({
      codigo: "",
      nome: "",
      tipoId: "",
      fabricanteId: "",
      caracteristicas: [],
    });
  }

  // ---------- Funções para Unidades e Características ----------
  function adicionarUnidade() {
    if (!unidadeForm.nome) {
      alert("Digite o nome da unidade");
      return;
    }
    const novo = { id: Date.now(), nome: unidadeForm.nome.trim() };
    setUnidades((prev) => [...prev, novo]);
    setUnidadeForm({ nome: "" });
  }

  function adicionarCaracteristica() {
    if (!caracteristicaForm.nome || !caracteristicaForm.unidadeId) {
      alert("Preencha nome e unidade da característica");
      return;
    }
    const novo = {
      id: Date.now(),
      nome: caracteristicaForm.nome.trim(),
      unidadeId: Number(caracteristicaForm.unidadeId),
    };
    setCaracteristicas((prev) => [...prev, novo]);
    setCaracteristicaForm({ nome: "", unidadeId: "" });
  }

  function removerCaracteristicaGlobal(id) {
    if (!confirm("Remover essa característica de cadastro?")) return;
    setCaracteristicas((prev) => prev.filter((c) => c.id !== id));
    // remover referência dos equipamentos que a possuam
    setEquipamentos((prev) =>
      prev.map((eq) => ({
        ...eq,
        caracteristicas: eq.caracteristicas.filter((c) => c.id !== id),
      }))
    );
  }

  // ---------- Funções de Endereços ----------
  function adicionarEndereco(global = true) {
    // se global === false, assume que este add vem de inline no fabricante (mas ambos comportam o mesmo comportamento)
    const e = enderecoForm;
    if (!e.logradouro || !e.cidade || !e.estado) {
      alert("Preencha ao menos Logradouro, Cidade e Estado.");
      return;
    }
    const novo = {
      id: Date.now(),
      logradouro: e.logradouro.trim(),
      cidade: e.cidade.trim(),
      estado: e.estado.trim(),
      cep: e.cep.trim(),
    };
    setEnderecos((prev) => [...prev, novo]);

    // se veio do inline (quando estiver cadastrando fabricante), linka automaticamente o fabricanteForm
    if (!global) {
      setFabricanteForm((prev) => ({ ...prev, enderecoId: novo.id }));
      setShowInlineEndereco(false);
    }

    // reset form
    setEnderecoForm({
      logradouro: "",
      cidade: "",
      estado: "",
      cep: "",
    });

    if (global) {
      alert("Endereço cadastrado!");
    } else {
      alert("Endereço cadastrado e associado ao fabricante!");
    }
  }

  function removerEnderecoGlobal(id) {
    if (!confirm("Remover esse endereço? Esse endereço será desvinculado de fabricantes que o utilizam.")) return;
    setEnderecos((prev) => prev.filter((x) => x.id !== id));
    // desvincular de fabricantes que usam esse endereço
    setFabricantes((prev) => prev.map((f) => (f.enderecoId === id ? { ...f, enderecoId: null } : f)));
  }

  // ---------- Helpers para UI ----------
  function findUnidadeNome(unidadeId) {
    return unidades.find((u) => u.id === Number(unidadeId))?.nome ?? "";
  }

  function findEndereco(enderecoId) {
    return enderecos.find((e) => e.id === Number(enderecoId)) ?? null;
  }

  // ---------- Render ----------
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

          <button
            onClick={() => setTab("config")}
            className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-all duration-200 border-b-4 ${
              tab === "config"
                ? "border-blue-600 text-blue-800 bg-white"
                : "border-transparent text-gray-400 hover:text-gray-600"
            }`}
          >
            Configurações
          </button>

          <button
            onClick={() => setTab("enderecos")}
            className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-all duration-200 border-b-4 ${
              tab === "enderecos"
                ? "border-blue-600 text-blue-800 bg-white"
                : "border-transparent text-gray-400 hover:text-gray-600"
            }`}
          >
            Endereços
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

                {/* Adicionar Características Técnicas */}
                <div className="mt-4">
                  <h3 className="text-md font-bold mb-2">Características Técnicas</h3>

                  <div className="flex gap-2 items-center">
                    <select
                      className="p-2 border rounded flex-1"
                      onChange={(e) => {
                        const id = Number(e.target.value);
                        if (!id) return;
                        const item = caracteristicas.find((c) => c.id === id);
                        if (!item) return;

                        // Evitar duplicado
                        if (equipamentoForm.caracteristicas.some((c) => c.id === id)) {
                          alert("Essa característica já foi adicionada!");
                          return;
                        }

                        // Adiciona um clone da característica com campo 'valor' vazio
                        setEquipamentoForm({
                          ...equipamentoForm,
                          caracteristicas: [
                            ...equipamentoForm.caracteristicas,
                            { ...item, valor: "" },
                          ],
                        });

                        // reset select (opcional)
                        e.target.value = "";
                      }}
                    >
                      <option value="">Selecione característica...</option>
                      {caracteristicas.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.nome} ({findUnidadeNome(c.unidadeId)})
                        </option>
                      ))}
                    </select>

                    <button
                      className="px-4 py-2 bg-blue-600 text-white rounded"
                      onClick={() => {
                        // quick way to open Configurações
                        setTab("config");
                      }}
                    >
                      + Nova característica
                    </button>
                  </div>

                  <ul className="mt-3 bg-gray-50 p-3 rounded border">
                    {equipamentoForm.caracteristicas.length === 0 && (
                      <li className="text-sm text-gray-500">Nenhuma característica adicionada.</li>
                    )}

                    {equipamentoForm.caracteristicas.map((c) => (
                      <li key={c.id} className="flex gap-3 items-center mb-2">
                        <div className="flex-1">
                          <div className="font-medium text-gray-800">
                            {c.nome} <span className="text-xs text-gray-500">({findUnidadeNome(c.unidadeId)})</span>
                          </div>
                          <input
                            className="mt-1 p-2 border rounded w-full"
                            placeholder={`Valor (${findUnidadeNome(c.unidadeId)})`}
                            value={c.valor ?? ""}
                            onChange={(e) => {
                              const newVal = e.target.value;
                              setEquipamentoForm((prev) => ({
                                ...prev,
                                caracteristicas: prev.caracteristicas.map((cc) =>
                                  cc.id === c.id ? { ...cc, valor: newVal } : cc
                                ),
                              }));
                            }}
                          />
                        </div>

                        <button
                          className="text-red-500 text-sm"
                          onClick={() =>
                            setEquipamentoForm({
                              ...equipamentoForm,
                              caracteristicas: equipamentoForm.caracteristicas.filter(
                                (x) => x.id !== c.id
                              ),
                            })
                          }
                        >
                          Remover
                        </button>
                      </li>
                    ))}
                  </ul>
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
                              {tiposEquipamentoMock.find((t) => t.id === e.tipoId)
                                ?.nome || "Não definido"}
                            </span>
                            <span className="flex items-center gap-1">
                              {fabricantes.find((f) => f.id === e.fabricanteId)?.nome ||
                                "Desconhecido"}
                            </span>
                          </div>

                          {/* Exibir características do equipamento na listagem */}
                          {e.caracteristicas && e.caracteristicas.length > 0 && (
                            <div className="mt-2 text-sm text-gray-600 flex flex-wrap gap-2">
                              {e.caracteristicas.map((c) => (
                                <span
                                  key={c.id}
                                  className="px-2 py-1 bg-gray-100 rounded text-xs"
                                >
                                  {c.nome}
                                  {c.valor ? `: ${c.valor}${findUnidadeNome(c.unidadeId) ? " " + findUnidadeNome(c.unidadeId) : ""}` : ""}
                                </span>
                              ))}
                            </div>
                          )}
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
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

                  {/* SELECT DE ENDEREÇOS (ou botão para novo endereço inline) */}
                  <div className="md:col-span-2 flex gap-2 items-center">
                    <select
                      className="p-3 bg-white border rounded outline-none focus:ring-2 focus:ring-blue-200 flex-1"
                      value={fabricanteForm.enderecoId ?? ""}
                      onChange={(e) =>
                        setFabricanteForm({
                          ...fabricanteForm,
                          enderecoId: e.target.value,
                        })
                      }
                    >
                      <option value="">Selecione um endereço cadastrado</option>
                      {enderecos.map((en) => (
                        <option key={en.id} value={en.id}>
                          {en.logradouro} — {en.cidade}/{en.estado}
                        </option>
                      ))}
                    </select>

                    <button
                      className="px-4 py-2 bg-blue-600 text-white rounded"
                      onClick={() => {
                        // abre o mini-form de endereço inline
                        setShowInlineEndereco((s) => !s);
                      }}
                    >
                      + Novo endereço
                    </button>
                  </div>

                  {/* Inline endereço (aparece quando user clica) */}
                  {showInlineEndereco && (
                    <div className="md:col-span-2 bg-gray-50 p-4 rounded border">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <input
                          placeholder="Logradouro"
                          className="p-2 border rounded col-span-2"
                          value={enderecoForm.logradouro}
                          onChange={(e) =>
                            setEnderecoForm({ ...enderecoForm, logradouro: e.target.value })
                          }
                        />

                        <input
                          placeholder="CEP"
                          className="p-2 border rounded"
                          value={enderecoForm.cep}
                          onChange={(e) =>
                            setEnderecoForm({ ...enderecoForm, cep: e.target.value })
                          }
                        />

                        <input
                          placeholder="Cidade"
                          className="p-2 border rounded"
                          value={enderecoForm.cidade}
                          onChange={(e) =>
                            setEnderecoForm({ ...enderecoForm, cidade: e.target.value })
                          }
                        />
                        <input
                          placeholder="Estado"
                          className="p-2 border rounded"
                          value={enderecoForm.estado}
                          onChange={(e) =>
                            setEnderecoForm({ ...enderecoForm, estado: e.target.value })
                          }
                        />
                      </div>

                      <div className="mt-3 flex gap-2">
                        <button
                          className="px-4 py-2 bg-blue-600 text-white rounded"
                          onClick={() => adicionarEndereco(false)}
                        >
                          + Salvar endereço e ligar ao fabricante
                        </button>
                        <button
                          className="px-4 py-2 bg-gray-100 rounded"
                          onClick={() => {
                            setShowInlineEndereco(false);
                            setEnderecoForm({
                              logradouro: "",
                              cidade: "",
                              estado: "",
                              cep: "",
                            });
                          }}
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Número + Complemento (sempre no formulário do fabricante) */}
                  <input
                    placeholder="Número"
                    className="p-3 bg-gray-50 border rounded outline-none focus:ring-2 focus:ring-blue-200"
                    value={fabricanteForm.numero}
                    onChange={(e) =>
                      setFabricanteForm({ ...fabricanteForm, numero: e.target.value })
                    }
                  />
                  <input
                    placeholder="Complemento"
                    className="p-3 bg-gray-50 border rounded outline-none focus:ring-2 focus:ring-blue-200"
                    value={fabricanteForm.complemento}
                    onChange={(e) =>
                      setFabricanteForm({ ...fabricanteForm, complemento: e.target.value })
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
                  placeholder="🔍 Pesquisar por nome, código ou endereço..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

                <div className="space-y-3">
                  {fabricantesFiltrados.length === 0 ? (
                    <div className="text-center py-10 bg-white rounded border border-dashed border-gray-300">
                      <p className="text-gray-400">Nenhum fabricante encontrado.</p>
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

                          <div className="text-sm text-gray-500">
                            <button
                              className="text-blue-600 text-sm"
                              onClick={() => {
                                // quick edit: preenche o formulário com os dados do fabricante
                                setFabricanteForm({
                                  codigo: f.codigo,
                                  nome: f.nome,
                                  cnpj: f.cnpj,
                                  enderecoId: f.enderecoId ?? "",
                                  numero: f.numero ?? "",
                                  complemento: f.complemento ?? "",
                                });
                                window.scrollTo({ top: 0, behavior: "smooth" });
                              }}
                            >
                              Editar
                            </button>
                          </div>
                        </div>

                        {f.enderecoId && findEndereco(f.enderecoId) && (
                          <div className="mt-3 text-sm text-gray-600 bg-blue-50/50 p-2 rounded border border-blue-100 flex items-center gap-2">
                            📍 {findEndereco(f.enderecoId).logradouro}
                            {f.numero ? `, ${f.numero}` : ""}{" "}
                            {f.complemento ? `- ${f.complemento}` : ""} •{" "}
                            {findEndereco(f.enderecoId).cidade} - {findEndereco(f.enderecoId).estado} • CEP:{" "}
                            {findEndereco(f.enderecoId).cep}
                          </div>
                        )}

                        {!f.enderecoId && (
                          <div className="mt-3 text-sm text-gray-500">Sem endereço associado</div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* --------- TAB CONFIGURAÇÕES (UNIDADES + CARACTERÍSTICAS) --------- */}
          {tab === "config" && (
            <div className="animate-fade-in space-y-8">
              {/* UNIDADE DE MEDIDA */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold text-gray-700 border-l-4 border-blue-500 pl-3">
                    Cadastro de Unidade de Medida
                  </h2>
                </div>

                <div className="flex gap-4 items-center">
                  <input
                    className="p-3 border bg-gray-50 rounded w-full"
                    placeholder="Ex: GB, GHz, W..."
                    value={unidadeForm.nome}
                    onChange={(e) => setUnidadeForm({ nome: e.target.value })}
                  />
                  <button
                    className="px-6 bg-blue-600 text-white rounded"
                    onClick={adicionarUnidade}
                  >
                    + Adicionar
                  </button>
                </div>

                <ul className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
                  {unidades.map((u) => (
                    <li
                      key={u.id}
                      className="text-gray-700 border p-2 rounded flex justify-between items-center"
                    >
                      <span>{u.nome}</span>
                      <button
                        className="text-red-500 text-sm"
                        onClick={() => setUnidades((prev) => prev.filter((x) => x.id !== u.id))}
                      >
                        x
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CARACTERÍSTICA TÉCNICA */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold text-gray-700 border-l-4 border-blue-500 pl-3">
                    Cadastro de Característica Técnica
                  </h2>

                  <div className="text-sm text-gray-500">Total: {caracteristicas.length}</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    className="p-3 border bg-gray-50 rounded col-span-2"
                    placeholder="Nome da característica (ex: Processador)"
                    value={caracteristicaForm.nome}
                    onChange={(e) =>
                      setCaracteristicaForm({
                        ...caracteristicaForm,
                        nome: e.target.value,
                      })
                    }
                  />

                  <select
                    className="p-3 border bg-white rounded"
                    value={caracteristicaForm.unidadeId}
                    onChange={(e) =>
                      setCaracteristicaForm({
                        ...caracteristicaForm,
                        unidadeId: e.target.value,
                      })
                    }
                  >
                    <option value="">Selecione a unidade</option>
                    {unidades.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.nome}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-4 flex gap-3">
                  <button
                    className="px-6 py-2 bg-blue-600 text-white rounded"
                    onClick={adicionarCaracteristica}
                  >
                    + Adicionar Característica
                  </button>

                  <button
                    className="px-6 py-2 bg-gray-100 rounded"
                    onClick={() => {
                      setCaracteristicaForm({ nome: "", unidadeId: "" });
                    }}
                  >
                    Limpar
                  </button>
                </div>

                <ul className="mt-4 space-y-2">
                  {caracteristicas.map((c) => (
                    <li
                      key={c.id}
                      className="border p-3 rounded bg-gray-50 flex justify-between items-center"
                    >
                      <div>
                        <strong>{c.nome}</strong>
                        <div className="text-xs text-gray-500">
                          Unidade: {findUnidadeNome(c.unidadeId)}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          className="text-sm text-red-500"
                          onClick={() => removerCaracteristicaGlobal(c.id)}
                        >
                          Remover
                        </button>
                        <button
                          className="text-sm text-blue-600"
                          onClick={() => {
                            // editar rápido: preencher o form para edição (simples)
                            setCaracteristicaForm({
                              nome: c.nome,
                              unidadeId: c.unidadeId,
                            });
                            // opcionalmente remover enquanto edita
                            setCaracteristicas((prev) => prev.filter((x) => x.id !== c.id));
                          }}
                        >
                          Editar
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* --------- TAB ENDEREÇOS --------- */}
          {tab === "enderecos" && (
            <div className="animate-fade-in space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold text-gray-700 border-l-4 border-blue-500 pl-3">
                    Endereços Cadastrados
                  </h2>

                  <div className="text-sm text-gray-500">Total: {enderecos.length}</div>
                </div>

                {/* Form de endereço (global) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <input
                    placeholder="Logradouro"
                    className="p-2 border rounded col-span-2"
                    value={enderecoForm.logradouro}
                    onChange={(e) => setEnderecoForm({ ...enderecoForm, logradouro: e.target.value })}
                  />
                  <input
                    placeholder="CEP"
                    className="p-2 border rounded"
                    value={enderecoForm.cep}
                    onChange={(e) => setEnderecoForm({ ...enderecoForm, cep: e.target.value })}
                  />

                  <input
                    placeholder="Cidade"
                    className="p-2 border rounded"
                    value={enderecoForm.cidade}
                    onChange={(e) => setEnderecoForm({ ...enderecoForm, cidade: e.target.value })}
                  />
                  <input
                    placeholder="Estado"
                    className="p-2 border rounded"
                    value={enderecoForm.estado}
                    onChange={(e) => setEnderecoForm({ ...enderecoForm, estado: e.target.value })}
                  />
                </div>

                <div className="mt-3 flex gap-2">
                  <button
                    className="px-6 py-2 bg-blue-600 text-white rounded"
                    onClick={() => adicionarEndereco(true)}
                  >
                    + Adicionar Endereço
                  </button>
                  <button
                    className="px-6 py-2 bg-gray-100 rounded"
                    onClick={() =>
                      setEnderecoForm({
                        logradouro: "",
                        cidade: "",
                        estado: "",
                        cep: "",
                      })
                    }
                  >
                    Limpar
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {enderecos.length === 0 ? (
                  <div className="text-center py-10 bg-white rounded border border-dashed border-gray-300">
                    <p className="text-gray-400">Nenhum endereço cadastrado.</p>
                  </div>
                ) : (
                  enderecos.map((en) => (
                    <div key={en.id} className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm flex justify-between items-center">
                      <div>
                        <div className="font-medium text-gray-800">{en.logradouro}</div>
                        <div className="text-sm text-gray-500">{en.cidade} - {en.estado} • CEP: {en.cep}</div>
                      </div>

                      <div className="flex gap-2 items-center">
                        <button
                          className="text-sm text-blue-600"
                          onClick={() => {
                            // pré-visualizar/editar no form principal de endereços
                            setEnderecoForm({
                              logradouro: en.logradouro,
                              cidade: en.cidade,
                              estado: en.estado,
                              cep: en.cep,
                            });
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                        >
                          Editar
                        </button>

                        <button
                          className="text-sm text-red-500"
                          onClick={() => removerEnderecoGlobal(en.id)}
                        >
                          Remover
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
