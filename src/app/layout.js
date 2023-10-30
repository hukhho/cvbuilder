// import Footer from './components/Footer/Footer';
// import UserHeader from './components/Header/UserHeader';
import StyledComponentsRegistry from '../lib/AntdRegistry';
import './styles/globals.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css'; // Import the CSS

// Prevent fontawesome from dynamically adding its CSS
config.autoAddCss = false;

export const metadata = {
  title: 'Project',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="pro-ui">
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
