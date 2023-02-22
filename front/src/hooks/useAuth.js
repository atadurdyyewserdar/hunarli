import { useSelector } from 'react-redux'

export function useAuth() {
    const { isAuth, status, error } = useSelector((state) => state.auth)

    return {
        isAuth,
        status,
        error
    }
}