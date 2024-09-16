"use client"; 
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Layout from '../components/Layout'; // Ajuste o caminho conforme necessário

interface Produto {
  id: number;
  nome: string;
  categoria: string;
  valor: number;
}

const ListarProdutosPage = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Função para buscar os produtos da API
  const fetchProdutos = async () => {
    try {
      const response = await axios.get('http://localhost:8080/produto');
      setProdutos(response.data);
      setLoading(false);
    } catch (err) {
      setError('Erro ao buscar produtos da API');
      setLoading(false);
    }
  };

  // Função para excluir produto
  const excluirProduto = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/produto/${id}`);
      // Remover o produto da lista localmente após a exclusão
      setProdutos(produtos.filter(produto => produto.id !== id));
      alert('Produto excluído com sucesso');
    } catch (error) {
      alert('Erro ao excluir produto');
    }
  };

  useEffect(() => {
    fetchProdutos(); // Busca os dados da API quando o componente é montado
  }, []);

  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-2xl font-bold text-gray-800">Lista de Produtos</h1>

        {loading ? (
          <p>Carregando produtos...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <table className="min-w-full mt-4 bg-white border border-gray-200 rounded-md shadow-md">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-gray-500">Nome</th>
                <th className="px-4 py-2 text-left text-gray-500">Categoria</th>
                <th className="px-4 py-2 text-left text-gray-500">Valor</th>
                <th className="px-4 py-2 text-left text-gray-500">Ações</th>
              </tr>
            </thead>
            <tbody>
              {produtos.map((produto) => (
                <tr key={produto.id} className="border-t">
                  <td className="px-4 py-2">{produto.nome}</td>
                  <td className="px-4 py-2">{produto.categoria}</td>
                  <td className="px-4 py-2">{produto.valor}</td>
                  <td className="px-4 py-2 flex space-x-2">
                    {/* Link para a página de edição do produto */}
                    <Link href={`/produtos/${produto.id}`} className="text-blue-600 hover:underline">
                      Editar
                    </Link>
                    {/* Botão para excluir o produto */}
                    <button
                      onClick={() => excluirProduto(produto.id)}
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

export default ListarProdutosPage;