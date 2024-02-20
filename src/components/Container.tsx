import React, {useCallback, useState} from 'react'
import ListContent from "./ListContent";
import Login from './Login'

export interface User {
    email: string,
    password: string;
}

export interface SchoolList {
    modiim: GradeList
    ofraHaza: GradeList
    kfir: GradeList
    habaalShemTov: GradeList
    haGalil: GradeList
}

export interface GradeList {
    title: string
    fourth: Array<string>,
    fifth: Array<string>,
    sixth: Array<string>
}

const Container = () => {

    const [data, setData] = useState<SchoolList>({} as unknown as SchoolList);

    const handleData = useCallback((data: any) => {
        setData(data)
    }, [])

    return (
        <>
            {
                !!Object.keys(data).length ?
                    <ListContent data={data}/> :
                    <Login onLogin={handleData}/>
            }
        </>
    )
}

export default Container