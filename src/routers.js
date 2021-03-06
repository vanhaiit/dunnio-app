import React from 'react'
import FabricPage from './pages/fabric/fabric';
import ConfigPage from './pages/config/config';
import ExtraPage from './pages/extra/extra';
import NotFoundPage from './pages/not-found/not-found';

const routes = [

    {
        path: '/fabric/:id',
        exact: true,
        main: ({ match, history }) => <FabricPage match={match} history={history}></FabricPage>
    },
    {
        path: '/config/:id',
        exact: true,
        main: ({ match, history }) => <ConfigPage match={match} history={history}></ConfigPage>
    },
    {
        path: '/extra/:id',
        exact: true,
        main: ({ match, history }) => <ExtraPage match={match} history={history}></ExtraPage>
    },
    {
        path: '',
        exact: false,
        main: () => <NotFoundPage></NotFoundPage>
    }
]
export default routes;