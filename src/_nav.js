export default {
  items: [
    {
      name: 'Accueil',
      url: '/acceuil',
      icon: 'icon-home'
    },
    {
      name: 'Finance',
      url: '/finance',
      icon: 'cui-credit-card',
      children: [
        {
          name: 'Personnelle',
          url: '/finance/perso'
        },
        {
          name: 'Professionnelle',
          url: '/finance/pro'
        }
      ]
    },
    {
      name: 'Clients',
      url: '/finance',
      icon: 'cui-credit-card'
    },
    {
      name: 'Documents',
      url: '/docs',
      icon: 'cui-envelope-open',
      children: [
        {
          name: 'Personnels',
          url: '/docs/perso'
        },
        {
          name: 'Professionnels',
          url: '/docs/pro'
        }
      ]
    },
    {
      name: 'Missions',
      url: '/missions',
      icon: 'cui-task'
    },
    {
      name: 'Objectifs',
      url: '/objectifs',
      icon: 'cui-list',
      children: [
        {
          name: 'Personnels',
          url: '/objectifs/perso'
        },
        {
          name: 'Professionnels',
          url: '/objectifs/pro'
        },
        {
          name: 'Financiers',
          url: '/objectifs/financier'
        }
      ]
    },
  ]
};
