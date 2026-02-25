import { adminRoot } from './defaultValues';

const data = [
  {
    id: 'dashboards',
    icon: 'iconsminds-shop-4',
    label: 'menu.dashboards',
    to: `${adminRoot}/dashboards`,
    // roles: [UserRole.Admin, UserRole.Editor],
    // subs: [
    //   {
    //     icon: 'simple-icon-briefcase',
    //     label: 'menu.default',
    //     to: `${adminRoot}/dashboards/default`,
    //     // roles: [UserRole.Admin],
    //   },
    //   {
    //     icon: 'simple-icon-pie-chart',
    //     label: 'menu.analytics',
    //     to: `${adminRoot}/dashboards/analytics`,
    //     // roles: [UserRole.Admin],
    //   },
    //   {
    //     icon: 'simple-icon-basket-loaded',
    //     label: 'menu.ecommerce',
    //     to: `${adminRoot}/dashboards/ecommerce`,
    //     // roles: [UserRole.Editor],
    //   },
    //   {
    //     icon: 'simple-icon-doc',
    //     label: 'menu.content',
    //     to: `${adminRoot}/dashboards/content`,
    //     // roles: [UserRole.Editor],
    //   },
    // ],
  },
   {
    id: 'system-memory',
    icon: 'iconsminds-server-2',
    label: 'menu.system-memory',
    to: `${adminRoot}/system-memory`,
  },
  {
    id: 'notebook',
    icon: 'simple-icon-notebook',
    label: 'menu.notebook',
    to: `${adminRoot}/notebook`,
  },
  {
    id: 'AuctionHouse',
    icon: 'iconsminds-monitor-analytics',
    label: 'menu.auction-house',
    to: `${adminRoot}/auction-house`,
    // subs: [
    //   {
    //     icon: 'simple-icon-list',
    //     label: 'menu.list',
    //     to: `${adminRoot}/product/list`,
    //     // roles: [UserRole.Admin],
    //   },
    //   {
    //     icon: 'simple-icon-plus',
    //     label: 'menu.add',
    //     to: `${adminRoot}/product/add`,
    //     // roles: [UserRole.Editor],
    //   },
    // ],
  },
  {
    id: 'Auction',
    icon: 'iconsminds-video-6',
    label: 'menu.auctions',
    to: `${adminRoot}/auctions/list`,
    // subs: [
    //   {
    //     icon: 'simple-icon-list',
    //     label: 'menu.list',
    //     to: `${adminRoot}/auctions/list`,
    //     // roles: [UserRole.Admin],
    //   },
    //   {
    //     icon: 'simple-icon-plus',
    //     label: 'menu.add',
    //     to: `${adminRoot}/auctions/add`,
    //     // roles: [UserRole.Editor],
    //   },
    // ],
  },
  {
    id: 'product-delivery-conflicts',
    icon: 'simple-icon-exclamation',
    label: 'menu.delivery_conflicts',
    to: `${adminRoot}/product-delivery-conflicts`,
  },
  {
    id: 'Player',
    icon: 'simple-icon-people',
    label: 'menu.player',
    to: `${adminRoot}/players`,
  },
  // {
  //   id: 'Vendor',
  //   icon: 'iconsminds-shop-4',
  //   label: 'menu.vendor',
  //   to: `${adminRoot}/vendor`,
  //   roles: ["Admin"],
  //   subs: [
  //     {
  //       icon: 'simple-icon-list',
  //       label: 'menu.list',
  //       to: `${adminRoot}/vendor/list`,
  //       roles: ["Admin"],
  //     },
  //     {
  //       icon: 'simple-icon-plus',
  //       label: 'menu.add',
  //       to: `${adminRoot}/vendor/add`,
  //       roles: ["Admin"],
  //     },
  //   ],
  // },
  {
    id: 'PlayAuction',
    icon: 'iconsminds-mail-money',
    label: 'menu.playsAuction',
    to: `${adminRoot}/auctions-plays`,
  },
  {
    id: 'Verify Followed User',
    icon: 'simple-icon-user-follow',
    label: 'menu.followUser',
    to: `${adminRoot}/verify-followed-user`,
  },
  {
    id: 'Payment Gateway',
    icon: 'simple-icon-wallet',
    label: 'menu.payment-gateway',
    to: `${adminRoot}/payment-gateway`,
  },
  {
    id: 'Plans',
    icon: 'iconsminds-pricing',
    label: 'menu.plans',
    to: `${adminRoot}/plans`,
  },
  {
    id: 'Supported Chain',
    icon: 'simple-icon-link',
    label: 'menu.supported-chain',
    to: `${adminRoot}/supported-chain`,
  },
  {
    id: 'RequestReceived',
    icon: 'iconsminds-coins',
    label: 'menu.request-received',
    to: `${adminRoot}/request-received`,
  },
  {
    id: 'Revenue',
    icon: 'iconsminds-letter-open',
    label: 'menu.revenue',
    to: `${adminRoot}/revenue/list`,
  },
  {
    id: 'Server Logs',
    icon: 'iconsminds-disk',
    label: 'menu.logs',
    to: `${adminRoot}/server-logs`,
  },
  {
    id: 'Config',
    icon: 'simple-icon-settings',
    label: 'menu.system-config',
    to: `${adminRoot}/system-config`,
  },
  // {
  //   id: 'Settings',
  //   icon: 'iconsminds-gear',
  //   label: 'menu.settings',
  //   to: `${adminRoot}/settings`,
  // },
  // {
  //   id: 'BidLogs',
  //   icon: 'iconsminds-time-backup',
  //   label: 'menu.bids-log',
  //   to: `${adminRoot}/bids-log/list`,
  // },
  // {
  //   id: 'Play Accounts',
  //   icon: 'iconsminds-monitor-analytics',
  //   label: 'menu.play-account',
  //   to: `${adminRoot}/play-account/list`,
  // },
  // {
  //   id: 'Currency',
  //   icon: 'iconsminds-calculator',
  //   label: 'menu.currency',
  //   to: `${adminRoot}/currency`,
  // },
  // {
  //   id: 'Referral Code',
  //   icon: 'iconsminds-monitor-analytics',
  //   label: 'menu.referral-code',
  //   to: `${adminRoot}/referral-code`,
  // },
  // {
  //   id: 'Winner log',
  //   icon: 'iconsminds-trophy or iconsminds-crown-2',
  //   label: 'menu.winner-log',
  //   to: `${adminRoot}/winner-log/list`,
  // },
  // {
  //   id: 'Prize Distribution',
  //   icon: 'iconsminds-king-2 or iconsminds-diploma-2',
  //   label: 'menu.prize-distribution',
  //   to: `${adminRoot}/prize-distribution/list`,
  // },
  // {
  //   id: 'pages',
  //   icon: 'iconsminds-digital-drawing',
  //   label: 'menu.pages',
  //   to: `${adminRoot}/pages`,
  //   subs: [
  //     {
  //       id: 'pages-authorization',
  //       label: 'menu.authorization',
  //       to: '/user',
  //       subs: [
  //         {
  //           icon: 'simple-icon-user-following',
  //           label: 'menu.login',
  //           to: '/user/login',
  //           newWindow: true,
  //         },
  //         {
  //           icon: 'simple-icon-user-follow',
  //           label: 'menu.register',
  //           to: '/user/register',
  //           newWindow: true,
  //         },
  //         {
  //           icon: 'simple-icon-user-following',
  //           label: 'menu.forgot-password',
  //           to: '/user/forgot-password',
  //           newWindow: true,
  //         },
  //         {
  //           icon: 'simple-icon-user-unfollow',
  //           label: 'menu.reset-password',
  //           to: '/user/reset-password',
  //           newWindow: true,
  //         },
  //       ],
  //     },
  //     {
  //       id: 'pages-product',
  //       label: 'menu.product',
  //       to: `${adminRoot}/pages/product`,
  //       subs: [
  //         {
  //           icon: 'simple-icon-credit-card',
  //           label: 'menu.data-list',
  //           to: `${adminRoot}/pages/product/data-list`,
  //         },
  //         {
  //           icon: 'simple-icon-list',
  //           label: 'menu.thumb-list',
  //           to: `${adminRoot}/pages/product/thumb-list`,
  //         },
  //         {
  //           icon: 'simple-icon-grid',
  //           label: 'menu.image-list',
  //           to: `${adminRoot}/pages/product/image-list`,
  //         },
  //         {
  //           icon: 'simple-icon-picture',
  //           label: 'menu.details',
  //           to: `${adminRoot}/pages/product/details`,
  //         },
  //         {
  //           icon: 'simple-icon-book-open',
  //           label: 'menu.details-alt',
  //           to: `${adminRoot}/pages/product/details-alt`,
  //         },
  //       ],
  //     },
  //     {
  //       id: 'pages-profile',
  //       label: 'menu.profile',
  //       to: `${adminRoot}/pages/profile`,
  //       subs: [
  //         {
  //           icon: 'simple-icon-share',
  //           label: 'menu.social',
  //           to: `${adminRoot}/pages/profile/social`,
  //         },
  //         {
  //           icon: 'simple-icon-link',
  //           label: 'menu.portfolio',
  //           to: `${adminRoot}/pages/profile/portfolio`,
  //         },
  //       ],
  //     },
  //     {
  //       id: 'pages-blog',
  //       label: 'menu.blog',
  //       to: `${adminRoot}/pages/blog`,
  //       subs: [
  //         {
  //           icon: 'simple-icon-share',
  //           label: 'menu.blog-list',
  //           to: `${adminRoot}/pages/blog/blog-list`,
  //         },
  //         {
  //           icon: 'simple-icon-link',
  //           label: 'menu.blog-detail',
  //           to: `${adminRoot}/pages/blog/blog-detail`,
  //         },
  //       ],
  //     },
  //     {
  //       id: 'pages-miscellaneous',
  //       label: 'menu.miscellaneous',
  //       to: `${adminRoot}/pages/miscellaneous`,
  //       subs: [
  //         {
  //           icon: 'simple-icon-question',
  //           label: 'menu.faq',
  //           to: `${adminRoot}/pages/miscellaneous/faq`,
  //         },
  //         {
  //           icon: 'simple-icon-graduation',
  //           label: 'menu.knowledge-base',
  //           to: `${adminRoot}/pages/miscellaneous/knowledge-base`,
  //         },

  //         {
  //           icon: 'simple-icon-diamond',
  //           label: 'menu.prices',
  //           to: `${adminRoot}/pages/miscellaneous/prices`,
  //         },
  //         {
  //           icon: 'simple-icon-magnifier',
  //           label: 'menu.search',
  //           to: `${adminRoot}/pages/miscellaneous/search`,
  //         },
  //         {
  //           icon: 'simple-icon-envelope-open',
  //           label: 'menu.mailing',
  //           to: `${adminRoot}/pages/miscellaneous/mailing`,
  //         },
  //         {
  //           icon: 'simple-icon-bag',
  //           label: 'menu.invoice',
  //           to: `${adminRoot}/pages/miscellaneous/invoice`,
  //         },

  //         {
  //           icon: 'simple-icon-exclamation',
  //           label: 'menu.error',
  //           to: '/error',
  //           newWindow: true,
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   id: 'applications',
  //   icon: 'iconsminds-air-balloon-1',
  //   label: 'menu.applications',
  //   to: `${adminRoot}/applications`,
  //   subs: [
  //     {
  //       icon: 'simple-icon-check',
  //       label: 'menu.todo',
  //       to: `${adminRoot}/applications/todo`,
  //     },
  //     {
  //       icon: 'simple-icon-calculator',
  //       label: 'menu.survey',
  //       to: `${adminRoot}/applications/survey`,
  //     },
  //     {
  //       icon: 'simple-icon-bubbles',
  //       label: 'menu.chat',
  //       to: `${adminRoot}/applications/chat`,
  //     },
  //   ],
  // },
  // {
  //   id: 'ui',
  //   icon: 'iconsminds-pantone',
  //   label: 'menu.ui',
  //   to: `${adminRoot}/ui`,
  //   subs: [
  //     {
  //       id: 'ui-forms',
  //       label: 'menu.forms',
  //       to: `${adminRoot}/ui/forms`,
  //       subs: [
  //         {
  //           icon: 'simple-icon-notebook',
  //           label: 'menu.layouts',
  //           to: `${adminRoot}/ui/forms/layouts`,
  //         },
  //         {
  //           icon: 'simple-icon-puzzle',
  //           label: 'menu.components',
  //           to: `${adminRoot}/ui/forms/components`,
  //         },
  //         {
  //           icon: 'simple-icon-check',
  //           label: 'menu.validations',
  //           to: `${adminRoot}/ui/forms/validations`,
  //         },
  //         {
  //           icon: 'simple-icon-magic-wand',
  //           label: 'menu.wizard',
  //           to: `${adminRoot}/ui/forms/wizard`,
  //         },
  //       ],
  //     },
  //     {
  //       id: 'ui-components',
  //       label: 'menu.components',
  //       to: `${adminRoot}/ui/components`,
  //       subs: [
  //         {
  //           icon: 'simple-icon-bell',
  //           label: 'menu.alerts',
  //           to: `${adminRoot}/ui/components/alerts`,
  //         },
  //         {
  //           icon: 'simple-icon-badge',
  //           label: 'menu.badges',
  //           to: `${adminRoot}/ui/components/badges`,
  //         },
  //         {
  //           icon: 'simple-icon-control-play',
  //           label: 'menu.buttons',
  //           to: `${adminRoot}/ui/components/buttons`,
  //         },
  //         {
  //           icon: 'simple-icon-layers',
  //           label: 'menu.cards',
  //           to: `${adminRoot}/ui/components/cards`,
  //         },
  //         {
  //           icon: 'simple-icon-picture',
  //           label: 'menu.carousel',
  //           to: `${adminRoot}/ui/components/carousel`,
  //         },
  //         {
  //           icon: 'simple-icon-chart',
  //           label: 'menu.charts',
  //           to: `${adminRoot}/ui/components/charts`,
  //         },
  //         {
  //           icon: 'simple-icon-arrow-up',
  //           label: 'menu.collapse',
  //           to: `${adminRoot}/ui/components/collapse`,
  //         },
  //         {
  //           icon: 'simple-icon-arrow-down',
  //           label: 'menu.dropdowns',
  //           to: `${adminRoot}/ui/components/dropdowns`,
  //         },
  //         {
  //           icon: 'simple-icon-book-open',
  //           label: 'menu.editors',
  //           to: `${adminRoot}/ui/components/editors`,
  //         },

  //         {
  //           icon: 'simple-icon-star',
  //           label: 'menu.icons',
  //           to: `${adminRoot}/ui/components/icons`,
  //         },
  //         {
  //           icon: 'simple-icon-note',
  //           label: 'menu.input-groups',
  //           to: `${adminRoot}/ui/components/input-groups`,
  //         },
  //         {
  //           icon: 'simple-icon-screen-desktop',
  //           label: 'menu.jumbotron',
  //           to: `${adminRoot}/ui/components/jumbotron`,
  //         },
  //         {
  //           icon: 'simple-icon-map',
  //           label: 'menu.maps',
  //           to: `${adminRoot}/ui/components/maps`,
  //         },
  //         {
  //           icon: 'simple-icon-docs',
  //           label: 'menu.modal',
  //           to: `${adminRoot}/ui/components/modal`,
  //         },
  //         {
  //           icon: 'simple-icon-cursor',
  //           label: 'menu.navigation',
  //           to: `${adminRoot}/ui/components/navigation`,
  //         },
  //         {
  //           icon: 'simple-icon-pin',
  //           label: 'menu.popover-tooltip',
  //           to: `${adminRoot}/ui/components/popover-tooltip`,
  //         },
  //         {
  //           icon: 'simple-icon-shuffle',
  //           label: 'menu.sortable',
  //           to: `${adminRoot}/ui/components/sortable`,
  //         },
  //         {
  //           icon: 'simple-icon-grid',
  //           label: 'menu.tables',
  //           to: `${adminRoot}/ui/components/tables`,
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   id: 'menu',
  //   icon: 'iconsminds-three-arrow-fork',
  //   label: 'menu.menu',
  //   to: `${adminRoot}/menu`,
  //   subs: [
  //     {
  //       icon: 'simple-icon-logout',
  //       label: 'menu.types',
  //       to: `${adminRoot}/menu/types`,
  //     },
  //     {
  //       icon: 'simple-icon-layers',
  //       label: 'menu.levels',
  //       to: `${adminRoot}/menu/levels`,
  //       subs: [
  //         {
  //           icon: 'simple-icon-arrow-right',
  //           label: 'menu.third-level-1',
  //           to: `${adminRoot}/menu/levels/third-level-1`,
  //         },
  //         {
  //           icon: 'simple-icon-arrow-right',
  //           label: 'menu.third-level-2',
  //           to: `${adminRoot}/menu/levels/third-level-2`,
  //         },
  //         {
  //           icon: 'simple-icon-arrow-right',
  //           label: 'menu.third-level-3',
  //           to: `${adminRoot}/menu/levels/third-level-3`,
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   id: 'blankpage',
  //   icon: 'iconsminds-bucket',
  //   label: 'menu.blank-page',
  //   to: `${adminRoot}/blank-page`,
  // },
  // {
  //   id: 'docs',
  //   icon: 'iconsminds-library',
  //   label: 'menu.docs',
  //   to: 'https://gogo-react-docs.coloredstrategies.com/',
  //   newWindow: true,
  // },
];
export default data;
