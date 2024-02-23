import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter, tap} from "rxjs";
import {MenuItem} from "primeng/api";

@Component({
  selector: 'breadcrumb-menu',
  templateUrl: './breadcrumb-menu.component.html',
  styles: ``
})
export class BreadcrumbMenuComponent implements OnInit {

  static readonly ROUTE_DATA_BREADCRUMB = 'breadcrumb';
  readonly home = {icon: 'pi pi-home', routerLink: '/inicio'};
  menuItems: MenuItem[] = [
    {label: 'mis listas', routerLink: '/mis-listas/listado'}
  ];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.menuItems = this.createBreadcrumbs(this.activatedRoute.root));
  }

  // @ts-ignore
  private createBreadcrumbs(route: ActivatedRoute, routerLink: string = '', breadcrumbs: MenuItem[] = []): MenuItem[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        routerLink += `/${routeURL}`;
      }

      const label = child.snapshot.data[BreadcrumbMenuComponent.ROUTE_DATA_BREADCRUMB];

      if (label != null ) {
        breadcrumbs.push({label, routerLink});
      }

      return this.createBreadcrumbs(child, routerLink, breadcrumbs);
    }
  }

}
