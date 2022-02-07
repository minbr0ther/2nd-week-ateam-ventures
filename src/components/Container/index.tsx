import React, { useState, useEffect } from 'react';
import { OrderInfo } from '../../commons/constants';
import getApi from '../../commons/utils';
import Card from '../Card';
import './style.css';

const Container: React.FC = () => {
  const [state, setState] = useState<OrderInfo[]>([]);

  useEffect(() => {
    async function GetApi() {
      const data = await getApi('https://sixted-mock-server.herokuapp.com/');
      setState(data);
    }
    GetApi();
  }, []);

  return (
    <div className="container">
      {state.map((e, index) => (
        <Card cardData={e} />
      ))}
    </div>
  );
};

export default Container;
