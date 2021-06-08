import Vue from "vue";
import Router from "vue-router";
import { storage } from "@utils/storage";
import { routes } from './routes';

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// 修复 router double-push promise error 
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

const LOGIN_TOKEN = 'xx-token'

router.beforeEach(async (to, from, next) => {
  let token = storage.getItem(LOGIN_TOKEN);
  if (to.matched.some((record) => record.meta.auth)) {
    if (token) return next();
    else return next("/login");
  }
  if (to.matched.some((record) => record.meta.user)) {
    if (token) return next("/overview");
  }
  next();
});

export default router;
