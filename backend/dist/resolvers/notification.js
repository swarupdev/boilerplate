"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionResolver = void 0;
const type_graphql_1 = require("type-graphql");
const SubscriptionDetail_1 = require("../entities/SubscriptionDetail");
const sendNotification_1 = require("../utils/sendNotification");
let SubscriptionResolver = class SubscriptionResolver {
    async subscribe(endpoint, auth, p256dh) {
        try {
            await SubscriptionDetail_1.SubscriptionDetail.create({
                endpoint: endpoint,
                auth: auth,
                p256dh: p256dh,
            }).save();
            return true;
        }
        catch (err) {
            console.log(err);
        }
        return false;
    }
    async sendNotification(endpoint, auth, p256dh, message) {
        const subscription = {
            endpoint: endpoint,
            expirationTime: null,
            keys: {
                auth: auth,
                p256dh: p256dh,
            },
        };
        const payload = JSON.stringify({ title: message });
        await (0, sendNotification_1.sendNotification)(subscription, payload);
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("endpoint")),
    __param(1, (0, type_graphql_1.Arg)("auth")),
    __param(2, (0, type_graphql_1.Arg)("p256dh")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], SubscriptionResolver.prototype, "subscribe", null);
__decorate([
    __param(0, (0, type_graphql_1.Arg)("endpoint")),
    __param(1, (0, type_graphql_1.Arg)("auth")),
    __param(2, (0, type_graphql_1.Arg)("p256dh")),
    __param(3, (0, type_graphql_1.Arg)("message")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], SubscriptionResolver.prototype, "sendNotification", null);
SubscriptionResolver = __decorate([
    (0, type_graphql_1.Resolver)(SubscriptionDetail_1.SubscriptionDetail)
], SubscriptionResolver);
exports.SubscriptionResolver = SubscriptionResolver;
//# sourceMappingURL=notification.js.map