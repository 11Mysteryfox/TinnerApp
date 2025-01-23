import { Routes } from '@angular/router'
import { HomeComponent } from './home/home.component'
import { NotFoundComponent } from './not-found/not-found.component'
import { LoginComponent } from './login/login.component'
import { ServerErrorComponent } from './server-error/server-error.component'
import { MemberComponent } from './member/member.component'

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'login',
        loadComponent: () => import('./login/login.component').then(c => c.LoginComponent)
    },
    {
        path: 'server-error',
        loadComponent: () => import('./server-error/server-error.component').then(c => c.ServerErrorComponent)
    }, {
        path: 'members',
        loadComponent: () => import('./member/member.component').then(c => c.MemberComponent)
    },
    {
        path: '404',
        loadComponent: () => import('./not-found/not-found.component').then(c => c.NotFoundComponent)
    },
    {
        path: '**',
        pathMatch: 'full',
        loadComponent: () => import('./not-found/not-found.component').then(c => c.NotFoundComponent)
    },
]
