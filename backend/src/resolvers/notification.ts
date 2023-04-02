import { Resolver, Mutation, Arg } from "type-graphql";

import { SubscriptionDetail } from "../entities/SubscriptionDetail";
import { sendNotification } from "../utils/sendNotification";

@Resolver(SubscriptionDetail)
export class SubscriptionResolver {
  @Mutation(() => Boolean)
  async subscribe(
    @Arg("endpoint") endpoint: string,
    @Arg("auth") auth: string,
    @Arg("p256dh") p256dh: string
    // @Ctx() { req }: MyContext
  ): Promise<boolean> {
    try {
      // User.create({}).save()
      await SubscriptionDetail.create({
        endpoint: endpoint,
        auth: auth,
        p256dh: p256dh,
      }).save();
      return true;
    } catch (err) {
      console.log(err);
    }
    return false;
  }

  async sendNotification(
    @Arg("endpoint") endpoint: string,
    @Arg("auth") auth: string,
    @Arg("p256dh") p256dh: string,
    @Arg("message") message: string
  ) {
    const subscription = {
      endpoint: endpoint,
      expirationTime: null,
      keys: {
        auth: auth,
        p256dh: p256dh,
      },
    };
    const payload = JSON.stringify({ title: message });
    await sendNotification(subscription, payload);
  }
}
