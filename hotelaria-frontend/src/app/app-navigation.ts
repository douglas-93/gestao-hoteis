export const navigation = [
    {
        text: 'Home',
        path: '/home',
        icon: 'home'
    },
    {
        text: 'Hotel',
        path: '/hotel',
        icon: 'fa-solid fa-building'
    },
    {
        text: 'Cadastro de Quartos',
        icon: 'fa-solid fa-door-closed',
        items: [
            {
                text: 'Categorias',
                path: '/categorias',
                icon: 'fa-solid fa-gem'
            },
            {
                text: 'Tipos',
                path: '/tipos',
                icon: 'fa-solid fa-people-group'
            },
            {
                text: 'Quartos',
                path: '/quartos',
                icon: 'fa-solid fa-door-open'
            }
        ]
    },
    {
        text: 'Hospedes',
        path: '/hospedes',
        icon: 'fa-solid fa-user'
    },
    {
        text: 'Empresas',
        path: '/empresas',
        icon: 'fa-solid fa-city'
    },
    {
        text: 'Monitor de Reservas',
        path: '/monitor-reservas',
        icon: 'fa-solid fa-table'
    },
    {
        text: 'Reservas',
        path: '/reservas',
        icon: 'fa-solid fa-calendar-days'
    },
    {
        text: 'Consumo de Reservas',
        path: '/consumo',
        icon: 'fa-solid fa-cart-shopping'
    },
    {
        text: 'Cadastro Produtos',
        path: '/produto',
        icon: 'fa-solid fa-barcode'
    },
    {
        text: 'Movimentos',
        path: '/estoque',
        icon: 'fa-solid fa-arrow-right-arrow-left'
    },
    {
        text: 'Configurações',
        path: '/configuracoes',
        icon: 'fa fa-gear'
    }
];
