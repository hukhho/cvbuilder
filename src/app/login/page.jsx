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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              id="logo-dark-text_svg__Layer_1"
              data-name="Layer 1"
              viewBox="0 0 214.6 90.9"
              className="rezi-logo logo"
            >
              <defs>
                <style
                  dangerouslySetInnerHTML={{
                    __html: '.logo-dark-text_svg__cls-1{fill:#3b3b3b}',
                  }}
                />
              </defs>
              <path
                d="M68.5 88.9H41.8L21.6 57.2h-.2v31.7H0V6.4h32c16.3 0 28.7 7.8 28.7 25.4 0 11.4-6.3 21.2-18.1 23.3ZM21.3 43.4h2.1c7 0 14.9-1.3 14.9-10.3s-7.9-10.3-14.9-10.3h-2.1ZM128.8 64.2H86.9c0 8.1 4.3 12.5 12.5 12.5 4.3 0 7.3-1.4 9.5-5.1H128c-3.2 13.2-15.8 19.3-28.5 19.3C80.9 90.9 67 80.4 67 61c0-18.7 12.8-30 31.1-30 19.5 0 30.7 12 30.7 31.2v2Zm-18.5-11.5A11.21 11.21 0 0 0 99 43.8c-5.8 0-10.6 3.1-11.8 8.9ZM186.3 72.4v16.5h-56.9l26.4-39.6h-22.9V32.8h56l-26.3 39.6ZM214.6 11.2A11.2 11.2 0 1 1 203.4 0a11.25 11.25 0 0 1 11.2 11.2Zm-1.2 77.7h-19.9V32.8h19.9Z"
                className="logo-dark-text_svg__cls-1"
              />
            </svg>
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
                  <LoginButton />
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
