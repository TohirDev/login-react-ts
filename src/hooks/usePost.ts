import { useState } from "react"

type TPost = {
    url: string,
    options: {
        method: string
        body: BodyInit | null |undefined
    }
}

export const usePost = async (bodyData: TPost) => {
    const [data, setData] = useState()

    try {
    const response = await fetch(bodyData.url, {
        ...bodyData.options,
    })
    const result = await response.json()
    if(result) {
        setData(result)
    }
    } catch(err) {
        console.log(err)
    }

    return {data}
}
