import role from 'constants/roles';

export default [
  { route: '', moduleId: './products/products', settings: {title: 'nav.products'}, nav: false, auth: true  },
  { route: 'products', moduleId: './products/products', settings: {title: 'nav.products'}, nav: true, auth: true  },
  { route: 'users', moduleId: './users/users', settings: {title: 'nav.users'}, nav: true, auth: true, permission: role.admin }
];