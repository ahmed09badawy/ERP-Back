const SYSTEM_PERMISSION_MATRIX = [
    {
        module: "user_management",
        pages: ["users", "roles", "permissions", "companies", "branches"],
    },
    {
        module: "sales",
        pages: [
            "orders",
            "customers",
            "invoices",
            "invoice_details",
            "sales_returns",
            "pricing_rules",
            "discounts",
            "promotions",
            "quotations",
            "products",
        ],
    },
    {
        module: "purchases",
        pages: [
            "suppliers",
            "purchase_requests",
            "purchase_orders",
            "purchase_invoices",
            "supplier_ratings",
            "goods_receipts",
            "returns_to_supplier",
        ],
    },
    {
        module: "inventory",
        pages: [
            "products",
            "stock",
            "warehouses",
        ],
    },
    {
        module: "hr",
        pages: [
            "employees",
            "attendance",
            "payroll",
            "deductions",
            "leaves",
            "requests",
            "contracts",
            "insurance_policies",
            "penalties",
            "rewards",
            "departments",
            "jobs",
            "performance",
            "onboarding",
            "end_of_service",
            "reports",
        ],
    },
    {
        module: "accounting",
        pages: [
            "income",
            "expenses",
            "balance_sheet",
            "bank_accounts",
            "chart_of_accounts",
            "currencies",
            "currency_exchange",
        ],
    },
    {
        module: "assets",
        pages: [
            "asset_register",
            "maintenance",
            "depreciation",
            "allocation",
            "tracking",
        ],
    },
    {
        module: "fleet",
        pages: [
            "vehicles",
            "drivers",
            "trips",
            "maintenance",
            "accidents",
            "fuel_logs",
        ],
    },
    {
        module: "manufacturing",
        pages: [
            "boms",
            "manufacturing_orders",
            "operations",
            "work_centers",
            "production_reports",
            "material_requirements",
            "work_in_progress",
        ],
    },
];

module.exports = { SYSTEM_PERMISSION_MATRIX };
