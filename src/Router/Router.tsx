import React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import {PAGE_ID, PAGE_ID_TO_COMPONENT, PAGE_ID_TO_ROUTE} from '../CONFIG/PAGE';
import NotFound from '../Component/NotFound';

export default () =>
{
    return (
        <BrowserRouter>
            <Switch>
                <Redirect path={'/'} to={PAGE_ID_TO_ROUTE[PAGE_ID.LOGIN]} exact={true} />
                {
                    Object.values(PAGE_ID).map(pageId => <Route exact={true} path={PAGE_ID_TO_ROUTE[pageId]}
                                                                component={PAGE_ID_TO_COMPONENT[pageId]} />)
                }
                <Route render={NotFound} />
            </Switch>
        </BrowserRouter>
    );
};