import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {HomePage} from './home.page';

const routes: Routes = [
    {
        path: '',
        component: HomePage,
        children: [
            {
                path: 'dashboard',
                children: [
                    {path: '', loadChildren: '../dashboard/dashboard.module#DashboardPageModule'}
                ]
            },
            {
                path: 'userinfo',
                children: [
                    {path: '', loadChildren: '../userinfo/userinfo.module#UserinfoPageModule'},
                ]
            }
        ]
    },
    {
        path: '',
        redirectTo: '/home/dashboard',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [HomePage]
})
export class HomePageModule {
}
