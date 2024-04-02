import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from './layout/app.layout.component';
import { AuthGuard } from './core/guards/auth.guard';

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: 'admin',
                    component: AppLayoutComponent,
                    children: [
                        {
                            path: '',
                            canActivate:[AuthGuard],
                            loadChildren: () =>
                                import(
                                    './routes/admindashboard/dashboard/dashboard.module'
                                ).then((m) => m.DashboardModule),
                        },
                        {
                            path: 'users',
                            canActivate:[AuthGuard],
                            loadChildren: () =>
                                import(
                                    './routes/admindashboard/users/users.module'
                                ).then((m) => m.UsersModule),
                        },
                        {
                            path: 'products',
                            canActivate:[AuthGuard],
                            loadChildren: () =>
                                import(
                                    './routes/admindashboard/products/products.module'
                                ).then((m) => m.ProductsModule),
                        },
                        {
                            path: 'roles',
                            canActivate:[AuthGuard],
                            loadChildren: () =>
                                import(
                                    './routes/admindashboard/roles/roles.module'
                                ).then((m) => m.RolesModule),
                        },
                        {
                            path: 'categories',
                            canActivate:[AuthGuard],
                            loadChildren: () =>
                                import(
                                    './routes/admindashboard/category/category.module'
                                ).then((m) => m.CategoryModule),
                        },
                    ],
                },
                {
                    path: '',
                    loadChildren: () =>
                        import('./auth/auth.module').then((m) => m.AuthModule),
                },
                { path: '**', redirectTo: '' },
            ],
            {
                scrollPositionRestoration: 'enabled',
                anchorScrolling: 'enabled',
                onSameUrlNavigation: 'reload',
            }
        ),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule { }
