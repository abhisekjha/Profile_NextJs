'use client';

import Head from 'next/head';

export default function GitHubSignIn() {
  return (
    <div className="container">
      <Head>
        <title>Sign in to GitHub</title>
      </Head>

      <main className="main">
        <div className="logo">
          <svg height="32" viewBox="0 0 16 16" version="1.1" width="32" aria-hidden="true">
            <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.01.08-2.1 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.09.16 1.9.08 2.1.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.15.45.55.38C13.71 14.53 16 11.54 16 8c0-4.42-3.58-8-8-8z"></path>
          </svg>
        </div>

        <h1 className="title">Sign in to GitHub</h1>

        <form className="form">
          <div className="input-group">
            <label htmlFor="login_field">Username or email address</label>
            <input type="text" id="login_field" className="input" />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password <a href="#" className="forgot-password">Forgot password?</a></label>
            <input type="password" id="password" className="input" />
          </div>
          <button type="submit" className="sign-in-button">Sign in</button>
        </form>

        <div className="alternative-signin">
          <span>Or</span>
          <button className="sign-in-passkey">Sign in with a passkey</button>
        </div>

        <div className="create-account">
          <span>New to GitHub? <a href="#">Create an account</a></span>
        </div>
      </main>

      <footer className="footer">
        <div>
          <a href="#">Terms</a>
          <a href="#">Privacy</a>
          <a href="#">Docs</a>
          <a href="#">Contact GitHub Support</a>
          <a href="#">Manage cookies</a>
          <a href="#">Do not share my personal information</a>
        </div>
      </footer>

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 0 2rem;
          background-color: #0d1117;
          color: #c9d1d9;
          box-sizing: border-box;
          width: 100vw;
          overflow: hidden;
        }

        .main {
          max-width: 400px;
          width: 100%;
          padding: 1rem;
          border-radius: 6px;
          background-color: #161b22;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
          text-align: center;
        }

        .logo {
          margin-bottom: 1rem;
        }

        .title {
          margin: 0 0 1.5rem;
          font-size: 1.5rem;
          font-weight: 600;
        }

        .form {
          display: flex;
          flex-direction: column;
        }

        .input-group {
          margin-bottom: 1rem;
        }

        .input-group label {
          display: block;
          margin-bottom: 0.5rem;
        }

        .input {
          width: 100%;
          padding: 0.5rem;
          border-radius: 6px;
          border: 1px solid #30363d;
          background-color: #0d1117;
          color: #c9d1d9;
        }

        .forgot-password {
          float: right;
          color: #58a6ff;
        }

        .sign-in-button {
          padding: 0.75rem;
          border: none;
          border-radius: 6px;
          background-color: #238636;
          color: #ffffff;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
        }

        .alternative-signin {
          margin: 1rem 0;
        }

        .sign-in-passkey {
          padding: 0.75rem;
          border: none;
          border-radius: 6px;
          background-color: #21262d;
          color: #c9d1d9;
          font-size: 1rem;
          cursor: pointer;
        }

        .create-account {
          margin-top: 1rem;
        }

        .create-account a {
          color: #58a6ff;
        }

        .footer {
          margin-top: 2rem;
          text-align: center;
        }

        .footer a {
          margin: 0 0.5rem;
          color: #8b949e;
          text-decoration: none;
        }

        @media (min-width: 400px) {
          .main {
            border-radius: 0;
            box-shadow: none;
          }
        }

        @media (max-width: 400px) {
          .main {
            border-radius: 0;
            box-shadow: none;
          }
        }
      `}</style>
    </div>
  );
}
