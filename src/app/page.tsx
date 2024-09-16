"use client";  // Certifica que este componente será renderizado no cliente

import { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from './components/Layout';

interface Produto {
  nome: string;
  categoria: string;
  valor: number;
}

const Home = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  // Função para buscar os produtos
  const fetchProdutos = async () => {
    try {
      const response = await axios.get('http://localhost:8080/produto'); // Substitua localhost pelo IP se necessário
      setProdutos(response.data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  return (
    <Layout>
      <div className="p-6">
        {/* Título da página */}
        <h1 className="text-2xl font-bold text-gray-800">
          Olá Mateus, <br />
          <span className="text-lg text-gray-600">Bem-vindo a seus produtos 👋</span>
        </h1>

        {/* Seção de Produtos */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-blue-600">Ativos</h2>

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

          {/* Tabela de Produtos */}
          <table className="min-w-full mt-4 bg-white border border-gray-200 rounded-md shadow-md">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-gray-500">Nome do Produto</th>
                <th className="px-4 py-2 text-left text-gray-500">Categoria</th>
                <th className="px-4 py-2 text-left text-gray-500">Valor</th>
              </tr>
            </thead>
            <tbody>
              {produtos.map((produto, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{produto.nome}</td>
                  <td className="px-4 py-2">{produto.categoria}</td>
                  <td className="px-4 py-2">R$ {produto.valor.toFixed(2)}</td>
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
      </div>
    </Layout>
  );
};

export default Home;