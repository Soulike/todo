import React from 'react';
import Style from './Style.module.scss';
import notFoundImage from '../../Static/404_page_not_found_1.svg';

export default function NotFound()
{
    return (
        <div className={Style.NotFound}>
            <img src={notFoundImage} alt="not-found" className={Style.image} />
        </div>
    );
}