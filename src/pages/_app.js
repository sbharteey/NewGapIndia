// src/pages/_app.js
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import '../styles/globals.css';
import toast, { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <ReactQueryDevtools />
      <Toaster />
    </QueryClientProvider>
  );
}

export default MyApp;
