import React, {PureComponent} from 'react';
import View from './View';
import {ButtonProps} from 'antd/lib/button/button';
import {logout} from '../../../../Api/Account';
import {Modal, notification} from 'antd';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {PAGE_ID, PAGE_ID_TO_ROUTE} from '../../../../CONFIG/PAGE';

interface Props extends ButtonProps, RouteComponentProps {}

interface State {}

class ExitButton extends PureComponent<Props, State>
{
    onClick: ButtonProps['onClick'] = () =>
    {
        Modal.confirm({
            title: '退出确认',
            content: '你确认退出 Todo？',
            onOk: async () =>
            {
                await logout();
                notification.success({message: '退出成功'});
                this.props.history.replace(PAGE_ID_TO_ROUTE[PAGE_ID.LOGIN]);
            },
        });
    };

    render()
    {
        return (<View onClick={this.onClick} {...this.props} />);
    }
}

export default withRouter(ExitButton);