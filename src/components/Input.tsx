import {useState} from "react";

const Input = ({onSelect, name}: any) => {

    const [state, setState] = useState<boolean>(false)

    const handleState = (e: any) => {
        onSelect(e.target.name)
        setState(prevState => !prevState);
    }

    console.log(state)
    return (
        <>
            <input onChange={handleState} checked={state} type="checkbox" name={name} id={name}/>
            <label htmlFor={name}>
                {name}
            </label>
        </>
    )
}

export default Input;