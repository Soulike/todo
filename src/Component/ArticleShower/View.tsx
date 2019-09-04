import React from 'react';
import Style from './Style.module.scss';
import {Skeleton} from 'antd';

interface Props
{
    HTMLContent: string,
    loading?: boolean,
}

function ArticleShowerView(props: Props)
{

    const {HTMLContent, loading} = props;
    return (
        <Skeleton active={true} loading={loading} paragraph={{rows: 2}}>
            <article className={Style.ArticleShower} dangerouslySetInnerHTML={{__html: HTMLContent}} />
        </Skeleton>
    );
}

export default React.memo(ArticleShowerView);