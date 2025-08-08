import { useRoutes } from 'react-router-dom';

import { routes } from './routing';
import { authRoutes } from './auth';

  
export function Router() {
    return useRoutes([
        ...routes,
        ...authRoutes
    ])
}