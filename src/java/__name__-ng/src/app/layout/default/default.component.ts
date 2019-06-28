import {
  Component,
  Inject,
  ComponentFactoryResolver,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
  Renderer2,
  ElementRef,
} from '@angular/core';
import {
  Router,
  NavigationEnd,
  RouteConfigLoadStart,
  NavigationError,
} from '@angular/router';
import { NzMessageService, NzIconService } from 'ng-zorro-antd';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { DOCUMENT } from '@angular/common';
import { environment } from '@env/environment';
import { SettingDrawerComponent } from './setting-drawer/setting-drawer.component';
import { Subscription } from 'rxjs';
import { updateHostClass } from '@delon/util';
import { ScrollService, MenuService, SettingsService } from '@delon/theme';
declare var G2:any;

// #region icons

import {
  MenuFoldOutline,
  MenuUnfoldOutline,
  SearchOutline,
  SettingOutline,
  FullscreenOutline,
  FullscreenExitOutline,
  BellOutline,
  LockOutline,
  PlusOutline,
  UserOutline,
  LogoutOutline,
  EllipsisOutline,
  GlobalOutline,
  ArrowDownOutline,
  // Optional
  GithubOutline,
  AppstoreOutline,
} from '@ant-design/icons-angular/icons';

const ICONS = [
  MenuFoldOutline,
  MenuUnfoldOutline,
  SearchOutline,
  SettingOutline,
  FullscreenOutline,
  FullscreenExitOutline,
  BellOutline,
  LockOutline,
  PlusOutline,
  UserOutline,
  LogoutOutline,
  EllipsisOutline,
  GlobalOutline,
  ArrowDownOutline,
  // Optional
  GithubOutline,
  AppstoreOutline,
];

// #endregion

@Component({
  selector: 'layout-default',
  templateUrl: './default.component.html',
  preserveWhitespaces: false,
  host: {
    '[class.alain-default]': 'true',
  },
})
export class LayoutDefaultComponent
  implements OnInit, AfterViewInit, OnDestroy {
  private notify$: Subscription;
  isFetching = false;
  @ViewChild('settingHost', { read: ViewContainerRef })
  settingHost: ViewContainerRef;
  constructor(
    iconSrv: NzIconService,
    private router: Router,
    scroll: ScrollService,
    private _message: NzMessageService,
    private resolver: ComponentFactoryResolver,
    public menuSrv: MenuService,
    public settings: SettingsService,
    private el: ElementRef,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private doc: any,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
  ) {
    $(document).ajaxError(function(event, xhr, options, exc) {
      if (xhr.status === 401) {
        router.navigateByUrl(tokenService.login_url);
      }
    });
    iconSrv.addIcon(...ICONS);
    // scroll to top in change page
    router.events.subscribe(evt => {
      if (!this.isFetching && evt instanceof RouteConfigLoadStart) {
        this.isFetching = true;
      }
      if (evt instanceof NavigationError) {
        this.isFetching = false;
        _message.error(`无法加载${evt.url}路由`, { nzDuration: 1000 * 3 });
        return;
      }
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      setTimeout(() => {
        scroll.scrollToTop();
        this.isFetching = false;
      }, 100);
    });
  }

  private setClass() {
    const { el, renderer, settings } = this;
    const layout = settings.layout;
    updateHostClass(
      el.nativeElement,
      renderer,
      {
        ['alain-default']: true,
        [`alain-default__fixed`]: layout.fixed,
        [`alain-default__boxed`]: layout.boxed,
        [`alain-default__collapsed`]: layout.collapsed,
      },
      true,
    );

    this.doc.body.classList[layout.colorWeak ? 'add' : 'remove']('color-weak');
  }

  ngAfterViewInit(): void {
    // Setting componet for only developer
    if (!environment.production) {
      setTimeout(() => {
        const settingFactory = this.resolver.resolveComponentFactory(
          SettingDrawerComponent,
        );
        this.settingHost.createComponent(settingFactory);
      }, 22);
    }
  }

  ngOnInit() {
    this.notify$ = this.settings.notify.subscribe(() => this.setClass());
    this.setClass();
    //设置G2主题
    const theme = G2.Util.deepMix({  
      colors:[
      "#27cffe",
      "#53e59e",
      "#ffc954",
      "#ff7575",
      "#a992fc",
      "#88e3fc",
      "#88c2fc",
      "#aac0ff"],
      colors_16: [
        "#27cffe",
        "#53e59e",
        "#ffc954",
        "#ff7575",
        "#a992fc",
        "#88e3fc",
        "#88c2fc",
        "#aac0ff"],
      colors_24: [
        "#27cffe",
        "#53e59e",
        "#ffc954",
        "#ff7575",
        "#a992fc",
        "#88e3fc",
        "#88c2fc",
        "#aac0ff"],
      colors_pie: [
        "#27cffe",
        "#53e59e",
        "#ffc954",
        "#ff7575",
        "#a992fc",
        "#88e3fc",
        "#88c2fc",
        "#aac0ff"],
      colors_pie_16: [
        "#27cffe",
        "#53e59e",
        "#ffc954",
        "#ff7575",
        "#a992fc",
        "#88e3fc",
        "#88c2fc",
        "#aac0ff"],
      axis:{
        left:{
          line:{
            stroke: '#fff'
          },
          label:{
            textStyle:{
              fill:"#fff"
            }
          }
        },
        bottom:{
          line:{
            stroke: '#fff'
          },
          label:{
            textStyle:{
              fill:"#fff"
            }
          }
        },
        right:{
          line:{
            stroke: '#fff'
          },
          label:{
            textStyle:{
              fill:"#fff"
            }
          }
        }
        ,
        top:{
          line:{
            stroke: '#fff'
          },
          label:{
            textStyle:{
              fill:"#fff"
            }
          }
        },
        circle:{
          label:{
            textStyle:{
              fill:"#fff"
            }
          }
        },
        radius:{
          label:{
            textStyle:{
              fill:"#fff"
            }
          }
        },
        helix:{
          line:{
            stroke: '#fff'
          },
          label:{
            textStyle:{
              fill:"#fff"
            }
          }
        }      
      },
      legend:{
        right:{
          textStyle:{
            fill:"#fff"
          },
          unCheckColor: '#fff'
        },
        left:{
          textStyle:{
            fill:"#fff"
          },
          unCheckColor: '#fff'
        },
        top:{
          textStyle:{
            fill:"#fff"
          },
          unCheckColor: '#fff'
        },
        bottom:{
          textStyle:{
            fill:"#fff"
          },
          unCheckColor: '#fff'
        }
      },
      label: {
        textStyle: {
          fill: '#fff'
        }
      }
      // 具体的配置项详见 api/global.html
    }, G2.Theme);
    // console.log(G2.Global);
    G2.Global.setTheme(theme);
  }

  ngOnDestroy() {
    this.notify$.unsubscribe();
  }
}
