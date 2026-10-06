import ThemeContextProvider from '../config/ThemeContext';
import ErrorBoundary from '../Components/Common/ErrorBoundary';
import '../index.css';
import '../globals.css';

// oxlint-disable-next-line react(only-export-components)
export const metadata = {
  title: 'Cricket Academy · Kings11',
  description: 'Cricket Academy — Thuraiyur’s elite cricket programme.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body id="root" suppressHydrationWarning>
        <ThemeContextProvider>
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </ThemeContextProvider>
      </body>
    </html>
  );
}