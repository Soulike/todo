import React, {PureComponent} from 'react';
import LoginView from './View';
import {PAGE_ID, PAGE_ID_TO_ROUTE} from '../../CONFIG/PAGE';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {checkSession, login} from '../../Api';
import {notification} from 'antd';
import {InputProps} from 'antd/lib/input';
import {FormProps} from 'antd/lib/form';

interface Props extends RouteComponentProps {}

interface State
{
    username: string,
    password: string,
}

class Login extends PureComponent<Props, State>
{
    constructor(props: Props)
    {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
    }

    async componentDidMount()
    {
        const res = await checkSession();
        if(res !== null)
        {
            const {isInSession} = res;
            if(isInSession)
            {
                this.props.history.replace(PAGE_ID_TO_ROUTE[PAGE_ID.LIST]);
            }
        }
    }

    onUsernameInputChange: InputProps['onChange'] = e =>
    {
        this.setState({username: e.target.value});
    };

    onPasswordInputChange: InputProps['onChange'] = e =>
    {
        this.setState({password: e.target.value});
    };

    onLoginFormSubmit: FormProps['onSubmit'] = async e =>
    {
        e.preventDefault();
        const {username, password} = this.state;
        const isSuccessful = await login(username, password);
        if (isSuccessful)
        {
            notification.success({message: '登录成功'});
            this.props.history.push(PAGE_ID_TO_ROUTE[PAGE_ID.LIST]);
        }
    };

    render()
    {
        const {username, password} = this.state;
        return (
            <LoginView username={username} password={password}
                       onLoginFormSubmit={this.onLoginFormSubmit}
                       onPasswordInputChange={this.onPasswordInputChange}
                       onUsernameInputChange={this.onUsernameInputChange} />
        );
    }
}

export default withRouter(Login);