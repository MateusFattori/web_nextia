"use client"; // Certifica que este componente será renderizado no cliente

import { useState, useEffect } from 'react';
import axios from 'axios'; // Importando o Axios para fazer a requisição
import Layout from '../components/Layout'; // Certifique-se de ajustar o caminho para o layout

interface Cliente {
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  sexo: string;
  nasc: string;
  pontos: number;
  fidelidade: boolean;
}

const ClientesPage = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]); // Estado para armazenar os clientes
  const [loading, setLoading] = useState(true); // Estado para controle de carregamento
  const [error, setError] = useState<string | null>(null); // Estado para controle de erros

  // Função para buscar os clientes da API
  const fetchClientes = async () => {
    try {
      const response = await axios.get('http://localhost:8080/cliente'); // Altere para a URL da sua API
      setClientes(response.data); // Definindo os dados de clientes
      setLoading(false); // Desabilita o estado de carregamento
    } catch (err) {
      setError('Erro ao buscar clientes da API'); // Exibe erro se ocorrer
      setLoading(false); // Desabilita o estado de carregamento mesmo em caso de erro
    }
  };

  // UseEffect para buscar os clientes assim que o componente for montado
  useEffect(() => {
    fetchClientes(); // Faz a requisição quando o componente é montado
  }, []);

  // Renderiza a página
  return (
    <Layout>
      <div className="p-8">
        {/* Cabeçalho */}
        <h1 className="text-2xl font-bold text-gray-800">
          Olá Mateus, <br />
          <span className="text-lg text-gray-600">Bem-vindo a seus clientes 👋</span>
        </h1>

        {/* Verificação de Carregamento ou Erro */}
        {loading ? (
          <p>Carregando clientes...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="mt-8">
            {/* Seção de Clientes */}
            <h2 className="text-xl font-semibold text-blue-600">Todos os Clientes</h2>

            {/* Barra de busca e filtro */}
            <div className="flex justify-between mt-4">
              <input
                type="text"
                placeholder="Pesquisar..."
                className="px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
              />
              <select className="border px-4 py-2 rounded-md">
                <option>Filtrar por: Recente</option>
                <option>Filtrar por: Antigo</option>
              </select>
            </div>

            {/* Tabela de Clientes */}
            <table className="min-w-full mt-4 bg-white border border-gray-200 rounded-md shadow-md">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-gray-500">Nome de Cliente</th>
                  <th className="px-4 py-2 text-left text-gray-500">CPF</th>
                  <th className="px-4 py-2 text-left text-gray-500">Email</th>
                  <th className="px-4 py-2 text-left text-gray-500">Telefone</th>
                  <th className="px-4 py-2 text-left text-gray-500">Sexo</th>
                  <th className="px-4 py-2 text-left text-gray-500">Nasc.</th>
                  <th className="px-4 py-2 text-left text-gray-500">Pontos</th>
                  <th className="px-4 py-2 text-left text-gray-500">Fidelidade</th>
                </tr>
              </thead>
              <tbody>
                {clientes.map((cliente, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-2">{cliente.nome}</td>
                    <td className="px-4 py-2">{cliente.cpf}</td>
                    <td className="px-4 py-2">{cliente.email}</td>
                    <td className="px-4 py-2">{cliente.telefone}</td>
                    <td className="px-4 py-2">{cliente.sexo}</td>
                    <td className="px-4 py-2">{cliente.nasc}</td>
                    <td className="px-4 py-2">{cliente.pontos}</td>
                    <td className="px-4 py-2">
                      <input
                        type="checkbox"
                        checked={cliente.fidelidade}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        readOnly
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Paginação */}
            <div className="flex justify-end mt-4">
              <nav>
                <ul className="flex space-x-2">
                  <li className="px-3 py-1 border rounded-md bg-gray-200">1</li>
                  <li className="px-3 py-1 border rounded-md">2</li>
                  <li className="px-3 py-1 border rounded-md">3</li>
                  <li className="px-3 py-1 border rounded-md">4</li>
                </ul>
              </nav>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ClientesPage;