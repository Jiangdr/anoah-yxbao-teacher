const LMqtt = {
  client: null,
  cfg: {
    host: 'emqtt.anoah.com',
    port: 8083,
    username: 'youxuepai',
    password: "822scmxQjHW0PuAz",
    client_id: "phpMQTT-subscriber2"
  },
  onConnect: () => {
    this.client = new Paho.MQTT.Client(this.cfg.host, this.cfg.port, this.host.client_id);
    this.client.onConnectionLost = this.onConnectionLost;
    this.client.onMessageArrived = this.onMessageArrived;
  },
  onConnectionLost: (response) => {
    if (response.errorCode !== 0) {
      console.log(response.errorMessage)
    }
    console.log('连接断开')
  },
  onMessageArrived: (message) => {
    console.log(message)
    console.log('收到消息')
  },
  connect: (succ) => {
    var options = {
      // userName: this.cfg.username,
      // password: this.cfg.password,
      cleanSession: true,
      keepAliveInterval: 10,
      onSuccess: function(e) {
        console.log(1)
      },
      onFailure: function(e) {
        console.log(e)
      }
    };
    this.client.connect();
  }
}
