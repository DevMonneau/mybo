import React from 'react';

const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Clients = React.lazy(() => import('./views/Clients'));
// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/clients', name: 'Clients', component: Clients }
];

export default routes;
