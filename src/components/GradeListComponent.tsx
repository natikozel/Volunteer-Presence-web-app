import Input from "./Input";
import React, {memo} from 'react';

const GradeListComponent = memo(function GradeListComponent({data, onSelect, grade}: any) {
    return (
        <>
            <ul>
                <h4>{grade}</h4>
                {data.map((name: any, index: number) =>
                    <li key={Math.random()}>
                        <Input onSelect={onSelect} name={name}/>
                    </li>)
                }
            </ul>
        </>)
})
export default GradeListComponent;