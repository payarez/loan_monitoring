import { Routes } from '@angular/router';
import { MainLayout } from './components/layout/main-layout/main-layout';
import { Dashboard } from './pages/dashboard/dashboard';
import { Loans } from './pages/loans/loans';
import { Categories } from './pages/categories/categories';
import { Borrowers } from './pages/borrowers/borrowers';
import { Settings } from './pages/settings/settings';
import { Login } from './pages/auth/login/login';
import { Register } from './pages/auth/register/register';

export const routes: Routes = [
    {
        path: 'auth',
        children: [
            { path: 'login', component: Login },
            { path: 'register', component: Register },
            { path: '', redirectTo: 'login', pathMatch: 'full' }
        ]
    },
    {
        path: '',
        component: MainLayout,
        children: [
            { path: 'dashboard', component: Dashboard },
            { path: 'loans', component: Loans },
            { path: 'categories', component: Categories },
            { path: 'borrowers', component: Borrowers },
            { path: 'settings', component: Settings },
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
    },
    { path: '**', redirectTo: 'dashboard' }
];