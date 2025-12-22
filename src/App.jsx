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
  const [fabricantes, setFabricantes] = useState([]);
  const [equipamentos, setEquipamentos] = useState([]);
  const [tiposEquipamento, setTiposEquipamento] = useState([]);

  // Endereços (centralizados) — sem número/complemento
  const [enderecos, setEnderecos] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [bairros, setBairros] = useState([]);
  const [logradouros, setLogradouros] = useState([]);
  const [ddds, setDdds] = useState([]);
  const [ddis, setDdis] = useState([]);

  // Novos dados: unidades e características técnicas
  const [unidades, setUnidades] = useState([
  ]);

  const [caracteristicas, setCaracteristicas] = useState([
  ]);

  // Pesquisa
  const [search, setSearch] = useState("");

  // Efeito para limpar a busca ao trocar de aba (Correção de Bug Visual)
  useEffect(() => {
    setSearch("");

    async function carregarDados() {
      try {
        const [
          respFabricantes,
          respEquipamentos,
          respUnidades,
          respCaracteristicas,
          respEnderecos,
          respTipos,
          respCidades,
          respBairros,
          respLogradouros,
          respDdds,
          respDdis
        ] = await Promise.all([
          fetch("http://34.9.38.255:8080/tecnico/fabricante"),
          fetch("http://34.9.38.255:8080/tecnico/equipamento"),
          fetch("http://34.9.38.255:8080/tecnico/unidade-medida"),
          fetch("http://34.9.38.255:8080/tecnico/caracteristica-tecnica"),
          fetch("http://34.9.38.255:8080/tecnico/endereco"),
          fetch("http://34.9.38.255:8080/tecnico/tipo-equipamento"),
          fetch("http://34.9.38.255:8080/tecnico/cidade"),
          fetch("http://34.9.38.255:8080/tecnico/bairro"),
          fetch("http://34.9.38.255:8080/tecnico/logradouro"),
          fetch("http://34.9.38.255:8080/tecnico/ddd"),
          fetch("http://34.9.38.255:8080/tecnico/ddi")
        ]);

        const fabricantesData = await respFabricantes.json();
        const equipamentosData = await respEquipamentos.json();
        const unidadesData = await respUnidades.json();
        const caracteristicasData = await respCaracteristicas.json();
        const enderecosData = await respEnderecos.json();
        const tiposData = await respTipos.json();
        const cidadesData = await respCidades.json();
        const bairrosData = await respBairros.json();
        const logradourosData = await respLogradouros.json();
        const dddsData = await respDdds.json();
        const ddisData = await respDdis.json();

        setFabricantes(fabricantesData);
        setEquipamentos(equipamentosData);
        setUnidades(unidadesData);
        setCaracteristicas(caracteristicasData);
        setEnderecos(enderecosData);
        setTiposEquipamento(tiposData);
        setCidades(cidadesData);
        setBairros(bairrosData);
        setLogradouros(logradourosData);
        setDdds(dddsData);
        setDdis(ddisData);
      } catch (e) {
        console.error("Erro ao carregar dados iniciais:", e.message);
        // Carrega dados mockados como fallback
        setEnderecos(enderecosMock);
        setTiposEquipamento(tiposEquipamentoMock);
      }
    }

    carregarDados();
  }, []);

  // Forms existentes
  const [fabricanteForm, setFabricanteForm] = useState({
    codigo: "",
    nome: "",
    cnpj: "",
    enderecoId: "",
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
  });

  // Novo form para tipo de equipamento
  const [tipoEquipamentoForm, setTipoEquipamentoForm] = useState({ nome: "" });

  // Novo form para fabricante (simplificado para POST)
  const [fabricanteAPIForm, setFabricanteAPIForm] = useState({
    nome: "",
    nomeSocial: "",
    cnpj: "",
    enderecoResidencial: {
      endereco: { id: "" },
      complemento: "",
      nroCasa: ""
    },
    fones: [],
    emails: []
  });

  // Novo form para endereço
  const [enderecoAPIForm, setEnderecoAPIForm] = useState({
    cep: "",
    cidadeId: "",
    bairroId: "",
    logradouroId: ""
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
    const logradouro = enderecoObj?.logradouro 
      ? (typeof enderecoObj.logradouro === 'object' ? enderecoObj.logradouro?.nome : enderecoObj.logradouro).toLowerCase() 
      : "";
    const cidade = enderecoObj?.cidade 
      ? (typeof enderecoObj.cidade === 'object' ? enderecoObj.cidade?.nome : enderecoObj.cidade).toLowerCase() 
      : "";
    const estado = enderecoObj?.estado 
      ? (typeof enderecoObj.estado === 'object' ? enderecoObj.estado?.sigla : enderecoObj.estado).toLowerCase() 
      : "";

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

  async function cadastrarEquipamento() {
    if (!equipamentoForm.nome || !equipamentoForm.codigo) {
      alert("Preencha ao menos Código e Nome.");
      return;
  }

  const payload = {
    id: Date.now(), // Gera um ID temporário (o backend pode sobrescrever)
    nome: equipamentoForm.nome,
    fabricante: {
      id: Number(equipamentoForm.fabricanteId)
    },
    tipoEquipamento: {
      id: Number(equipamentoForm.tipoId)
    },
    caracteristicasTecnicas: equipamentoForm.caracteristicas.map((c) => {
      // Se não houver unidadeId, tenta encontrar uma unidade padrão ou deixa null
      const unidadeId = c.unidadeId || (unidades.length > 0 ? unidades[0].id : 1);
      return {
        unidadeMedida: { id: unidadeId },
        caracteristicaTecnica: { id: Number(c.id) },
        valor: Number(c.valor ?? 0)
      };
    })
  };

  try {
    const resp = await fetch(
      "http://34.9.38.255:8080/tecnico/equipamento/cadastrar",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      }
    );

    if (!resp.ok) {
      const txt = await resp.text();
      alert("Erro ao salvar equipamento: " + txt);
      return;
    }

    const salvo = await resp.json();
    // Atualiza lista com o que veio do backend
    setEquipamentos((prev) => [...prev, salvo]);
    alert("Equipamento cadastrado!");
    setEquipamentoForm({
      codigo: "",
      nome: "",
      tipoId: "",
      fabricanteId: "",
      caracteristicas: []
    });
  } catch (e) {
    alert("Erro de rede ao salvar equipamento: " + e.message);
  }
}

  // ---------- Funções para Unidades e Características ----------
  async function adicionarUnidade() {
    if (!unidadeForm.nome.trim()) {
      alert("Digite o nome da unidade");
      return;
    }

    const payload = { nome: unidadeForm.nome.trim() };

    try {
      const resp = await fetch(
        "http://34.9.38.255:8080/tecnico/unidade-medida/cadastrar",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }
      );

      if (!resp.ok) {
        const txt = await resp.text();
        console.error("Erro ao cadastrar unidade:", txt);
        const errorMsg = txt.includes("<!doctype") ? "Erro no servidor - verifique o console" : txt;
        alert("Erro ao cadastrar unidade: " + errorMsg.substring(0, 200));
        return;
      }

      const salvo = await resp.json();
      setUnidades((prev) => [...prev, salvo]); // usa o id do backend
      setUnidadeForm({ nome: "" });
      alert("Unidade cadastrada com sucesso!");
    } catch (e) {
      console.error("Erro de rede ao cadastrar unidade:", e);
      alert("Erro de rede ao cadastrar unidade: " + e.message);
    }
  }

  async function adicionarCaracteristica() {
    if (!caracteristicaForm.nome) {
      alert("Preencha o nome da característica");
      return;
    }

    const payload = {
      nome: caracteristicaForm.nome.trim()
    };

    try {
      const resp = await fetch(
        "http://34.9.38.255:8080/tecnico/caracteristica-tecnica/cadastrar",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }
      );

      if (!resp.ok) {
        const txt = await resp.text();
        console.error("Erro ao cadastrar característica:", txt);
        // Tenta extrair apenas a mensagem de erro se for HTML
        const errorMsg = txt.includes("<!doctype") 
          ? "Erro no servidor - verifique o console do navegador" 
          : txt;
        alert("Erro ao cadastrar característica:\n" + errorMsg.substring(0, 200));
        return;
      }

      const salvo = await resp.json();
      setCaracteristicas((prev) => [...prev, salvo]); // usa o id do backend
      setCaracteristicaForm({ nome: "" });
      alert("Característica cadastrada com sucesso!");
    } catch (e) {
      console.error("Erro de rede ao cadastrar característica:", e);
      alert("Erro de rede ao cadastrar característica: " + e.message);
    }
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

  // ---------- Funções para Tipo de Equipamento ----------
  async function adicionarTipoEquipamento() {
    if (!tipoEquipamentoForm.nome.trim()) {
      alert("Digite o nome do tipo de equipamento");
      return;
    }

    const payload = { nome: tipoEquipamentoForm.nome.trim() };

    try {
      const resp = await fetch(
        "http://34.9.38.255:8080/tecnico/tipo-equipamento/cadastrar",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }
      );

      if (!resp.ok) {
        const txt = await resp.text();
        console.error("Erro ao cadastrar tipo de equipamento:", txt);
        const errorMsg = txt.includes("<!doctype") ? "Erro no servidor - verifique o console" : txt;
        alert("Erro ao cadastrar tipo de equipamento: " + errorMsg.substring(0, 200));
        return;
      }

      const salvo = await resp.json();
      setTiposEquipamento((prev) => [...prev, salvo]);
      setTipoEquipamentoForm({ nome: "" });
      alert("Tipo de equipamento cadastrado com sucesso!");
    } catch (e) {
      console.error("Erro de rede ao cadastrar tipo de equipamento:", e);
      alert("Erro de rede ao cadastrar tipo de equipamento: " + e.message);
    }
  }

  // ---------- Funções para Fabricante (API) ----------
  async function adicionarFabricanteAPI() {
    if (!fabricanteAPIForm.nome.trim()) {
      alert("Digite o nome do fabricante");
      return;
    }

    const payload = {
      nome: fabricanteAPIForm.nome.trim(),
      nomeSocial: fabricanteAPIForm.nomeSocial.trim(),
      cnpj: fabricanteAPIForm.cnpj.trim(),
      enderecoResidencial: fabricanteAPIForm.enderecoResidencial,
      fones: fabricanteAPIForm.fones,
      emails: fabricanteAPIForm.emails
    };

    try {
      const resp = await fetch(
        "http://34.9.38.255:8080/tecnico/fabricante/cadastrar",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }
      );

      if (!resp.ok) {
        const txt = await resp.text();
        console.error("Erro ao cadastrar fabricante:", txt);
        const errorMsg = txt.includes("<!doctype") ? "Erro no servidor - verifique o console" : txt;
        alert("Erro ao cadastrar fabricante: " + errorMsg.substring(0, 200));
        return;
      }

      const salvo = await resp.json();
      setFabricantes((prev) => [...prev, salvo]);
      setFabricanteAPIForm({
        nome: "",
        nomeSocial: "",
        cnpj: "",
        enderecoResidencial: {
          endereco: { id: "" },
          complemento: "",
          nroCasa: ""
        },
        fones: [],
        emails: []
      });
      alert("Fabricante cadastrado com sucesso!");
    } catch (e) {
      console.error("Erro de rede ao cadastrar fabricante:", e);
      alert("Erro de rede ao cadastrar fabricante: " + e.message);
    }
  }

  // ---------- Funções para Endereço (API) ----------
  async function adicionarEnderecoAPI() {
    if (!enderecoAPIForm.cep || !enderecoAPIForm.cidadeId || !enderecoAPIForm.bairroId || !enderecoAPIForm.logradouroId) {
      alert("Preencha todos os campos do endereço");
      return;
    }

    const payload = {
      cep: enderecoAPIForm.cep.trim(),
      cidade: { id: Number(enderecoAPIForm.cidadeId) },
      bairro: { id: Number(enderecoAPIForm.bairroId) },
      logradouro: { id: Number(enderecoAPIForm.logradouroId) }
    };

    try {
      const resp = await fetch(
        "http://34.9.38.255:8080/tecnico/endereco/cadastrar",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }
      );

      if (!resp.ok) {
        const txt = await resp.text();
        const errorMsg = txt.includes("<!doctype") ? "Erro no servidor - verifique o console" : txt;
        alert("Erro ao cadastrar endereço: " + errorMsg.substring(0, 200));
        return;
      }

      const salvo = await resp.json();
      setEnderecos((prev) => [...prev, salvo]);
      setEnderecoAPIForm({
        cep: "",
        cidadeId: "",
        bairroId: "",
        logradouroId: ""
      });
      alert("Endereço cadastrado com sucesso!");
    } catch (e) {
      alert("Erro de rede ao cadastrar endereço: " + e.message);
    }
  }

  // ---------- Funções de Endereços (Local) ----------
  function adicionarEndereco(global = true) {
    // Mantido para compatibilidade com código antigo
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
            onClick={() => setTab("tipos")}
            className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-all duration-200 border-b-4 ${
              tab === "tipos"
                ? "border-blue-600 text-blue-800 bg-white"
                : "border-transparent text-gray-400 hover:text-gray-600"
            }`}
          >
            Tipos
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
                    {tiposEquipamento.length > 0 ? (
                      tiposEquipamento.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.nome}
                        </option>
                      ))
                    ) : (
                      tiposEquipamentoMock.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.nome}
                        </option>
                      ))
                    )}
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
                        // Garante que unidadeId está presente
                        setEquipamentoForm({
                          ...equipamentoForm,
                          caracteristicas: [
                            ...equipamentoForm.caracteristicas,
                            { 
                              id: item.id,
                              nome: item.nome,
                              unidadeId: item.unidadeId,
                              valor: ""
                            },
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
                          <div className="text-sm text-gray-500 mt-1 flex gap-3 flex-wrap">
                            <span className="flex items-center gap-1">
                              🏷️{" "}
                              {typeof e.tipoEquipamento === 'object' 
                                ? e.tipoEquipamento?.nome 
                                : (tiposEquipamento.find((t) => t.id === e.tipoId)?.nome ||
                                   tiposEquipamentoMock.find((t) => t.id === e.tipoId)?.nome ||
                                   "Não definido")}
                            </span>
                            <span className="flex items-center gap-1">
                              {typeof e.fabricante === 'object' 
                                ? e.fabricante?.nome 
                                : (fabricantes.find((f) => f.id === e.fabricanteId)?.nome ||
                                   "Desconhecido")}
                            </span>
                          </div>

                          {/* Exibir características do equipamento na listagem */}
                          {e.caracteristicasTecnicas && e.caracteristicasTecnicas.length > 0 && (
                            <div className="mt-2 text-sm text-gray-600 flex flex-wrap gap-2">
                              {e.caracteristicasTecnicas.map((c, idx) => {
                                const caracName = typeof c.caracteristicaTecnica === 'object' 
                                  ? c.caracteristicaTecnica?.nome 
                                  : caracteristicas.find(char => char.id === c.id)?.nome;
                                const unidadeName = typeof c.unidadeMedida === 'object' 
                                  ? c.unidadeMedida?.nome 
                                  : unidades.find(u => u.id === c.unidadeMedida?.id)?.nome;
                                return (
                                  <span
                                    key={idx}
                                    className="px-2 py-1 bg-blue-100 text-blue-900 rounded text-xs"
                                  >
                                    {caracName || "Característica"}
                                    {c.valor ? `: ${c.valor}${unidadeName ? " " + unidadeName : ""}` : ""}
                                  </span>
                                );
                              })}
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
                          {typeof en.logradouro === 'object' ? en.logradouro?.nome : en.logradouro} — {typeof en.cidade === 'object' ? en.cidade?.nome : en.cidade}/{typeof en.estado === 'object' ? en.estado?.sigla : en.estado}
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
                            📍 {typeof findEndereco(f.enderecoId).logradouro === 'object' ? findEndereco(f.enderecoId).logradouro?.nome : findEndereco(f.enderecoId).logradouro}
                            {f.numero ? `, ${f.numero}` : ""}{" "}
                            {f.complemento ? `- ${f.complemento}` : ""} •{" "}
                            {typeof findEndereco(f.enderecoId).cidade === 'object' ? findEndereco(f.enderecoId).cidade?.nome : findEndereco(f.enderecoId).cidade} - {typeof findEndereco(f.enderecoId).estado === 'object' ? findEndereco(f.enderecoId).estado?.sigla : findEndereco(f.enderecoId).estado} • CEP:{" "}
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

                <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                  <input
                    className="p-3 border bg-gray-50 rounded"
                    placeholder="Nome da característica (ex: Processador, Corrente, Velocidade)"
                    value={caracteristicaForm.nome}
                    onChange={(e) =>
                      setCaracteristicaForm({
                        ...caracteristicaForm,
                        nome: e.target.value,
                      })
                    }
                  />
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
                      setCaracteristicaForm({ nome: "" });
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
                              nome: c.nome
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

          {/* --------- TAB TIPOS DE EQUIPAMENTO --------- */}
          {tab === "tipos" && (
            <div className="animate-fade-in space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold text-gray-700 border-l-4 border-blue-500 pl-3">
                    Cadastro de Tipo de Equipamento
                  </h2>
                  <div className="text-sm text-gray-500">Total: {tiposEquipamento.length}</div>
                </div>

                <div className="flex gap-4 items-center">
                  <input
                    className="p-3 border bg-gray-50 rounded w-full"
                    placeholder="Ex: Notebook, Desktop, Monitor..."
                    value={tipoEquipamentoForm.nome}
                    onChange={(e) => setTipoEquipamentoForm({ nome: e.target.value })}
                  />
                  <button
                    className="px-6 bg-blue-600 text-white rounded"
                    onClick={adicionarTipoEquipamento}
                  >
                    + Adicionar
                  </button>
                </div>

                <ul className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
                  {tiposEquipamento.map((t) => (
                    <li
                      key={t.id}
                      className="text-gray-700 border p-2 rounded flex justify-between items-center"
                    >
                      <span>{t.nome}</span>
                    </li>
                  ))}
                </ul>

                {tiposEquipamento.length === 0 && (
                  <div className="text-center py-10 text-gray-400">
                    Nenhum tipo de equipamento cadastrado.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* --------- TAB ENDEREÇOS --------- */}
          {tab === "enderecos" && (
            <div className="animate-fade-in space-y-6">
              {/* ENDEREÇO COM DADOS DA API */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold text-gray-700 border-l-4 border-blue-500 pl-3">
                    Cadastrar Novo Endereço (API)
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    placeholder="CEP (ex: 01000-000)"
                    className="p-3 border rounded bg-gray-50"
                    value={enderecoAPIForm.cep}
                    onChange={(e) => setEnderecoAPIForm({ ...enderecoAPIForm, cep: e.target.value })}
                  />

                  <select
                    className="p-3 border rounded bg-white"
                    value={enderecoAPIForm.cidadeId}
                    onChange={(e) => setEnderecoAPIForm({ ...enderecoAPIForm, cidadeId: e.target.value })}
                  >
                    <option value="">Selecione Cidade</option>
                    {cidades.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.nome || `Cidade ${c.id}`}
                      </option>
                    ))}
                  </select>

                  <select
                    className="p-3 border rounded bg-white"
                    value={enderecoAPIForm.bairroId}
                    onChange={(e) => setEnderecoAPIForm({ ...enderecoAPIForm, bairroId: e.target.value })}
                  >
                    <option value="">Selecione Bairro</option>
                    {bairros.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.nome || `Bairro ${b.id}`}
                      </option>
                    ))}
                  </select>

                  <select
                    className="p-3 border rounded bg-white"
                    value={enderecoAPIForm.logradouroId}
                    onChange={(e) => setEnderecoAPIForm({ ...enderecoAPIForm, logradouroId: e.target.value })}
                  >
                    <option value="">Selecione Logradouro</option>
                    {logradouros.map((l) => (
                      <option key={l.id} value={l.id}>
                        {l.nome || `Logradouro ${l.id}`}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-4 flex gap-2">
                  <button
                    className="px-6 py-2 bg-blue-600 text-white rounded"
                    onClick={adicionarEnderecoAPI}
                  >
                    + Adicionar Endereço
                  </button>
                  <button
                    className="px-6 py-2 bg-gray-100 rounded"
                    onClick={() => setEnderecoAPIForm({ cep: "", cidadeId: "", bairroId: "", logradouroId: "" })}
                  >
                    Limpar
                  </button>
                </div>
              </div>

              {/* LISTAGEM DE ENDEREÇOS */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold text-gray-700 border-l-4 border-blue-500 pl-3">
                    Endereços Cadastrados
                  </h2>
                  <div className="text-sm text-gray-500">Total: {enderecos.length}</div>
                </div>

                <div className="space-y-3">
                  {enderecos.length === 0 ? (
                    <div className="text-center py-10 text-gray-400">
                      Nenhum endereço cadastrado.
                    </div>
                  ) : (
                    enderecos.map((en) => (
                      <div key={en.id} className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                        <div>
                          {en.logradouro && <div className="font-medium text-gray-800">{typeof en.logradouro === 'object' ? en.logradouro?.nome : en.logradouro}</div>}
                          <div className="text-sm text-gray-500">
                            {en.cidade && `${typeof en.cidade === 'object' ? en.cidade?.nome : en.cidade} `}
                            {en.estado && `- ${typeof en.estado === 'object' ? en.estado?.sigla : en.estado} `}
                            {en.cep && `• CEP: ${en.cep}`}
                          </div>
                        </div>
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
