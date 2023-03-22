import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import './globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // <ApolloProvider client={client}>
    <Provider store={store}>
      {/* @ts-ignore */}
      <Component {...pageProps} />
    </Provider>
    // </ApolloProvider>
  );
}

export default MyApp;
