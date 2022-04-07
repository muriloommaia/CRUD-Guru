import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

export default function Header() {
  const [isLogged, setLogged] = useState(true);
  const logout = () => {
    localStorage.removeItem('user');
    setLogged(false);
  };
  if (!isLogged) return <Navigate to="/login" />;
  return (
    <nav className="flex items-center justify-between flex-wrap bg-violet-900">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <img src="../images/meuguru.svg" alt="logo" className="w-8" />
      </div>
      <div className="flex">

        <Link to="/edit/profile" className="block text-white bg-violet-600 border-violet-800 border-2 rounded-full my-4 px-4 py-2">
          Editar Perfil
        </Link>
        <button
          type="button"
          className="block text-white bg-red-900 border-violet-800 border-2 rounded-full my-4 px-4 py-2"
          onClick={logout}
        >
          Loggout
        </button>
      </div>
    </nav>
  );
}