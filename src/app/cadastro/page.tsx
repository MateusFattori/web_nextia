"use client";  // Certifica que este componente será renderizado no cliente

import { useState } from 'react';
import axios from 'axios'; // Importe o Axios
import Layout from '../components/Layout'; // Importa o Layout

const CadastroPage = () => {
  // Estado para controlar se é cadastro de cliente ou produto
  const [tipoCadastro, setTipoCadastro] = useState<'cliente' | 'produto'>('cliente');

  // Estado para armazenar os dados do formulário de cliente
  const [clienteForm, setClienteForm] = useState({
    nome: '',
    cpf: '',
    telefone: '',
    email: '',
    senha: '',
    genero: '',
    dtNascimento: '',
    pontos: 0,
    fidelidade: 'NÃO FILIADO', // Alterado para string com valores 'FILIADO' e 'NÃO FILIADO'
  });

  // Estado para armazenar os dados do formulário de produto
  const [produtoForm, setProdutoForm] = useState({
    nome: '',
    categoria: '',
    valor: 0,
  });

  // Função para lidar com mudanças no formulário de cliente
  const handleClienteChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setClienteForm({
      ...clienteForm,
      [name]: value,
    });
  };

  // Função para lidar com mudanças no formulário de produto
  const handleProdutoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProdutoForm({
      ...produtoForm,
      [name]: value,
    });
  };

  // Função para enviar o formulário de cliente
  const handleClienteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('https://nextiawebapp.azurewebsites.net/cliente', clienteForm);
      console.log('Cliente cadastrado com sucesso:', response.data);
      setClienteForm({
        nome: '',
        cpf: '',
        telefone: '',
        email: '',
        senha: '',
        genero: '',
        dtNascimento: '',
        pontos: 0,
        fidelidade: 'NÃO FILIADO', // Resetado para valor inicial
      });
    } catch (error) {
      console.error('Erro ao cadastrar cliente:', error);
    }
  };

  // Função para enviar o formulário de produto
  const handleProdutoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('https://nextiawebapp.azurewebsites.net/produto', produtoForm);
      console.log('Produto cadastrado com sucesso:', response.data);
      setProdutoForm({
        nome: '',
        categoria: '',
        valor: 0,
      });
    } catch (error) {
      console.error('Erro ao cadastrar produto:', error);
    }
  };

  return (
    <Layout>
      <div className="p-6">
        {/* Cabeçalho */}
        <h1 className="text-2xl font-bold text-gray-800">
          Cadastro de {tipoCadastro === 'cliente' ? 'Cliente' : 'Produto'}
        </h1>

        {/* Switch entre Cliente e Produto */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setTipoCadastro('cliente')}
            className={`py-2 px-6 font-semibold rounded-md transition duration-300 ease-in-out ${
              tipoCadastro === 'cliente' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}
          >
            Cliente
          </button>
          <button
            onClick={() => setTipoCadastro('produto')}
            className={`py-2 px-6 font-semibold rounded-md transition duration-300 ease-in-out ${
              tipoCadastro === 'produto' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}
          >
            Produto
          </button>
        </div>

        {/* Formulário de Cliente */}
        {tipoCadastro === 'cliente' && (
          <form onSubmit={handleClienteSubmit} className="mt-6 space-y-4">
            {/* Campo Nome e CPF */}
            <div className="flex space-x-4">
              <input
                type="text"
                name="nome"
                value={clienteForm.nome}
                onChange={handleClienteChange}
                placeholder="Nome do Cliente"
                className="flex-1 px-4 py-2 border rounded-md focus:ring focus:ring-blue-200"
              />
              <input
                type="text"
                name="cpf"
                value={clienteForm.cpf}
                onChange={handleClienteChange}
                placeholder="CPF"
                className="flex-1 px-4 py-2 border rounded-md focus:ring focus:ring-blue-200"
              />
            </div>

            {/* Campo Telefone e Email */}
            <div className="flex space-x-4">
              <input
                type="text"
                name="telefone"
                value={clienteForm.telefone}
                onChange={handleClienteChange}
                placeholder="Telefone"
                className="flex-1 px-4 py-2 border rounded-md focus:ring focus:ring-blue-200"
              />
              <input
                type="email"
                name="email"
                value={clienteForm.email}
                onChange={handleClienteChange}
                placeholder="Email"
                className="flex-1 px-4 py-2 border rounded-md focus:ring focus:ring-blue-200"
              />
            </div>

            {/* Campo Senha e Gênero */}
            <div className="flex space-x-4">
              <input
                type="password"
                name="senha"
                value={clienteForm.senha}
                onChange={handleClienteChange}
                placeholder="Senha"
                className="flex-1 px-4 py-2 border rounded-md focus:ring focus:ring-blue-200"
              />
              <select
                name="genero"
                value={clienteForm.genero}
                onChange={handleClienteChange}
                className="flex-1 px-4 py-2 border rounded-md focus:ring focus:ring-blue-200"
              >
                <option value="">Selecione o Gênero</option>
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
                <option value="outro">Outro</option>
              </select>
            </div>

            {/* Data de Nascimento e Pontos */}
            <div className="flex space-x-4">
              <input
                type="date"
                name="dtNascimento"
                value={clienteForm.dtNascimento}
                onChange={handleClienteChange}
                placeholder="Data de Nascimento"
                className="flex-1 px-4 py-2 border rounded-md focus:ring focus:ring-blue-200"
              />
              <input
                type="number"
                name="pontos"
                value={clienteForm.pontos}
                onChange={handleClienteChange}
                placeholder="Pontos"
                className="flex-1 px-4 py-2 border rounded-md focus:ring focus:ring-blue-200"
              />
            </div>

            {/* Fidelidade */}
            <div className="flex space-x-4 items-center">
              <label className="flex-1">
                Fidelidade:
                <select
                  name="fidelidade"
                  value={clienteForm.fidelidade}
                  onChange={handleClienteChange}
                  className="ml-2 px-4 py-2 border rounded-md focus:ring focus:ring-blue-200"
                >
                  <option value="FILIADO">FILIADO</option>
                  <option value="NÃO FILIADO">NÃO FILIADO</option>
                </select>
              </label>
            </div>

            {/* Botão de Envio */}
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
              Cadastrar Cliente
            </button>
          </form>
        )}

        {/* Formulário de Produto */}
        {tipoCadastro === 'produto' && (
          <form onSubmit={handleProdutoSubmit} className="mt-6 space-y-4">
            {/* Campo Nome e Categoria */}
            <div className="flex space-x-4">
              <input
                type="text"
                name="nome"
                value={produtoForm.nome}
                onChange={handleProdutoChange}
                placeholder="Nome do Produto"
                className="flex-1 px-4 py-2 border rounded-md focus:ring focus:ring-blue-200"
              />
              <input
                type="text"
                name="categoria"
                value={produtoForm.categoria}
                onChange={handleProdutoChange}
                placeholder="Categoria"
                className="flex-1 px-4 py-2 border rounded-md focus:ring focus:ring-blue-200"
              />
            </div>

            {/* Campo Valor */}
            <div className="flex space-x-4">
              <input
                type="number"
                name="valor"
                value={produtoForm.valor}
                onChange={handleProdutoChange}
                placeholder="Valor"
                className="flex-1 px-4 py-2 border rounded-md focus:ring focus:ring-blue-200"
              />
            </div>

            {/* Botão de Envio */}
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
              Cadastrar Produto
            </button>
          </form>
        )}
      </div>
    </Layout>
  );
};

export default CadastroPage;
