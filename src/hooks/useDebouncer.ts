import { useEffect, useState } from "react"

interface IDebouncer <T extends any[]> {
    (...args: T): void
}

const useDebouncer = <T extends any[]> (callback: IDebouncer<T>, delay: number): IDebouncer<T> => {
    const [debouncer, setDebouncer] = useState<IDebouncer<T>>(callback)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncer(() => callback)
        }, delay)

        return () => clearTimeout(timeout)
    }, [callback, delay])

    return debouncer
}

export default useDebouncer