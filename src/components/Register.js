import React from 'react'

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            registerEmail: '',
            registerPassword: ''
        }
    }

    onEmailChange = (event) => {
        this.setState({registerEmail: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({registerPassword: event.target.value})
    }

    onSubmitRegister = () => {
        console.log(this.state)
        fetch('http://localhost:4000/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.registerEmail,
                password: this.state.registerPassword
            })
        })
        .then(response => response.json())
        .then(user => {
            if (user.id) {
                this.props.loadUser(user)
                this.props.onRouteChange('home')
            }
        })
    }

    render() {
        return ( 
            <article className="flex min-h-full items-left justify-left py-12 px-0 sm:px-0 lg:px-0">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <h2 className="mt-6 text-left text-3xl font-bold tracking-tight text-gray-900">Register an Account</h2>
                    </div>
                    
                    <div className="mt-8 space-y-6" action="#" method="POST">
                        <input type="hidden" name="remember" value="true"/>
                        <div className="-space-y-px rounded-md shadow-sm">
                            <div>
                                <label htmlFor="email-address" className="sr-only">Email address</label>
                                <input  id="email-address" name="email" type="email" 
                                    onChange={this.onEmailChange}
                                    autoComplete="email" required 
                                    className="text-purple-dark bg-pwhite relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Email address"/>
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">Password</label>
                                <input  id="password" name="password" type="password" 
                                    onChange={this.onPasswordChange}
                                    autoComplete="current-password" required 
                                    className="text-purple-dark bg-pwhite relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Password"/>
                            </div>
                        </div>

                        <div className='flex gap-8 items-center'>
                            <button type="submit" className="group relative flex w-full justify-center rounded-md bg-pred py-2 px-4 text-sm font-medium" onClick={this.onSubmitRegister}>
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                                    </svg>
                                </span>
                                Register
                            </button>
                            <div className="text-sm hover:underline hover:decoration-2">
                                <p className="font-medium text-pred hover:text-indigo-500 cursor-pointer" onClick={() => this.props.onRouteChange('signin')}>Back</p>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        );
    }
}
 
export default Register;