export const navigation = [
    {
        text: 'Home',
        path: '/home',
        icon: 'home'
    },
    {
        text: 'Monitor Reservas',
        path: '/monitor-reservas',
        icon: 'folder'
    },
    {
        text: 'Hotel',
        path: '/hotel',
        icon: 'fa-solid fa-building'
    },
    {
        text: 'Cadastro de Quarto',
        icon: 'fa-solid fa-door-closed',
        items: [
            {
                text: 'Categoria',
                path: '/categorias',
                icon: 'fa-solid fa-gem'
            },
            {
                text: 'Tipo',
                path: '/tipos',
                icon: 'fa-solid fa-people-group'
            },
            {
                text: 'Quarto',
                path: '/quartos',
                icon: 'fa-solid fa-door-open'
            }
        ]
    },
    {
        text: 'Hospede',
        path: '/hospedes',
        icon: 'fa-solid fa-user'
    },
    {
        text: 'Empresa',
        path: '/empresas',
        icon: 'fa-solid fa-city'
    },
    {
        text: 'Reserva',
        path: '/reservas',
        icon: 'fa-solid fa-calendar'
    },
    {
        text: 'Configurações',
        path: '/configuracoes',
        icon: 'fa fa-gear'
    },
    {
        text: 'Produto',
        path: '/pages/produto',
        icon: 'fa-solid fa-cart-shopping'
    },
    {
        text: 'Consumo',
        path: '/consumo',
        icon: 'fa-solid fa-cart-plus'
    }
];
