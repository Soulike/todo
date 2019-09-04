import 'core-js';
import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import * as serviceWorker from './serviceWorker';
import Loading from './Component/Loading';
import './ModuleConfig/Antd';
import zhCN from 'antd/es/locale/zh_CN';
import {ConfigProvider} from 'antd';

const Router = React.lazy(() => import('./Router'));

ReactDOM.render(
    <Suspense fallback={<Loading />}>
        <ConfigProvider locale={zhCN}>
            <Router />
        </ConfigProvider>
    </Suspense>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
