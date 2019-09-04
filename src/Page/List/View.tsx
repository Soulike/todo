import React, {Fragment} from 'react';
import Style from './Style.module.scss';
import {Todo} from '../../Class';
import {Button, Card, Icon, Input, Modal, Spin, Timeline} from 'antd';
import TodoItem from './Component/TodoItem';
import {NativeButtonProps} from 'antd/lib/button/button';
import {ModalProps} from 'antd/lib/modal';
import {InputProps, TextAreaProps} from 'antd/lib/input';

interface Props
{
    todoList: Array<Todo>;
    onLoadMoreClick: NativeButtonProps['onClick'];
    loading: boolean;

    onAddButtonClick: NativeButtonProps['onClick'];
    addModalIsVisible: boolean;
    onAddModalOk: ModalProps['onOk'];
    onAddModalCancel: ModalProps['onCancel'];

    addModalTitle: string;
    addModalDescription: string;
    onAddModalTitleInputChange: InputProps['onChange'];
    onAddModalDescriptionTextareaChange: TextAreaProps['onChange'];
}

function ListView(props: Props)
{
    const {
        todoList,
        onLoadMoreClick,
        loading,
        onAddButtonClick,
        onAddModalCancel,
        onAddModalOk,
        addModalIsVisible,
        addModalTitle,
        addModalDescription,
        onAddModalTitleInputChange,
        onAddModalDescriptionTextareaChange,
    } = props;
    return (
        <Fragment>
            <main className={Style.List}>
                <Card className={Style.listCard} title={'待办事项'}>
                    <Spin spinning={loading}>
                        <Timeline pending={
                            <Button type={'link'} className={Style.loadMore} onClick={onLoadMoreClick}>加载更多</Button>
                        }>
                            {
                                todoList.map(todo =>
                                    <Timeline.Item key={todo.id} dot={todo.done ?
                                        <Icon type="check-circle" theme="twoTone" twoToneColor={'rgb(0,175,0)'} /> :
                                        <Icon type="clock-circle" theme="twoTone" />}>
                                        <TodoItem todo={todo} />
                                    </Timeline.Item>)
                            }
                        </Timeline>
                    </Spin>
                </Card>
                <Button type={'primary'} className={Style.addButton} onClick={onAddButtonClick}>
                    <div className={Style.plusSign}><Icon type={'plus'} /></div>
                </Button>
            </main>
            <Modal title={'添加待办事项'} width={'100vw'}
                   className={Style.addModal}
                   visible={addModalIsVisible}
                   onOk={onAddModalOk}
                   onCancel={onAddModalCancel} destroyOnClose={true} confirmLoading={loading}>
                <Input className={Style.titleInput}
                       placeholder={'待办事项标题'} autoFocus={true}
                       value={addModalTitle}
                       onChange={onAddModalTitleInputChange} />
                <Input.TextArea className={Style.descriptionTextarea}
                                placeholder={'待办事项描述（可选，支持 Markdown）'}
                                value={addModalDescription}
                                onChange={onAddModalDescriptionTextareaChange} />
            </Modal>
        </Fragment>
    );
}

export default ListView;