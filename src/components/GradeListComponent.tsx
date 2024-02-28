import React, {memo} from 'react';
import {Checkbox} from "./ui/checkbox";
import {Label} from "./ui/label";

const GradeListComponent = memo(function GradeListComponent({data, onSelect}: any) {
    return (
        <>
            <ul>
                {data.map((name: any, index: number) =>
                    <li className="flex" key={Math.random()}>
                            <Checkbox className={"flex"} onClick={() => onSelect(name)} id="terms"/>
                            <br/>
                            <Label
                                htmlFor="terms"
                                style={{marginRight: "10px"}} className="font-bold flex text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >{name}
                            </Label>
                    </li>)
                }
            </ul>
        </>);
});
export default GradeListComponent;