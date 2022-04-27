import React, {useState, useEffect} from 'react'
import { useAuthLoginMutation } from '../../redux-toolkit/services/authService';
import { setAdminToken } from '../../redux-toolkit/reducers/authReducer';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const AuthLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    const handleInput = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        });
    }

    const [login, response] = useAuthLoginMutation();
    console.log("response", response);

    const errors = response?.error?.data?.errors ? response?.error?.data?.errors : [];

    const adminLoginFunction = (e) => {
        e.preventDefault();
        login(loginData)
    }

    useEffect(() => {
        if(response.isSuccess){
            window.localStorage.setItem('admin-token', response?.data?.token);
            dispatch(setAdminToken(response?.data?.token));
            navigate('/dashboard/products');
        }
    },[response.isSuccess]);

    const {email, password} = loginData;
    return (
        <>
            <div className="bg-black1 h-screen flex justify-center items-center">
                <form className="bg-black2 p-5 w-10/12 sm:w-8/12 md:w-6/12 lg:w-3/12 rounded" onSubmit={adminLoginFunction}>
                    <h3 className="mb-4 text-white capitalize font-semibold text-lg">dashboard login</h3>
                    {
                        errors.length > 0 && errors.map((error, key) => (
                            <div key={key}>
                                <p className="alert-success">{error.msg}</p>
                            </div>
                        ))
                    }
                    <div className="mb-4 mt-4">
                        <input 
                            type="email" 
                            name="email" 
                            value={email}
                            onChange={handleInput}
                            className="w-full bg-black1 p-4 rounded outline-none text-white" 
                            placeholder="Enter email..." 
                        />
                    </div>
                    <div className="mb-4">
                        <input 
                            type="password" 
                            name="password" 
                            value={password}
                            onChange={handleInput}
                            className="w-full bg-black1 p-4 rounded outline-none text-white" 
                            placeholder="Enter password..." 
                        />
                    </div>
                    <div className="mb-4">
                        <input type="submit" value={response.isLoading ? 'Loading...' : 'Sign In'} className="bg-indigo-600 w-full p-4 rounded text-white uppercase font-semibold cursor-pointer" />
                    </div>
                </form>
            </div>
        </>
    )
}

export default AuthLogin





///auth/auth-login
