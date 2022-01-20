/* eslint-disable class-methods-use-this */
import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from "typeorm";
import { generateHash } from "../../common";
import { User } from "./user.model";

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  listenTo() {
    return User;
  }

  async beforeInsert(evt: InsertEvent<User>) {
    const cryptPassword = await generateHash(evt.entity.password);
    // eslint-disable-next-line no-param-reassign
    evt.entity.password = cryptPassword;
  }
}
