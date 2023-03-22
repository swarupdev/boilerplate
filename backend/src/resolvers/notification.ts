import { Resolver, Mutation, Arg } from 'type-graphql';

import { SubscriptionDetail } from '../entities/SubscriptionDetail';

@Resolver(SubscriptionDetail)
export class SubscriptionResolver {
  @Mutation(() => Boolean)
  async subscribe(
    @Arg('options') options: SubscriptionDetail
    // @Ctx() { req }: MyContext
  ): Promise<boolean> {
    try {
      // User.create({}).save()
      await SubscriptionDetail.create({
        endpoint: options.endpoint,
        auth: options.auth,
        p256dh: options.p256dh,
      }).save();
      return true;
    } catch (err) {
      console.log(err);
    }
    return false;
  }
}
