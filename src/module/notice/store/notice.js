import storage from "@/store/stroage";
import homeApi from "@/module/home/axios/home";

export default {
  namespaced: true,
  state: {
    newMsg: false,
    newHomeworkMsg: false,
    newSchoolMsg: false
  },
  mutations: {
    setMsg(state, val) {
      state.newMsg = val
    },
    setHomeworkMsg(state, val) {
      state.newHomeworkMsg = val
    },
    setSchoolMsg(state, val) {
      state.newSchoolMsg = val
    },
    connectMqtt(state) {
      if (!window.bus.mqtt.client || !window.bus.mqtt.client.isConnected()) {
        window.bus.mqtt.connect();
        homeApi.getMsg({ user_id: storage['persistent'].get('userinfo').userid }).then(r => {
          if (r.notice > 0 || r.homework > 0) {
            state.newMsg = true;
            if (r.notice > 0) {
              // this.$store.commit("notice/setSchoolMsg", true);
              state.newSchoolMsg = true;
            }
            if (r.homework > 0) {
              // this.$store.commit("notice/setHomeworkMsg", true);
              state.newHomeworkMsg = true;
            }
          }
        });
      }
    }
  },
  actions: {

  }

}
