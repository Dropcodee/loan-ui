const data = [{
        id: "dashboard",
        icon: "iconsminds-shop-4",
        label: "Dashboard",
        to: "/app/dashboards",
        subs: [{
                icon: "simple-icon-briefcase",
                label: "Home",
                to: "dashboard"
            },
            {
                icon: "simple-icon-pie-chart",
                label: "Overview",
                to: "analytics"
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
                label: "Commodity Loan",
                to: "commodity-application",
                icon: "simple-icon-check",
            },
            {
                id: "services-credit",
                label: "Credit Loan Application",
                to: "credit-application",
                icon: "simple-icon-check",
            },
            {
                id: "services-car",
                label: "Car Aquisition Loan",
                to: "car-application",
                icon: "simple-icon-check",
            },
            {
                id: "services-savings",
                label: "Savings Application",
                to: "savings-application",
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
                to: "loan-monitor"
            },
            {
                icon: "simple-icon-check",
                label: "Savings Monitor",
                to: "savings-monitor"
            }, {
                icon: "simple-icon-check",
                label: "Transactions Monitor",
                to: "transactions-monitor"
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