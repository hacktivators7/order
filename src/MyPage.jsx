import React from 'react';
import OrderProcessing from './OrderProcessing';
import { qdata } from './qdata';

const MyPage = () => {
    return (
        <OrderProcessing orders={qdata} />
    );
};

export default MyPage;
