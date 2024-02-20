import {GradeList} from "./Container";
import {useCallback, useState} from "react";
import GradeListComponent from "./GradeListComponent"

const ListContent = ({data}: any) => {

    const [school, setSchool] = useState<GradeList>(undefined as unknown as GradeList)
    const [arrived, setArrived] = useState<string[]>([]);
    const handleSchoolPick = (e: any) => {
        e.preventDefault();
        setSchool(data[e.target.name])

    }
    const handleSelect = useCallback((name: string) => {
        setArrived((preArrived: string[]): string[] => {
            const exist: string | undefined = preArrived.find(n => n === name)
            if (!exist)
                return [...preArrived, name]
            return preArrived.filter(n => n !== name);
        })
    }, [])

    const handleSubmit = () => {
        console.log(arrived)
    }

    return (
        <div className="container">
            {school ?
                <div className="checkbox-list">
                    <h5>
                        <button onClick={handleSchoolPick} name={null as unknown as string}>RETURN</button>
                    </h5>
                    <h2>{school.title}</h2>
                    <div className="">
                        <GradeListComponent grade={'שכבה ד'} onSelect={handleSelect} data={school.fourth}/>
                    </div>
                    <div className="">
                        <GradeListComponent grade={'שכבה ה'} onSelect={handleSelect} data={school.fifth}/>
                    </div>
                    <div className="">
                        <GradeListComponent grade={'שכבה ו'} onSelect={handleSelect} data={school.sixth}/>
                    </div>
                    <button onClick={handleSubmit}>SUBMIT</button>
                </div>
                :
                <ol style={{direction: 'rtl'}}>
                    <h3>{'בחר בית ספר'}</h3>
                    {Object.keys(data).map(((key) =>
                            <div key={Math.random()}>
                                <button onClick={handleSchoolPick} name={key}>{data[key].title}</button>
                            </div>
                    ))}
                </ol>
            }

        </div>
    )
}

export default ListContent