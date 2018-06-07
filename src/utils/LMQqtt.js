// import storage from '@/store/stroage'
const LMqtt = {
  client: null,
  cfg: {
    host: '39.107.114.100',
    port: 8083,
    username: 'youxuepai',
    password: "822scmxQjHW0PuAz",
    client_id: "c_"
  },
  onConnect () {
    if (this.client) {
      return false
    }
    // client_id随机生成
    for (let i = 0; i < 13; i++) {
      let num = Math.floor(Math.random() * 9 + 1);
      this.cfg.client_id += num;
    }
    console.log(this.cfg.client_id, 'client_id')
    this.client = new Paho.MQTT.Client(this.cfg.host, this.cfg.port, this.cfg.client_id);
    this.client.onConnectionLost = this.onConnectionLost;
    this.client.onMessageArrived = this.onMessageArrived;
  },
  onConnectionLost (response) {
    console.log(response)
    if (response.errorCode !== 0) {
      console.log(response.errorMessage)
      setTimeout(() => {
        this.connect()
      }, 3000);
    }
    console.log('连接断开');
  },
  onMessageArrived (message) {
    let type = JSON.parse(message.payloadString).type
    console.log(type)
    if (type) {
      window.bus.$store.commit('notice/setMsg', true);
      // 学校消息
      if (type === 203) {
        window.bus.$store.commit('notice/setSchoolMsg', true)
      } else if (type === 201) {
        // 作业消息
        window.bus.$store.commit('notice/setHomeworkMsg', true)
      }
    }
    console.log('收到消息')
  },
  connect(succ) {
    this.onConnect();
    let me = this
    var options = {
      userName: this.cfg.username,
      password: this.cfg.password,
      cleanSession: true,
      keepAliveInterval: 10,
      onSuccess: function(e) {
        console.log('连接成功')
        let userinfo = JSON.parse(localStorage.userinfo);
        // 个人
        me.client.subscribe(`user_${userinfo.userid}`);
        // 班级
        let classes = userinfo.classes;
        for (let i = 0; i < classes.length; i++) {
          me.client.subscribe(`class_${classes[i].class_id}`);
        }
        // 学校
        me.client.subscribe(`school_${userinfo.school_id}`);
        // storage['session'].set('mqttConnect', true)
      },
      onFailure: function(e) {
        console.log('连接失败')
        console.log(e)
        setTimeout(() => {
          this.connect();
        })
      }
    };
    this.client.connect(options);
  }
}
export default LMqtt
