
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
    if (response.errorCode !== 0) {
      console.log(response.errorMessage)
    }
    console.log('连接断开')
  },
  onMessageArrived (message) {
    console.log(message)
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
        console.log(1)
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
      },
      onFailure: function(e) {
        console.log(e)
        this.onConnect();
        this.client.connect(options);
      }
    };
    console.log(this);
    this.client.connect(options);
  }
}
export default LMqtt