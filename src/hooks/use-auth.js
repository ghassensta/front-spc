import { useMemo } from "react"
import { GetUser } from "src/api/data"

export const UseUser = () => {
    const memoizedUser = useMemo(() => {
        const user = GetUser();

        return {user};
    }, [user])
    return { user : memoizedUser }
}