import { createBrowserRouter } from 'react-router-dom'
import { ErrorPage, Home, ImageSearch, Layout, NotFound, SimilarSearch, TextSearch } from '../pages'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/image-search',
                element: <ImageSearch />,
            },
            {
                path: '/text-search',
                element: <TextSearch />
            },
            {
                path: '/folder-search',
                element: <SimilarSearch />
            },
            {
                path: '*',
                element: <NotFound />
            }
        ],
        errorElement: <ErrorPage />
    }
])

export default router