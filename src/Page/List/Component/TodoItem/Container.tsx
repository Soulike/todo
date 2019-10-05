import React, {Component, DOMAttributes} from 'react';
import View from './View';
import {Todo} from '../../../../Class';
import {ModalProps} from 'antd/lib/modal';
import {PopconfirmProps} from 'antd/lib/popconfirm';
import {Todo as TodoApi} from '../../../../Api';
import {notification} from 'antd';
import emitter from '../../EventEmitter';
import {ITEM_DELETE, ITEM_DONE, ITEM_UNDONE} from '../../EVENT';
import {NativeButtonProps} from 'antd/lib/button/button';

interface Props
{
    todo: Todo;
}

interface State
{
    modalIsVisible: boolean;
    loading: boolean;
}

class TodoItem extends Component<Props, State>
{
    constructor(props: Props)
    {
        super(props);
        this.state = {
            modalIsVisible: false,
            loading: false,
        };
    }


    onClick: DOMAttributes<HTMLDivElement>['onClick'] = () =>
    {
        this.setState({modalIsVisible: true});
    };

    onModalOk: ModalProps['onOk'] = () =>
    {
        this.setState({modalIsVisible: false});
    };

    onModalCancel: ModalProps['onCancel'] = () =>
    {
        this.setState({modalIsVisible: false});
    };

    onDeleteItemConfirm: PopconfirmProps['onConfirm'] = async () =>
    {
        const {todo: {id}} = this.props;
        const result = await TodoApi.deleteById(id);
        if (result !== null)
        {
            emitter.emit(ITEM_DELETE, id);
            notification.success({message: '删除事项成功'});
        }
    };

    onDoneButtonClick: NativeButtonProps['onClick'] = async () =>
    {
        const {todo: {id}} = this.props;
        this.setState({loading: true});
        const result = await TodoApi.switchState(id, true);
        if (result !== null)
        {
            emitter.emit(ITEM_DONE, id);
            this.setState({loading: false});
        }
    };

    onUndoneButtonClick: NativeButtonProps['onClick'] = async () =>
    {
        const {todo: {id}} = this.props;
        this.setState({loading: true});
        const result = await TodoApi.switchState(id, false);
        if (result !== null)
        {
            emitter.emit(ITEM_UNDONE, id);
            this.setState({loading: false});
        }
    };

    render()
    {
        const {todo: {title, time, done, description}} = this.props;
        const {modalIsVisible, loading} = this.state;
        return (<View title={title}
                      time={time}
                      done={done}
                      onClick={this.onClick}
                      modalIsVisible={modalIsVisible}
                      description={description}
                      onModalOk={this.onModalOk}
                      onModalCancel={this.onModalCancel}
                      onDeleteItemConfirm={this.onDeleteItemConfirm}
                      onDoneButtonClick={this.onDoneButtonClick}
                      onUndoneButtonClick={this.onUndoneButtonClick} loading={loading} />);
    }
}

export default TodoItem;