import React from 'react';
import Style from './Style.module.scss';
import Spin from 'antd/lib/spin';
import Icon from 'antd/lib/icon';
import manager from '../../Static/manager.svg';

function Loading()
{
    return (
        <div className={Style.Loading}>
            <img src={manager} className={Style.icon} alt={'icon'} />
            <Spin size={'large'} indicator={<Icon type="loading" />} />
        </div>
    );
}

export default React.memo(Loading);