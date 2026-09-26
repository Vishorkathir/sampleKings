import ThemeContextProvider from '../config/ThemeContext';
import ErrorBoundary from '../Components/Common/ErrorBoundary';
import '../index.css';
import '../globals.css';

export const metadata = {
  title: 'Cricket Academy · Kings11',
  description: 'Cricket Academy — Thuraiyur’s elite cricket programme.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeContextProvider>
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </ThemeContextProvider>
      </body>
    </html>
  );
}