"use client"; // Certifica que este componente será renderizado no cliente

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Layout from '../components/Layout'; // Ajuste o caminho conforme necessário

interface Cliente {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  genero: string;
  dt_nascimento: string;
  pontos: number;
  fidelidade: string; // FILIADO ou NÃO FILIADO
}

const EditarPage = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Função para buscar os clientes da API
  const fetchClientes = async () => {
    try {
      const response = await axios.get('http://localhost:8080/cliente'); // Ajuste a URL da sua API
      setClientes(response.data);
      setLoading(false);
    } catch (err) {
      setError('Erro ao buscar clientes da API');
      setLoading(false);
    }
  };

  // Função para excluir cliente
  const excluirCliente = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/cliente/${id}`); // Ajuste para a URL de exclusão
      // Após a exclusão, remova o cliente da lista localmente
      setClientes(clientes.filter(cliente => cliente.id !== id));
      alert('Cliente excluído com sucesso');
    } catch (error) {
      alert('Erro ao excluir cliente');
    }
  };

  useEffect(() => {
    fetchClientes(); // Busca os dados da API quando o componente é montado
  }, []);

  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-2xl font-bold text-gray-800">Lista de Clientes para Edição</h1>

        {loading ? (
          <p>Carregando clientes...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <table className="min-w-full mt-4 bg-white border border-gray-200 rounded-md shadow-md">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-gray-500">Nome</th>
                <th className="px-4 py-2 text-left text-gray-500">CPF</th>
                <th className="px-4 py-2 text-left text-gray-500">Telefone</th>
                <th className="px-4 py-2 text-left text-gray-500">Email</th>
                <th className="px-4 py-2 text-left text-gray-500">Genero</th>
                <th className="px-4 py-2 text-left text-gray-500">Data de Nascimento</th>
                <th className="px-4 py-2 text-left text-gray-500">Pontos</th>
                <th className="px-4 py-2 text-left text-gray-500">Fidelidade</th>
                <th className="px-4 py-2 text-left text-gray-500">Ação</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente) => (
                <tr key={cliente.id} className="border-t">
                  <td className="px-4 py-2">{cliente.nome}</td>
                  <td className="px-4 py-2">{cliente.cpf}</td>
                  <td className="px-4 py-2">{cliente.telefone}</td>
                  <td className="px-4 py-2">{cliente.email}</td>
                  <td className="px-4 py-2">{cliente.genero}</td>
                  <td className="px-4 py-2">{cliente.dt_nascimento}</td>
                  <td className="px-4 py-2">{cliente.pontos}</td>
                  <td className="px-4 py-2">{cliente.fidelidade}</td>
                  <td className="px-4 py-2 flex space-x-2">
                    {/* Link para a página de edição do cliente */}
                    <Link href={`/editar/${cliente.id}`} className="text-blue-600 hover:underline">
                      Editar
                    </Link>
                    {/* Botão de exclusão */}
                    <button
                      onClick={() => excluirCliente(cliente.id)}
                      className="text-red-600 hover:underline"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
};

export default EditarPage;
