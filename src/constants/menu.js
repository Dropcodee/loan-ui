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
    id: "business",
    icon: "iconsminds-digital-drawing",
    label: "Your Business",
    to: "/app/pages",
    subs: [{
        id: "business-transactions",
        label: "Transactions",
        to: "/user",
        icon: "simple-icon-check",
      },
      {
        id: "business-crypto",
        label: "Crypto Transactions",
        to: "/user",
        icon: "simple-icon-check",
      },
      {
        id: "business-customers",
        label: "Customers",
        to: "/user",
        icon: "simple-icon-check",
      },
      {
        id: "business-balance",
        label: "Balance",
        to: "/app/pages/product",
        icon: "simple-icon-check",
      },
      {
        id: "business-transfer",
        label: "Transfer",
        to: "/user",
        icon: "simple-icon-check",
      },
      {
        id: "business-subaccounts",
        label: "Subaccounts",
        to: "/user",
        icon: "simple-icon-check",
      },
      {
        id: "business-cards",
        label: "Cards",
        to: "/user",
        icon: "simple-icon-check",
      },
      {
        id: "business-dstv",
        label: "Airtime & DSTV",
        to: "/user",
        icon: "simple-icon-check",
      },
    ]
  },
  {
    id: "payments",
    icon: "iconsminds-air-balloon-1",
    label: "Collect Payments",
    to: "/app/applications",
    subs: [{
      icon: "simple-icon-check",
      label: "Payment Links",
      to: "/app/applications/todo"
    }, ]
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
