import { useContext, useEffect, useState } from 'react';
import { ProductsContext } from '../context/Productcontext';
import axios from 'axios';
import Cards from './Cards';

const Todolist = () => {
  const { products, loading, setLoading, getProducts } =
    useContext(ProductsContext);

  useEffect(() => {
    const fetchAllProduct = async () => {
      setLoading(true);
      try {
        await getProducts(); // Fetches products and updates context
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllProduct();
  }, []);

  return (
    <div className='mt-5'>
      <div className='row gap-1 justify-content-center m-auto '>
        {loading ? (
          <div
            class='spinner-border text-warning'
            style={{ height: '10rem', width: '10rem' }}
            role='status'
          >
            <span class='visually-hidden'>Loading...</span>
          </div>
        ) : (
          products.map((item) => (
            <Cards
              key={item.id}
              name={item.todo_name}
              description={item.todo_desc}
              status={item.todo_status}
              time={item.time_created}
              id={item.id}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Todolist;
