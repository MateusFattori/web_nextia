const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-900 text-white flex-shrink-0">
      <div className="p-4 text-xl font-semibold">Produtos</div>
      <nav className="flex flex-col space-y-2 p-4">
        <a href="/" className="px-4 py-2 bg-blue-600 rounded-md">Produtos</a>
        <a href="/clientes" className="px-4 py-2 hover:bg-gray-700 rounded-md">Clientes</a>
        <a href="/cadastro" className="px-4 py-2 hover:bg-gray-700 rounded-md">Cadastro</a>
        <a href="/editar" className="px-4 py-2 hover:bg-gray-700 rounded-md">Editar Clientes</a>
        <a href="/produtos" className="px-4 py-2 hover:bg-gray-700 rounded-md">Editar Produtos</a>
      </nav>
    </aside>
  );
};

export default Sidebar;