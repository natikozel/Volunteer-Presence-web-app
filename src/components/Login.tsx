import React, {useState} from 'react'
import getUserToken from "../http";

const LOGIN_URL: string = 'http://localhost:4000/login'

export interface User {
    email: string,
    password: string;
}

const Login = ({onLogin}: any) => {

    const [state, setState]
        : [User, React.Dispatch<React.SetStateAction<User>>]
        = useState<User>({
        email: '',
        password: ''
    })


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
        onLogin(token.session.authenticated ? token.data : undefined)
    }

    return (
        <div className="login">
            <form>
                <div className="form-field">
                    <input name="email" onChange={handleInput} type="email" placeholder="Email / Username" required/>
                </div>

                <div className="form-field">
                    <input name="password" onChange={handleInput} type="password" placeholder="Password" required/>
                </div>

                <div className="form-field">
                    <button onClick={fetchUser} className="btn" type="submit">Log in</button>
                </div>
            </form>
        </div>
    )
}

export default Login