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
    path: '/pages/hotel',
    icon: 'fa-solid fa-building'
  },
  {
    text: 'Cadastro de Quarto',
    icon: 'fa-solid fa-door-closed',
    items: [
      {
        text: 'Categoria',
        path: '/pages/categoria',
        icon: 'fa-solid fa-gem'
      },
      {
        text: 'Tipo',
        path: '/pages/tipo',
        icon: 'fa-solid fa-people-group'
      },
      {
        text: 'Quarto',
        path: '/pages/quarto',
        icon: 'fa-solid fa-door-open'
      }
    ]
  },
  {
    text: 'Hospede',
    path: '/pages/hospede',
    icon: 'fa-solid fa-user'
  },
  {
    text: 'Empresa',
    path: '/pages/empresa',
    icon: 'fa-solid fa-city'
  },
  {
    text: 'Reserva',
    path: '/pages/reserva',
    icon: 'fa-solid fa-calendar'
  }
];
