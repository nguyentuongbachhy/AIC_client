import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
    const error = useRouteError()

    return (
        <div className="flex justify-center items-center h-screen bg-gray-200">
            <div className='text-center'>
                <h1 className='text-4xl font-medium'>Oops</h1>
                <p>Sorry, an unexpected error has occurred.</p>
                <p>
                    <i>{error?.statusText || error?.message}</i>
                </p>
            </div>
        </div>
    )
}

export default ErrorPage
