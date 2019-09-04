import React, {Component} from 'react';
import View from './View';
import {Todo} from '../../Class';
import {add, getByPage} from '../../Api/Todo';
import {NativeButtonProps} from 'antd/lib/button/button';
import {message, notification} from 'antd';
import {ModalProps} from 'antd/lib/modal';
import {InputProps, TextAreaProps} from 'antd/lib/input';
import emitter from './EventEmitter';
import {ITEM_DELETE, ITEM_DONE, ITEM_UNDONE} from './EVENT';

interface Props {}

interface State
{
    todoList: Array<Todo>;
    pageNumber: number;
    loading: boolean;
    addModalIsVisible: boolean;
    addModalTitle: string;
    addModalDescription: string;
}

class List extends Component<Props, State>
{
    private readonly PAGE_SIZE: number; // 每一页多少条

    constructor(props: Props)
    {
        super(props);
        this.state = {
            todoList: [],
            pageNumber: 1,
            loading: true,
            addModalIsVisible: false,
            addModalTitle: '',
            addModalDescription: '',
        };

        this.PAGE_SIZE = 10;
    }

    async componentDidMount()
    {
        await this.loadTodoList();
        emitter.on(ITEM_DELETE, async () =>
        {
            await this.loadTodoList();
        });

        emitter.on(ITEM_DONE, id =>
        {
            const {todoList} = this.state;
            todoList.forEach(todo =>
            {
                if (todo.id === id)
                {
                    todo.done = true;
                }
            });
            this.setState({todoList});
        });

        emitter.on(ITEM_UNDONE, id =>
        {
            const {todoList} = this.state;
            todoList.forEach(todo =>
            {
                if (todo.id === id)
                {
                    todo.done = false;
                }
            });
            this.setState({todoList});
        });
    }

    componentWillUnmount()
    {
        emitter.removeAllListeners();
    }

    loadTodoList = async () =>
    {
        this.setState({loading: true});
        const todoList = await getByPage(1, this.PAGE_SIZE);
        if (todoList !== null)
        {
            this.setState({todoList, loading: false, pageNumber: 1});
        }
    };

    onLoadMoreClick: NativeButtonProps['onClick'] = async () =>
    {
        this.setState({loading: true});
        const {pageNumber} = this.state;
        const {todoList: currentTodoList} = this.state;
        const todoList = await getByPage(pageNumber + 1, this.PAGE_SIZE);
        if (todoList !== null)
        {
            if (todoList.length !== 0)
            {
                currentTodoList.push(...todoList);
                this.setState({
                    pageNumber: pageNumber + 1,
                    todoList: currentTodoList,
                });
            }
            else
            {
                notification.info({message: '没有更多事项'});
            }
            this.setState({loading: false});
        }
    };

    onAddButtonClick: NativeButtonProps['onClick'] = () =>
    {
        this.setState({addModalIsVisible: true});
    };

    onAddModalOk: ModalProps['onOk'] = async () =>
    {
        this.setState({loading: true});
        const {addModalTitle, addModalDescription} = this.state;
        if (addModalTitle.length === 0)
        {
            message.warning('请填写待办事项标题');
        }
        else
        {
            const todo = {
                ...new Todo(0,
                    (new Date()).toISOString(), false, addModalTitle, addModalDescription),
                id: undefined,
            };
            const result = await add(todo as Todo & { id: never });
            if (result !== null)
            {
                notification.success({message: '待办事项添加成功'});
                this.setState({
                    addModalIsVisible: false,
                    addModalTitle: '',
                    addModalDescription: '',
                });
                await this.loadTodoList();
            }
        }
        this.setState({loading: false});
    };

    onAddModalCancel: ModalProps['onCancel'] = () =>
    {
        this.setState({
            addModalIsVisible: false,
            addModalTitle: '',
            addModalDescription: '',
        });
    };

    onAddModalTitleInputChange: InputProps['onChange'] = e =>
    {
        this.setState({addModalTitle: e.target.value});
    };

    onAddModalDescriptionTextareaChange: TextAreaProps['onChange'] = e =>
    {
        this.setState({addModalDescription: e.target.value});
    };

    render()
    {
        const {todoList, loading, addModalDescription, addModalTitle, addModalIsVisible} = this.state;
        return (<View
            loading={loading}
            todoList={todoList}
            onLoadMoreClick={this.onLoadMoreClick}
            addModalDescription={addModalDescription}
            addModalIsVisible={addModalIsVisible}
            addModalTitle={addModalTitle}
            onAddButtonClick={this.onAddButtonClick}
            onAddModalCancel={this.onAddModalCancel}
            onAddModalDescriptionTextareaChange={this.onAddModalDescriptionTextareaChange}
            onAddModalOk={this.onAddModalOk} onAddModalTitleInputChange={this.onAddModalTitleInputChange} />);
    }
}

export default List;