import React, {useState} from 'react'
import getUserToken from "../http";

const LOGIN_URL: string = 'http://localhost:4000/login'

export interface User {
    name: string,
}

const Login = ({onLogin}: any) => {

    const [state, setState]
        : [User, React.Dispatch<React.SetStateAction<User>>]
        = useState<User>({
        name: '',
    })

    const [error, setError] = useState<any>('');


    const handleInput = (e: any) => {
        setState(prevState => {
            return {
                ...prevState,
                [e.target.name]: e.target.value,
            }
        })
    }
    const fetchUser = async (e: any) => {
        e.preventDefault()
        const token = await getUserToken('POST', LOGIN_URL, state);
        if (token.err) {
            setError("משתמש לא נמצא, נסה שנית");
            setState(prevState => {
                return {
                    ...prevState,
                    name: ''
                }
            })
            return
        }
        onLogin(token.session.authenticated ? token.data : undefined)
    }

    return (
        <div className="login h-96 flex flex-wrap content-center">
            <form>
                <div className="form-field">
                    <input name="name" value={state.name} onChange={handleInput} type="text" placeholder="שם מלא" required/>
                </div>
                {!!error? <p className={"w-full p-5 font-medium text-right rounded-md border-slate-300 text-red-600 placeholder:opacity-60 self-end"}>{error}</p> : null}
                {/*<div className="form-field">*/}
                {/*    <input name="password" onChange={handleInput} type="password" placeholder="Password" required/>*/}
                {/*</div>*/}

                <div className="form-field">
                    <button onClick={fetchUser} className="btn" type="submit">היכנס למערכת</button>
                </div>
            </form>
        </div>
    )
}

export default Login