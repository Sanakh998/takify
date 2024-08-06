import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({ mode: 'onChange' });
  const { login, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const { email, password } = data;
    login(email, password);
    navigate('/');
  };

  return (
    <div className='flex justify-center my-40'>
      <div className='bg-white overflow-hidden shadow rounded-lg border sm:m-4 m-2 text-sm md:text-lg container max-w-screen-sm '>
        <div className="px-4 py-5 sm:px-6 text-center bg-emerald-600 text-slate-100 font-bold">
          <h3 className="text-lg">
            Login
          </h3>
        </div>
        <form className='flex flex-col w-full px-12 sm:px-2 my-6 gap-6 items-center' onSubmit={handleSubmit(onSubmit)}>
          <div className='w-full sm:w-2/3'>
            <input
              className='p-2 border sm:border-2 border-slate-600 w-full rounded focus:outline-emerald-600 focus:text-gray-700'
              placeholder='Enter Email'
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Entered value does not match email format'
                }
              })}
            />
            {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
          </div>

          <div className='w-full sm:w-2/3'>
            <input
              className='p-2 border sm:border-2 border-slate-600 w-full rounded focus:outline-emerald-600 text-gray-400 focus:text-gray-700'
              placeholder='Enter Password'
              type="password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must have at least 6 characters'
                }
              })}
            />
            {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
          </div>

          <button
            className='p-2 px-8 text-lg text-white rounded bg-sky-600 outline-none focus:outline-none active:outline-none hover:outline hover:outline-gray-600 active:bg-sky-500 disabled:bg-sky-400 disabled:text-gray-200 disabled:outline-none'
            type='submit'
            disabled={!isValid}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
