import React, { useEffect } from 'react';
import { menuItemModel } from '../../../../Interfaces'; // Verifique o caminho correto da interface
import MenuItemCard from './MenuItemCard';
import { useGetMenuItemsQuery } from '../../../../Apis/menuItemApi';
import { useDispatch } from 'react-redux';
import { setMenuItem } from '../../../../Storage/Redux/menuItemSlice';
import { MainLoader } from '../Common';

function MenuItemList() {
    const dispatch = useDispatch();
    const { data, isLoading, error } = useGetMenuItemsQuery(null);

    useEffect(() => {
        if (!isLoading && !error && data) {
            console.log('Data from API:', data); // Adicionando log para os dados recebidos da API
            dispatch(setMenuItem(data.result));
        }
    }, [data, isLoading, error, dispatch]);

    if (isLoading) {
        return <MainLoader></MainLoader>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className='container'>
            <h2 className='h1 fw-bold text-center mt-5' style={{ color: '#2a2b59' }}>Nossos Pratos</h2>
            <hr />
            <div className='row'>
                {data && data.result && data.result.length > 0 ? (
                    data.result.map((menuItem: menuItemModel, index: number) => (
                        <MenuItemCard menuItem={menuItem} key={index} />
                    ))
                ) : (
                    <p>Nenhum item encontrado.</p>
                )}
            </div>
        </div>
    );
}

export default MenuItemList;
