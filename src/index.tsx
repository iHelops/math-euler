import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { ConfigProvider } from 'antd'
import ru_Ru from 'antd/lib/locale-provider/ru_RU'

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <ConfigProvider locale={ru_Ru}>
        <App/>
    </ConfigProvider>
);
