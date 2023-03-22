import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from './page.module.css';
import Head from 'next/head';
import {
  giveNoification,
  subscibeToPushNotification,
} from '../utils/notifications';

const inter = Inter({ subsets: ['latin'] });

export default function Test() {
  return (
    <main className="">
      <Head>
        <title>Boilerplate</title>
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <div className="text-center bg-black h-screen flex items-center justify-center">
        <div className="my-auto">
          <h1 className="text-center text-2xl text-white">
            Welcome to Boilerplate
          </h1>
          <div className="flex flex-col justify-center">
            <button
              onClick={() => {
                giveNoification(
                  'Test Notification',
                  'This is a test notification'
                );
              }}
              className="bg-gray-300 block text-black text-lg p-2 rounded-md mt-4"
            >
              Test Notification
            </button>
            <button
              onClick={() => {
                subscibeToPushNotification();
              }}
              className="bg-gray-300 block text-black text-lg p-2 rounded-md mt-4 "
            >
              Subscribe to Push Notifications
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
