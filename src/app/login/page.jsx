'use client';

import Link from 'next/link';
import Image from 'next/image';
import '../styles/login.module.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons';
import './login.css';
import '@/app/styles/card.css';
import { LoginButton } from '../components/Button/LoginButton';

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
                <h1 className="heading">Continue with CANDIDATE </h1>
                <div className="social mt-8">
                  <LoginButton roleName="CANDIDATE" />
                </div>
                <h1 className="heading">Continue with HR</h1>
                <div className="social mt-8">
                  <LoginButton roleName="HR" />
                </div>
                <h1 className="heading">Continue with EXPERT</h1>
                <div className="social mt-8">
                  <LoginButton roleName="EXPERT" />
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
