export const paths = {
    main: '/',
    spa:{
        root: '/spa',
        details: (id)=>`/spa/${id}`
    },
    checkout: '/checkout',
    payment: '/payment',
    checkoutDetails: '/checkout/details',
    dashboard: {
        root: '/dashboard',
        commandes: {
            root: '/dashboard/commandes',
            view: (id) => `/dashboard/commandes/${id}/view`
        },
        details: '/dashboard/details',
    },
    auth: {
        root: '/auth'
    }
}