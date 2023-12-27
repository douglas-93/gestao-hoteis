export const navigation = [
    {
        text: 'Home',
        path: '/home',
        icon: 'home'
    },
    // {
    //   text: 'Examples',
    //   icon: 'folder',
    //   items: [
    //     {
    //       text: 'Profile',
    //       path: '/profile'
    //     },
    //     {
    //       text: 'Tasks',
    //       path: '/tasks'
    //     }
    //   ]
    // },
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
    path: '/pages/configuracoes',
    icon: 'fa fa-gear'
  },
  {
    text: 'Check In',
    path: '/pages/check-in',
    icon: 'fa-solid fa-money-check'
  },
  {
    text: 'Check Out',
    path: '/pages/check-out',
    icon: 'fa-solid fa-check-double'
  },
  {
    text: 'Consumo',
    path: '/pages/consumo',
    icon: 'fa-solid fa-cart-shopping'
  },
  {
    text: 'Monitor Reservas',
    path: '/pages/monitor-reservas',
    icon: 'folder'
  }
];
