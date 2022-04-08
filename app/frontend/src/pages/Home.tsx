import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import InputFilter from '../components/InputFilter';
import Pagination from '../components/Pagination';
import Table from '../components/Table';
import TextPlatform from '../components/TextPlataform';
import { requestData } from '../services/requests';
import { RootState } from '../store';
import { setTotal } from '../store/totalUsersSlice';
import { UserRender } from '../Types/UserTypes';

export default function Home() {
  const [data, setData] = React.useState<UserRender[]>([]);
  const [user, setUser] = React.useState<UserRender>();
  const page = useSelector((state: RootState) => state.actualPage.page);
  const isLogged = useSelector((state: RootState) => state.logged.logged);
  const filter = useSelector((state: RootState) => state.filter.filter);
  const dispatch = useDispatch();
  const getData = async () => {
    const endpoint = `/?page=${page}&filter=${filter}`;
    const { users, total } = await requestData(endpoint);
    dispatch(setTotal(total));
    setData(users);
  };
  const getUser = () => {
    const response = localStorage.getItem('user') as string;
    const responseJSON = JSON.parse(response) as UserRender;
    setUser(responseJSON);
  };
  useEffect(() => {
    document.title = 'Home';
    try {
      getData();
      getUser();
    } catch (error) {
      console.log(error);
    }
  }, [page, filter]);
  return (
    <div>
      <Header />
      <div className="flex flex-col bg-violet-900 py-5 text-stone-50">
        {(isLogged && user) && (
          <div className="flex flex-col flex-wrap text-center text-xl font-serif ">
            <h1>
              Olá,
              {' '}
              {user.name}
              {' '}
              seja bem vindo à nossa plataforma!
            </h1>
          </div>
        )}
        <TextPlatform />
      </div>
      <div className="flex flex-col items-center">
        <InputFilter />
        <Table data={data} />
      </div>
      <Pagination />
    </div>
  );
}
