import React, { useState, useEffect, useRef } from "react";
import { chatbotGet } from "./services/api";

export default function ChatbotPage() {
  const [mensagens, setMensagens] = useState([]);
  const [texto, setTexto] = useState("");
  const [loading, setLoading] = useState(false);
  const fimRef = useRef(null);

  useEffect(() => {
    fimRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensagens]);

  async function enviarMensagem() {
    if (!texto.trim() || loading) return;

    const textoUsuario = texto;

    setMensagens((prev) => [
      ...prev,
      { autor: "usuario", texto: textoUsuario },
    ]);

    setTexto("");
    setLoading(true);

    try {
      const resposta = await chatbotGet(textoUsuario);

      setMensagens((prev) => [...prev, { autor: "bot", resposta }]);
    } catch (err) {
      setMensagens((prev) => [
        ...prev,
        {
          autor: "bot",
          resposta: {
            mensagemPadrao: "Erro ao consultar o chatbot.",
          },
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  // --- RENDERIZADORES GENÉRICOS DE LISTA ---

  function renderGenericList(dados, titleSingular, titlePlural, renderItem) {
    if (!dados || dados.length === 0) {
      return <p>Nenhum item encontrado.</p>;
    }
    const lista = Array.isArray(dados) ? dados : [dados];
    return (
      <div className="space-y-2">
        <p className="font-semibold">
          {lista.length === 1 ? titleSingular : titlePlural}
        </p>
        <ul className="space-y-1">{lista.map(renderItem)}</ul>
      </div>
    );
  }

  // --- RENDERIZADORES ESPECÍFICOS ---

  function renderClientes(dados) {
    return renderGenericList(
      dados,
      "Cliente encontrado:",
      "Clientes cadastrados:",
      (c) => (
        <li key={c.id} className="border rounded p-2 text-sm bg-gray-50">
          <p><strong>ID:</strong> {c.id}</p>
          <p><strong>Nome:</strong> {c.primeiroNome} {c.sobreNome}</p>
          <p><strong>CPF:</strong> {c.cpf}</p>
        </li>
      )
    );
  }

  function renderEquipamentos(dados) {
    return renderGenericList(
      dados,
      "Equipamento encontrado:",
      "Equipamentos disponíveis:",
      (e) => (
        <li key={e.id} className="border rounded p-2 text-sm bg-gray-50">
          <p><strong>ID:</strong> {e.id}</p>
          <p><strong>Nome:</strong> {e.nome}</p>
          <p><strong>Tipo:</strong> {e.tipoEquipamento?.nome}</p>
          <p><strong>Valor diária:</strong> R$ {e.valorDiaria}</p>
          {e.caracteristicasTecnicas && e.caracteristicasTecnicas.length > 0 && (
             <p className="mt-1 text-xs text-gray-600">
               <strong>Características:</strong>{" "}
               {e.caracteristicasTecnicas.map(ct => 
                 `${ct.caracteristicaTecnica?.nome}: ${ct.valor} ${ct.unidadeMedida?.nome}`
               ).join(", ")}
             </p>
          )}
        </li>
      )
    );
  }

  function renderAlugueis(dados) {
    return renderGenericList(
      dados,
      "Aluguel encontrado:",
      "Aluguéis cadastrados:",
      (p) => (
        <li key={p.id} className="border rounded p-2 text-sm bg-gray-50">
          <p><strong>Nº Aluguel:</strong> {p.nroAluguel}</p>
          <p><strong>Cliente:</strong> {p.cliente?.primeiroNome} {p.cliente?.sobreNome}</p>
          <p><strong>Equipamento:</strong> {p.equipamento?.nome}</p>
          <p><strong>Período:</strong> {p.dataInicioLocacao} → {p.dataPrevistoDevolucao}</p>
          <p><strong>Valor Total:</strong> R$ {p.valorLocacao}</p>
        </li>
      )
    );
  }

  function renderTipos(dados) {
    return renderGenericList(
      dados,
      "Tipo de Equipamento:",
      "Tipos de Equipamento:",
      (t) => (
        <li key={t.id} className="border rounded p-2 text-sm bg-gray-50">
          <p><strong>ID:</strong> {t.id}</p>
          <p><strong>Nome:</strong> {t.nome}</p>
        </li>
      )
    );
  }

  function renderEnderecos(dados) {
    return renderGenericList(
      dados,
      "Endereço encontrado:",
      "Endereços encontrados:",
      (en) => (
        <li key={en.id} className="border rounded p-2 text-sm bg-gray-50">
          <p><strong>ID:</strong> {en.id}</p>
          <p>
            {en.logradouro?.nome || en.logradouro}, {en.numero} {en.complemento}
          </p>
          <p>
            {en.bairro?.nome || en.bairro} - {en.cidade?.nome || en.cidade}/{en.estado?.sigla || en.estado}
          </p>
          <p><strong>CEP:</strong> {en.cep}</p>
        </li>
      )
    );
  }

  function renderSimples(dados, tituloSingular, tituloPlural) {
    return renderGenericList(
      dados,
      tituloSingular,
      tituloPlural,
      (item) => (
        <li key={item.id} className="border rounded p-2 text-sm bg-gray-50">
          <p><strong>ID:</strong> {item.id}</p>
          <p><strong>Nome:</strong> {item.nome}</p>
        </li>
      )
    );
  }

  function renderCaracteristicas(dados) {
    return renderSimples(dados, "Característica encontrada:", "Características Técnicas:");
  }

  function renderFabricantes(dados) {
    return renderGenericList(
      dados,
      "Fabricante encontrado:",
      "Fabricantes cadastrados:",
      (f) => (
        <li key={f.id} className="border rounded p-2 text-sm bg-gray-50">
          <p><strong>ID:</strong> {f.id}</p>
          <p><strong>Nome:</strong> {f.nome}</p>
          {f.cnpj && <p><strong>CNPJ:</strong> {f.cnpj}</p>}
        </li>
      )
    );
  }

  function renderUnidades(dados) {
    return renderSimples(dados, "Unidade encontrada:", "Unidades de Medida:");
  }

  function renderEnderecoExterno(dados) {
    // Endereço externo via CEP geralmente vem um objeto único
    const item = Array.isArray(dados) ? dados[0] : dados;
    if (!item) return <p>CEP não encontrado.</p>;

    return (
      <div className="border rounded p-2 text-sm bg-gray-50">
        <p className="font-bold mb-1">Endereço (Outros Sistemas):</p>
        <p>{item.logradouro}, {item.bairro}</p>
        <p>{item.localidade}/{item.uf}</p>
        <p><strong>CEP:</strong> {item.cep}</p>
      </div>
    );
  }

  // --- SWITCH PRINCIPAL ---

  function renderRespostaBot(resposta) {
    if (resposta.mensagemPadrao) {
      return <p>{resposta.mensagemPadrao}</p>;
    }

    const { intencao, dados } = resposta;

    switch (intencao) {
      // --- ALUGUEL: CLIENTES ---
      case "CONSULTAR_ALUGUEL_CLIENTES":
      case "CONSULTAR_ALUGUEL_CLIENTES_ID":
        return renderClientes(dados);

      // --- ALUGUEL: EQUIPAMENTOS ---
      case "CONSULTAR_ALUGUEL_EQUIPAMENTO":
      case "CONSULTAR_ALUGUEL_EQUIPAMENTO_ID":
        return renderEquipamentos(dados); // Reutiliza renderEquipamentos (camada de aluguel pode ter campos extras, mas ok)

      // --- ALUGUEL: PEDIDOS ---
      case "CONSULTAR_ALUGUEL_PEDIDO_ALUGUEL_EQUIPAMENTO":
      case "CONSULTAR_ALUGUEL_PEDIDO_ALUGUEL_EQUIPAMENTO_ID":
        return renderAlugueis(dados);

      // --- ALUGUEL: TIPOS DE EQUIPAMENTO ---
      case "CONSULTAR_ALUGUEL_TIPO_EQUIPAMENTO":
      case "CONSULTAR_ALUGUEL_TIPO_EQUIPAMENTO_ID":
        return renderTipos(dados);

      // --- ALUGUEL: ENDEREÇOS ---
      case "CONSULTAR_ALUGUEL_ENDERECOS":
      case "CONSULTAR_ALUGUEL_ENDERECO_CEP":
      case "CONSULTAR_ALUGUEL_ENDERECO_ID":
        return renderEnderecos(dados);
      
      case "CONSULTAR_ALUGUEL_BAIRROS":
        return renderSimples(dados, "Bairro encontrado:", "Bairros:");
      case "CONSULTAR_ALUGUEL_CIDADES":
      case "CONSULTAR_ALUGUEL_CIDADE_ID":
        return renderSimples(dados, "Cidade encontrada:", "Cidades:");
      case "CONSULTAR_ALUGUEL_LOGRADOUROS":
        return renderSimples(dados, "Logradouro encontrado:", "Logradouros:");

      // --- TÉCNICO: EQUIPAMENTOS ---
      case "CONSULTAR_CARACTERISTICAS_EQUIPAMENTO":
      case "CONSULTAR_CARACTERISTICAS_EQUIPAMENTO_ID":
        return renderEquipamentos(dados);

      // --- TÉCNICO: TIPOS DE EQUIPAMENTO ---
      case "CONSULTAR_CARACTERISTICAS_TIPO_EQUIPAMENTO":
      case "CONSULTAR_CARACTERISTICAS_TIPO_EQUIPAMENTO_ID":
        return renderTipos(dados);

      // --- TÉCNICO: CARACTERÍSTICAS TÉCNICAS ---
      case "CONSULTAR_CARACTERISTICAS_CARACTERISTICAS_TECNICAS":
      case "CONSULTAR_CARACTERISTICAS_CARACTERISTICAS_TECNICAS_ID":
        return renderCaracteristicas(dados);

      // --- TÉCNICO: FABRICANTES ---
      case "CONSULTAR_CARACTERISTICAS_FABRICANTE":
      case "CONSULTAR_CARACTERISTICAS_FABRICANTE_ID":
        return renderFabricantes(dados);

      // --- TÉCNICO: UNIDADES DE MEDIDA ---
      case "CONSULTAR_CARACTERISTICAS_UNIDADE_MEDIDA":
      case "CONSULTAR_CARACTERISTICAS_UNIDADE_MEDIDA_ID":
        return renderUnidades(dados);

      // --- TÉCNICO: ENDEREÇOS ---
      case "CONSULTAR_CARACTERISTICAS_ENDERECOS":
      case "CONSULTAR_CARACTERISTICAS_ENDERECO_CEP":
      case "CONSULTAR_CARACTERISTICAS_ENDERECO_ID":
        return renderEnderecos(dados);

      case "CONSULTAR_CARACTERISTICAS_BAIRROS":
        return renderSimples(dados, "Bairro encontrado:", "Bairros:");
      case "CONSULTAR_CARACTERISTICAS_CIDADES":
      case "CONSULTAR_CARACTERISTICAS_CIDADE_ID":
        return renderSimples(dados, "Cidade encontrada:", "Cidades:");
      case "CONSULTAR_CARACTERISTICAS_LOGRADOUROS":
        return renderSimples(dados, "Logradouro encontrado:", "Logradouros:");

      // --- OUTROS ---
      case "CONSULTAR_ENDERECO_EXTERNO_CEP":
        return renderEnderecoExterno(dados);

      default:
        return (
          <p className="text-gray-600">
            Não sei como mostrar essa informação ainda: <strong>{intencao}</strong>
          </p>
        );
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] bg-white rounded shadow">
      {/* Header */}
      <div className="p-4 border-b font-semibold text-lg bg-blue-600 text-white rounded-t">
        🤖 Chat do Sistema
      </div>

      {/* Área de Mensagens */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {mensagens.length === 0 && (
          <div className="text-center text-gray-400 mt-10">
            <p>Olá! Sou o assistente virtual.</p>
            <p className="text-sm">Pergunte sobre equipamentos, fabricantes, clientes ou aluguéis.</p>
          </div>
        )}

        {mensagens.map((m, i) => (
          <div
            key={i}
            className={`max-w-[75%] p-3 rounded-lg shadow-sm ${
              m.autor === "usuario"
                ? "ml-auto bg-blue-600 text-white rounded-br-none"
                : "mr-auto bg-white border border-gray-200 rounded-bl-none text-gray-800"
            }`}
          >
            {m.autor === "usuario" && <p>{m.texto}</p>}
            {m.autor === "bot" && m.resposta && (
              <div>{renderRespostaBot(m.resposta)}</div>
            )}
          </div>
        ))}

        {loading && (
          <div className="mr-auto bg-white border p-3 rounded-lg text-sm text-gray-500 italic animate-pulse">
            Digitando...
          </div>
        )}

        <div ref={fimRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t flex gap-2 bg-gray-100 rounded-b">
        <input
          className="flex-1 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Digite sua pergunta..."
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && enviarMensagem()}
        />
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold transition-colors disabled:opacity-50"
          onClick={enviarMensagem}
          disabled={loading}
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
