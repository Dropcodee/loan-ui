import Vue from "vue";
import VueRouter from "vue-router";
import AuthRequired from "./utils/AuthRequired";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import( /* webpackChunkName: "app" */ "./views/app"),
    redirect: "/app/dashboards",
    beforeEnter: AuthRequired,
    children: [{
      path: "app/dashboards",
      component: () =>
        import( /* webpackChunkName: "dashboards" */ "./views/app/dashboards"),
      redirect: "/app/dashboards/default",
      children: [{
        path: "/app/dashboards/default",
        name: 'dashboard',
        component: () =>
          import( /* webpackChunkName: "dashboards" */ "./views/app/dashboards/Default")
      },
      {
        path: "analytics",
        component: () =>
          import( /* webpackChunkName: "dashboards" */ "./views/app/dashboards/Analytics")
      },
      {
        path: "ecommerce",
        component: () =>
          import( /* webpackChunkName: "dashboards" */ "./views/app/dashboards/Ecommerce")
      },
      {
        path: "content",
        component: () =>
          import( /* webpackChunkName: "dashboards" */ "./views/app/dashboards/Content")
      }
      ]
    },
    {
      path: "app/pages",
      component: () =>
        import( /* webpackChunkName: "pages" */ "./views/app/pages"),
      redirect: "/app/pages/services",
      children: [{
        path: "services",
        component: () =>
          import( /* webpackChunkName : "product" */ "./views/app/pages/services"),
        redirect: "/app/pages/services/loan-application",
        children: [{
          path: "/app/pages/services/loan-application",
          name: 'loan-application',
          component: () =>
            import( /* webpackChunkName: "product" */ "./views/app/pages/services/LoanApplication")
        },
        {
          path: "/app/pages/services/land-application",
          name: 'land-application',
          component: () =>
            import( /* webpackChunkName: "product" */ "./views/app/pages/services/LandApplication")
        },
        {
          path: "savings-application",
          name: 'savings-application',
          component: () =>
            import( /* webpackChunkName: "product" */ "./views/app/pages/services/SavingsApplication")
        },
        {
          path: "/app/pages/services/car-aquisition",
          name: 'car-aquisition',
          component: () =>
            import( /* webpackChunkName: "product" */ "./views/app/pages/services/CarAquisition")
        },
        {
          path: "/app/pages/services/credit-loan",
          name: 'credit-loan',
          component: () =>
            import( /* webpackChunkName: "product" */ "./views/app/pages/services/CreditLoan")
        },
        ]
      },
      {
        path: "profile",
        component: () =>
          import( /* webpackChunkName : "profile" */ "./views/app/pages/profile"),
        redirect: "/app/pages/profile/social",
        children: [{
          path: "social",
          component: () =>
            import( /* webpackChunkName: "profile" */ "./views/app/pages/profile/Social")
        },
        {
          path: "portfolio",
          component: () =>
            import( /* webpackChunkName: "profile" */ "./views/app/pages/profile/Portfolio")
        },
        {
          path: "settings",
          component: () =>
            import( /* webpackChunkName: "profile" */ "./views/app/pages/profile/Settings")
        }
        ]
      },
      {
        path: "monitors",
        component: () =>
          import( /* webpackChunkName : "profile" */ "./views/app/pages/monitors"),
        redirect: "/app/pages/monitors/loan-monitor",
        children: [{
          path: "/app/pages/monitors/loan-monitor",
          name: 'loan-monitor',
          component: () =>
            import( /* webpackChunkName: "profile" */ "./views/app/pages/monitors/LoanMonitor")
        },
        {
          path: "/app/pages/monitors/savings-monitor",
          name: 'savings-monitor',
          component: () =>
            import( /* webpackChunkName: "profile" */ "./views/app/pages/monitors/SavingsMonitor")
        },
        {
          path: "/app/pages/monitors/transactions-monitor",
          name: 'transactions-monitor',
          component: () =>
            import( /* webpackChunkName: "profile" */ "./views/app/pages/monitors/TransactionsMonitor")
        }
        ]
      },
      {
        path: "miscellaneous",
        component: () =>
          import( /* webpackChunkName : "miscellaneous" */ "./views/app/pages/miscellaneous"),
        redirect: "/app/pages/miscellaneous/faq",
        children: [{
          path: "faq",
          component: () =>
            import( /* webpackChunkName: "miscellaneous" */ "./views/app/pages/miscellaneous/Faq")
        },
        {
          path: "knowledge-base",
          component: () =>
            import( /* webpackChunkName: "miscellaneous" */ "./views/app/pages/miscellaneous/KnowledgeBase")
        },
        {
          path: "search",
          component: () =>
            import( /* webpackChunkName: "miscellaneous" */ "./views/app/pages/miscellaneous/Search")
        },
        {
          path: "prices",
          component: () =>
            import( /* webpackChunkName: "miscellaneous" */ "./views/app/pages/miscellaneous/Prices")
        },
        {
          path: "mailing",
          component: () =>
            import( /* webpackChunkName: "miscellaneous" */ "./views/app/pages/miscellaneous/Mailing")
        },
        {
          path: "invoice",
          component: () =>
            import( /* webpackChunkName: "miscellaneous" */ "./views/app/pages/miscellaneous/Invoice")
        }
        ]
      }
      ]
    },
    {
      path: "app/applications",
      component: () =>
        import( /* webpackChunkName: "applications" */ "./views/app/applications"),
      redirect: "/app/applications/todo",
      children: [{
        path: "todo",
        component: () =>
          import( /* webpackChunkName: "applications" */ "./views/app/applications/Todo")
      },
      {
        path: "survey",
        component: () =>
          import( /* webpackChunkName: "applications" */ "./views/app/applications/Survey")
      },
      {
        path: "survey/:id",
        component: () =>
          import( /* webpackChunkName: "applications" */ "./views/app/applications/SurveyDetail"),
        props: true
      },
      {
        path: "chat",
        component: () =>
          import( /* webpackChunkName: "applications" */ "./views/app/applications/Chat")
      }
      ]
    },
    {
      path: "app/ui",
      component: () => import( /* webpackChunkName: "ui" */ "./views/app/ui"),
      redirect: "/app/ui/forms",
      children: [{
        path: "forms",
        component: () =>
          import( /* webpackChunkName : "forms" */ "./views/app/ui/forms"),
        redirect: "/app/ui/forms/layouts",
        children: [{
          path: "layouts",
          component: () =>
            import( /* webpackChunkName: "forms" */ "./views/app/ui/forms/Layouts")
        },
        {
          path: "components",
          component: () =>
            import( /* webpackChunkName: "forms" */ "./views/app/ui/forms/Components")
        },
        {
          path: "validations",
          component: () =>
            import( /* webpackChunkName: "forms" */ "./views/app/ui/forms/Validations")
        },
        {
          path: "wizard",
          component: () =>
            import( /* webpackChunkName: "forms" */ "./views/app/ui/forms/Wizard")
        },
        ]
      },
      {
        path: "components",
        component: () =>
          import( /* webpackChunkName : "components" */ "./views/app/ui/components"),
        redirect: "/app/ui/components/alerts",
        children: [{
          path: "alerts",
          component: () =>
            import( /* webpackChunkName: "components" */ "./views/app/ui/components/Alerts")
        },
        {
          path: "badges",
          component: () =>
            import( /* webpackChunkName: "components" */ "./views/app/ui/components/Badges")
        },
        {
          path: "buttons",
          component: () =>
            import( /* webpackChunkName: "components" */ "./views/app/ui/components/Buttons")
        },
        {
          path: "cards",
          component: () =>
            import( /* webpackChunkName: "components" */ "./views/app/ui/components/Cards")
        },
        {
          path: "carousel",
          component: () =>
            import( /* webpackChunkName: "components" */ "./views/app/ui/components/Carousel")
        },
        {
          path: "charts",
          component: () =>
            import( /* webpackChunkName: "components" */ "./views/app/ui/components/Charts")
        },
        {
          path: "collapse",
          component: () =>
            import( /* webpackChunkName: "components" */ "./views/app/ui/components/Collapse")
        },
        {
          path: "dropdowns",
          component: () =>
            import( /* webpackChunkName: "components" */ "./views/app/ui/components/Dropdowns")
        },
        {
          path: "editors",
          component: () =>
            import( /* webpackChunkName: "components" */ "./views/app/ui/components/Editors")
        },
        {
          path: "icons",
          component: () =>
            import( /* webpackChunkName: "components" */ "./views/app/ui/components/Icons")
        },
        {
          path: "input-groups",
          component: () =>
            import( /* webpackChunkName: "components" */ "./views/app/ui/components/InputGroups")
        },
        {
          path: "jumbotron",
          component: () =>
            import( /* webpackChunkName: "components" */ "./views/app/ui/components/Jumbotron")
        },
        {
          path: "maps",
          component: () =>
            import( /* webpackChunkName: "components" */ "./views/app/ui/components/Maps")
        },
        {
          path: "modal",
          component: () =>
            import( /* webpackChunkName: "components" */ "./views/app/ui/components/Modal")
        },
        {
          path: "navigation",
          component: () =>
            import( /* webpackChunkName: "components" */ "./views/app/ui/components/Navigation")
        },
        {
          path: "popover-tooltip",
          component: () =>
            import( /* webpackChunkName: "components" */ "./views/app/ui/components/PopoverTooltip")
        },
        {
          path: "sortable",
          component: () =>
            import( /* webpackChunkName: "components" */ "./views/app/ui/components/Sortable")
        },
        {
          path: "tables",
          component: () =>
            import( /* webpackChunkName: "components" */ "./views/app/ui/components/Tables")
        }
        ]
      }
      ]
    },
    {
      path: "app/menu",
      component: () =>
        import( /* webpackChunkName: "menu" */ "./views/app/menu"),
      redirect: "/app/menu/types",
      children: [{
        path: "types",
        component: () =>
          import( /* webpackChunkName : "menu-types" */ "./views/app/menu/Types")
      },
      {
        path: "levels",
        component: () =>
          import( /* webpackChunkName : "menu-levels" */ "./views/app/menu/levels"),
        redirect: "/app/menu/levels/third-level-1",
        children: [{
          path: "third-level-1",
          component: () =>
            import( /* webpackChunkName: "menu-levels" */ "./views/app/menu/levels/Third-level-1")
        },
        {
          path: "third-level-2",
          component: () =>
            import( /* webpackChunkName: "menu-levels" */ "./views/app/menu/levels/Third-level-2")
        },
        {
          path: "third-level-3",
          component: () =>
            import( /* webpackChunkName: "menu-levels" */ "./views/app/menu/levels/Third-level-3")
        }
        ]
      }
      ]
    },
    {
      path: "app/blank-page",
      component: () =>
        import( /* webpackChunkName: "blank-page" */ "./views/app/blank-page")
    },
    {
      path: "/404",
      name: '404',
      component: () =>
        import("./components/payo/Errors/NotFound-404")
    }
    ]
  },
  {
    path: "/error",
    component: () => import( /* webpackChunkName: "error" */ "./views/Error")
  }, {
    path: "/user",
    component: () => import( /* webpackChunkName: "user" */ "./views/user"),
    redirect: "/user/login",
    children: [{
      path: "/user/login",
      name: 'Login',
      component: () =>
        import( /* webpackChunkName: "user" */ "./views/user/Login")
    },
    {
      path: "/user/register",
      name: 'Register',
      component: () =>
        import( /* webpackChunkName: "user" */ "./views/user/Register")
    },
    {
      path: "forgot-password",
      name: 'ForgotPassword',
      component: () =>
        import( /* webpackChunkName: "user" */ "./views/user/ForgotPassword")
    },
    {
      path: "reset-password",
      name: 'ResetPassword',
      component: () =>
        import( /* webpackChunkName: "user" */ "./views/user/ResetPassword")
    },

    ]
  }, {
    path: "*",
    component: () => import( /* webpackChunkName: "error" */ "./views/Error")
  }, {
    path: "/table",
    component: () => import( /* webpackChunkName: "new" */ "./views/app/ui/components/Tables")
  }, {
    path: "/test-table",
    component: () => import( /* webpackChunkName: "new" */ "@/components/Common/Table")
  },{
    path: "/test-form",
    component: () => import( /* webpackChunkName: "new" */ "./views/app/ui/forms/Layouts")
  },{
    path: "/test-modal",
    component: () => import( /* webpackChunkName: "new" */ "./views/app/ui/components/Modal")
  }
];

const router = new VueRouter({
  linkActiveClass: "active",
  routes,
  mode: "history"
});

export default router;
