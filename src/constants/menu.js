const data = [{
    id: "dashboard",
    icon: "iconsminds-shop-4",
    label: "Dashboard",
    to: "/app/dashboards",
    subs: [{
        icon: "simple-icon-briefcase",
        label: "Home",
        to: "/app/dashboards/default"
      },
      {
        icon: "simple-icon-pie-chart",
        label: "Overview",
        to: "/app/dashboards/analytics"
      },
    ]
  },
  {
    id: "services",
    icon: "iconsminds-digital-drawing",
    label: "Our Services",
    to: "/app/pages/services",
    subs: [{
        id: "services-loan",
        label: "Loan Application",
        to: "/app/pages/services/loan-application",
        icon: "simple-icon-check",
      },
      {
        id: "services-land",
        label: "Land Application",
        to: "/app/pages/services/land-application",
        icon: "simple-icon-check",
      },
      {
        id: "services-savings",
        label: "Savings Application",
        to: "/app/pages/services/savings-application",
        icon: "simple-icon-check",
      },
    ]
  },
  {
    id: "monitors",
    icon: "iconsminds-air-balloon-1",
    label: "Your Monitors",
    to: "/app/pages/monitors",
    subs: [{
        icon: "simple-icon-check",
        label: "Loan Monitor",
        to: "/app/pages/monitors/loan-monitor"
      },
      {
        icon: "simple-icon-check",
        label: "Savings Monitor",
        to: "/app/pages/monitors/savings-monitor"
      }, {
        icon: "simple-icon-check",
        label: "Transactions Monitor",
        to: "/app/pages/monitors/transactions-monitor"
      },
    ]
  },
  {
    id: "billings",
    icon: "iconsminds-pantone",
    label: "Billing Tools",
    to: "/app/ui",
    subs: [{
        id: "billings-payplans",
        label: "Payment Plans",
        to: "/app/ui/forms",
        icon: "simple-icon-check",
      },
      {
        id: "billings-invoices",
        label: "Invoices",
        to: "/app/ui/components",
        icon: "simple-icon-check",
      },
      {
        id: "billings-store",
        label: "Store",
        to: "/app/ui/components",
        icon: "simple-icon-check",
      }
    ]
  },
];
export default data;
