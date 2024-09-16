"use client"; // Certifica que o componente será renderizado no cliente

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation"; // Importa useParams do pacote certo
import axios from "axios";
import Layout from "../../components/Layout"; // Ajuste o caminho do layout conforme necessário

interface Cliente {
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  sexo: string;
  nasc: string;
  pontos: number;
  fidelidade: string; // Pode ser "FILIADO" ou "NÃO FILIADO"
}

const EditarClientePage = () => {
  const [cliente, setCliente] = useState<Cliente | null>(null); // Armazena os dados do cliente
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [error, setError] = useState<string | null>(null); // Armazena possíveis erros
  const router = useRouter(); // Usa o roteador do Next.js
  const params = useParams(); // Usa useParams para pegar o id
  const id = params.id; // Obtém o id da URL

  // Função para buscar os dados do cliente com base no ID da URL
  const fetchCliente = async () => {
    try {
      const response = await axios.get(`https://nextiawebapp.azurewebsites.net/cliente/${id}`); // Requisição para buscar o cliente específico
      setCliente(response.data); // Atualiza o estado com os dados do cliente
      setLoading(false); // Indica que terminou de carregar
    } catch (err) {
      setError("Erro ao buscar os dados do cliente");
      setLoading(false);
    }
  };

  // Função para enviar as alterações do cliente para a API
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`https://nextiawebapp.azurewebsites.net/cliente/${id}`, cliente); // Atualiza o cliente na API
      alert("Cliente atualizado com sucesso");
      router.push("/editar"); // Redireciona para a lista de clientes
    } catch (err) {
      setError("Erro ao atualizar o cliente");
    }
  };

  // UseEffect para buscar os dados do cliente assim que o ID estiver disponível
  useEffect(() => {
    if (id) {
      fetchCliente(); // Busca os dados do cliente se o ID for válido
    }
  }, [id]);

  // Mostra uma mensagem de carregamento enquanto os dados estão sendo buscados
  if (loading) {
    return <p>Carregando dados do cliente...</p>;
  }

  // Mostra uma mensagem de erro caso haja algum problema na requisição
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-2xl font-bold text-gray-800">Editar Cliente</h1>

        {cliente && (
          <form onSubmit={handleUpdate} className="mt-8">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Nome"
                value={cliente.nome}
                onChange={(e) => setCliente({ ...cliente, nome: e.target.value })}
                className="px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
              />
              <input
                type="text"
                placeholder="CPF"
                value={cliente.cpf}
                onChange={(e) => setCliente({ ...cliente, cpf: e.target.value })}
                className="px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
              />
              <input
                type="email"
                placeholder="Email"
                value={cliente.email}
                onChange={(e) => setCliente({ ...cliente, email: e.target.value })}
                className="px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
              />
              <input
                type="text"
                placeholder="Telefone"
                value={cliente.telefone}
                onChange={(e) => setCliente({ ...cliente, telefone: e.target.value })}
                className="px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
              />
              <select
                value={cliente.sexo}
                onChange={(e) => setCliente({ ...cliente, sexo: e.target.value })}
                className="px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
              >
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
                <option value="N/binário">N/binário</option>
              </select>
              <input
                type="date"
                value={cliente.nasc}
                onChange={(e) => setCliente({ ...cliente, nasc: e.target.value })}
                className="px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
              />
              <input
                type="number"
                placeholder="Pontos"
                value={cliente.pontos}
                onChange={(e) => setCliente({ ...cliente, pontos: Number(e.target.value) })}
                className="px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
              />
              <select
                value={cliente.fidelidade}
                onChange={(e) => setCliente({ ...cliente, fidelidade: e.target.value })}
                className="px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
              >
                <option value="FILIADO">FILIADO</option>
                <option value="NÃO FILIADO">NÃO FILIADO</option>
              </select>
            </div>

            <button
              type="submit"
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
            >
              Atualizar Cliente
            </button>
          </form>
        )}
      </div>
    </Layout>
  );
};

export default EditarClientePage;
