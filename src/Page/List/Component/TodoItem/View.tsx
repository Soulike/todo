import React, {DOMAttributes, Fragment} from 'react';
import Style from './Style.module.scss';
import {Button, Empty, Icon, Modal, Popconfirm, Spin, Tooltip} from 'antd';
import {ModalProps} from 'antd/lib/modal';
import ArticleShower from '../../../../Component/ArticleShower';
import {markdownConverter} from '../../../../Singleton';
import {PopconfirmProps} from 'antd/lib/popconfirm';
import {NativeButtonProps} from 'antd/lib/button/button';

interface Props
{
    title: string;
    description?: string | null;
    time: string;
    done: boolean;
    onClick: DOMAttributes<HTMLDivElement>['onClick'];

    modalIsVisible: boolean;
    onModalOk: ModalProps['onOk'],
    onModalCancel: ModalProps['onCancel'];

    onDoneButtonClick: NativeButtonProps['onClick'];
    onUndoneButtonClick: NativeButtonProps['onClick'];
    onDeleteItemConfirm: PopconfirmProps['onConfirm'];

    loading: boolean;
}

function TodoItemView(props: Props)
{
    const {
        title,
        description,
        time,
        done,
        onClick,
        modalIsVisible,
        onModalCancel,
        onModalOk,
        onDeleteItemConfirm,
        onDoneButtonClick,
        onUndoneButtonClick,
        loading,
    } = props;
    const date = new Date(time);
    const dateString = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    const dateTimeString = `${dateString} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
    return (
        <Fragment>
            <Spin spinning={loading}>
                <div className={Style.TodoItem}>
                    <Button.Group size={'small'} className={Style.buttonWrapper}>
                        <Tooltip title={'标记为已完成'}>
                            <Button disabled={done}
                                    type={'link'}
                                    className={Style.doneButton}
                                    onClick={onDoneButtonClick}><Icon type="check" /></Button>
                        </Tooltip>
                        <Tooltip title={'标记为待完成'}>
                            <Button disabled={!done}
                                    type={'link'}
                                    className={Style.undoneButton}
                                    onClick={onUndoneButtonClick}><Icon type="clock-circle" /></Button>
                        </Tooltip>
                        <Tooltip title={'删除事项'}>
                            <Popconfirm title={`确认要删除事项 ${title}？`} onConfirm={onDeleteItemConfirm}>
                                <Button type={'link'} className={Style.deleteButton}><Icon type="close" /></Button>
                            </Popconfirm>
                        </Tooltip>
                    </Button.Group>
                    <div className={Style.title} onClick={onClick}>
                        {done ? <del className={Style.done}>{title}</del> : title}
                    </div>
                    <div className={Style.time}>
                        {dateString}
                    </div>
                </div>
            </Spin>
            <Modal destroyOnClose={true}
                   width={'100vw'}
                   title={`${title} - ${dateTimeString}`}
                   visible={modalIsVisible}
                   onOk={onModalOk}
                   onCancel={onModalCancel} className={Style.modal}>
                {typeof description === 'string' && description.length !== 0 ?
                    <ArticleShower HTMLContent={markdownConverter.makeHtml(description)} />
                    : <Empty description={'没有描述'} />}
            </Modal>
        </Fragment>
    );
}

export default React.memo(TodoItemView);