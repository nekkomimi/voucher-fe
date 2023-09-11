import { AuthStore } from "./auth";
import {UIStore} from "./ui";

export const store = {
  ui: new UIStore(),
  auth: new AuthStore()
};
