<template>
  <section>
    <header-bar
      @back="$router.go(-1)">
      <p slot="title-name">1/3</p>
      <p slot="right-area">保存</p>
    </header-bar>
    <main>
      <p>{{hint}}</p>
    </main>
    <footer></footer>
  </section>
</template>

<script>
import headerBar from '@/components/headerBar.vue'
// import './action'
export default {
  name: "CheckDetai",
  data() {
    return {
      answer: (() => {
        let storage = sessionStorage.getItem('studentData');
        if (storage && storage !== 'undefined') {
          return JSON.parse(storage)
        }
        return {}
      })(),
      hint: '原始'
    }
  },
  components: {headerBar},
  mounted() {
    let answer = this.$route.params.studentAnswerDetailData;
    appPlug.studentWork([
      JSON.stringify({
        "Info": {
          "course_hour_publish_id": answer["course_hour_publish_id"],
          "course_resource_id": answer["course_resource_id"],
          "dcom_entity_id": answer["dcom_entity_id"],
          "qti_question_id": answer["resource_id"],
          "studentid": "33517",
          "teacher_id": "32731"
        },
        "ImgInfo": [
          {
            "position": -1,
            "mixUrl": "",
            "text": "你是中国人我的你是老师啊nisahdiah oasj da d;a asd asd ad a das das dsa da da das",
            "baserUrl": ""
          },
          {
            "position": 0,
            "text": "",
            "mixUrl": "http://u.dev.anoah.com/uploads/dcom/qti/ca6a8fd2-0f45-2cfd-b78d-6d3eb35e16d7.png",
            "baserUrl": "http://u.dev.anoah.com/uploads/dcom/qti/116ef139-19c7-6143-50f0-f2d6940c5408.png"
          },
          {
            "position": 1,
            "text": "",
            "mixUrl": "http://u.dev.anoah.com/uploads/dcom/qti/cff338ab-6bd7-1568-b611-10669ad78dfb.png",
            "baserUrl": "http://e.dev.anoah.com/uploads/image/42/42051e22ece9c1249055c38400336143.jpg"
          },
          {
            "position": 2,
            "text": "",
            "mixUrl": "http://u.dev.anoah.com/uploads/dcom/qti/f62ebbe5-91d0-a749-a9fc-bfc7937b4b72.png",
            "baserUrl": "http://e.dev.anoah.com/uploads/image/87/87c52394464af4ba284f91b62b86447a.jpg"
          }
        ]
      }),
      'http://e.anoah.com',
      10,
      1
    ], function (res) {
      this.hint = res;
      // console.log(res);
    }, function (err) {
      // console.log(err);
      this.hint = err;
    });
    sessionStorage.setItem('studentData', JSON.stringify(this.$route.params.studentAnswerDetailData));
  }
}
</script>

<style lang="scss">

  .clear-fix {
    &:before, &:after {
      content: '';
      display: table;
    }
    &:after {
      clear: both;
    }
  }

  .fl {
    float: left;
  }

  .fr {
    float: right;
  }
</style>

<style lang="scss" scoped>

</style>
