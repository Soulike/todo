import {PAGE_ID} from './PAGE_ID';
import React from 'react';

const Login = React.lazy(() => import('../../Page/Login'));

export const PAGE_ID_TO_COMPONENT = {
    [PAGE_ID.LOGIN]: Login,
    [PAGE_ID.LIST]: undefined,
};