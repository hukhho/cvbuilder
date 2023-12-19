'use client';

import Link from 'next/link';
import Image from 'next/image';
import '../styles/login.module.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { LoginButton } from '../components/Button/LoginButton';
import './login.css';
import '@/app/styles/card.css';

const Login = () => {
  return (
    <div className="column-wrapper">
      <main className="content">
        <div>
          <a className="flex absolute logoWrapper" href="/" aria-label="Logo">
            {/* <Image src="/images/CVbuilder-05.png" width={100} height={80} /> */}
          </a>
          <div className="auth-box" style={{ marginTop: '100px' }}>
            <div className="form card">
              <div className="">
                <h1 className="heading">Continue with</h1>
                <div className="social mt-8">
                  {/* <button
                  href=""
                  data-size="default"
                  data-theme="secondary"
                  data-busy="false"
                  className="mr-3 src-components-AuthForm--ZJCXla9nmw4= src-components-Button--kYf2WsZ80yU= "
                >
                  <svg
                    xmlns="https://www.w3.org/2000/svg"
                    viewBox="0 0 266.893 266.895"
                    className="src-components-AuthForm--6Jz8mKqOaJg="
                  >
                    <path
                      fill="#3c5a99"
                      d="M248.082 262.307c7.854 0 14.223-6.369 14.223-14.225V18.812c0-7.857-6.368-14.224-14.223-14.224H18.812c-7.857 0-14.224 6.367-14.224 14.224v229.27c0 7.855 6.366 14.225 14.224 14.225z"
                    />
                    <path
                      fill="#fff"
                      d="M182.409 262.307v-99.803h33.499l5.016-38.895h-38.515V98.777c0-11.261 3.127-18.935 19.275-18.935l20.596-.009V45.045c-3.562-.474-15.788-1.533-30.012-1.533-29.695 0-50.025 18.126-50.025 51.413v28.684h-33.585v38.895h33.585v99.803z"
                    />
                  </svg>{' '}
                  Facebook
                </button> */}
                  <LoginButton roles={['HR']} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div />
      </main>
    </div>
  );
};

export default Login;
