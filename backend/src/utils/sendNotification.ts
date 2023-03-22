import push from 'web-push';

export const sendNotification = async (subscription: any, message: any) => {
  const payload = message;
  const options = {
    gcmAPIKey: process.env.GCM_API_KEY,
    TTL: 60,
  };

  push.setVapidDetails(
    'mailto:' + process.env.VAPID_MAIL_TO,
    process.env.VAPID_PUBLIC_KEY as string,
    process.env.VAPID_PRIVATE_KEY
  );
  return push.sendNotification(subscription, payload, options);
};
