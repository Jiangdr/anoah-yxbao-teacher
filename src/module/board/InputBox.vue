<template>

  <div
    v-if="num==-1"
    class="iminputdiv math-icon"
    :class="{custom: custom}"
    v-on:click.stop="addcursor($event,-1,-1,-1,-1)">

    <div
      v-for="(value,key) in inputarray"
      :key="key"
      class="row"
      v-on:click.stop="addcursor($event,key,-1,-1,-1)"
      v-bind:class="{'red':is_correct?is_correct[key]=='0':0,'green':is_correct?is_correct[key]=='1':0}">
      <template v-for="(value1,key1) in value">
        <span v-if="value1.name=='cursor'" :key="key1" class="k-board cursor"></span>
        <span
          v-else-if="value1.name=='fraction'||value1.name=='sqrt2'||value1.name=='sqrt3'||value1.name=='aimsup'||value1.name=='aimsub'"
          :key="key1"
          v-bind:class="[value1.name,{'click':is_cursor(value1.value)==1}]"
          v-on:click.stop="addcursor($event,key,key1,-1,-1)">

          <span
            class="enterdiv up"
            v-on:click.stop="addcursor($event,key,key1,-1,'up')">
            <span
              v-for="(value2,key2) in value1.value.up"
              :key="key2"
              :class="value2.name"
              v-on:click.stop="addcursor($event,key,key1,key2,'up')">{{(value2.view || value2.value) | CharCodeIcon}}</span>
          </span>
          <span
            class="enterdiv down"
            v-on:click.stop="addcursor($event,key,key1,-1,'down')">
            <span
              v-for="(value2,key2) in value1.value.down"
              :key="key2"
              class="k-board"
              :class="value2.name"
              v-on:click.stop="addcursor($event,key,key1,key2,'down')">{{(value2.view || value2.value) | CharCodeIcon}}</span>
          </span>
        </span>
        <span
          v-else
          :key="key1"
          v-bind:class="[value1.name,{'equal':value1.value=='='}]"
          v-on:click.stop="addcursor($event,key,key1,-1,-1)">{{(value1.view || value1.value) | CharCodeIcon}}
        </span>
      </template>
    </div>

  </div>

  <div
    v-else
    :key="num"
    class="iminputdiv qti_fill_input"
    v-bind:class="{'red':is_correct?is_correct[num]==='0':0,'green':is_correct?is_correct[num]==='1':0}"
    v-on:click.stop="addcursor($event,num,-1,-1,-1)">

    <template v-if="inputarray[num].length === 0 && testdata.msubmitflag == 1">?</template>

    <template v-else v-for="(value1,key1) in inputarray[num]">

      <template
        v-if="inputarray[num].length==1&&value1.name=='aime'&&value1.value===''&&testdata.msubmitflag==1">?
      </template>
      <span v-else-if="value1.name=='cursor'" :key="key1" class="k-board cursor"></span>
      <span
        v-else-if="value1.name=='fraction'||value1.name=='sqrt2'||value1.name=='sqrt3'||value1.name=='aimsup'||value1.name=='aimsub'"
        :key="key1" v-bind:class="[value1.name,{'click':is_cursor(value1.value)==1}]"
        v-bind:style="{ width: value1.name=='fraction'?Math.max(3,value1.value.up.length*1.4,value1.value.down.length*1.4) + 'vh':'auto' }"
        v-on:click.stop="addcursor($event,num,key1,-1,-1)">
        <span class="enterdiv up" v-on:click.stop="addcursor($event,num,key1,-1,'up')">
          <span v-for="(value2,key2) in value1.value.up" :key="key2" dir="up" :class="value2.name"
               v-on:click.stop="addcursor($event,num,key1,key2,'up')">{{(value2.view || value2.value) | CharCodeIcon}}
          </span>
        </span>
        <span class="enterdiv down" v-on:click.stop="addcursor($event,num,key1,-1,'down')">
          <span v-for="(value2,key2) in value1.value.down" :key="key2" dir="down" :class="value2.name"
               v-on:click.stop="addcursor($event,num,key1,key2,'down')">{{(value2.view || value2.value) | CharCodeIcon}}
          </span>
        </span>
      </span>
      <span v-else :key="key1" :class="value1.name" v-on:click.stop="addcursor($event,num,key1,-1,-1)">
        {{(value1.view || value1.value) | CharCodeIcon}}
      </span>

    </template>

  </div>

</template>

<script>
  // import Bus from './view/emitBus'
  // import mathSymbol from './json/queryGid.json'
  // import querySymbol from './json/querySymbol.json'
  // import keysTextJson from './json/keystext.json'


  const mathSymbol = require('./json/queryGid.json'),
    querySymbol = require('./json/querySymbol.json'),
    keysTextJson = require('./json/keystext.json');

  export default {
    name: 'InputBox',
    data() {
      return {
        maxlength: "",
        // inputarray: [[]],
        matchBoardType: "combo", // 匹配的默认键盘
        symbols: (() => {
          return Object.entries(keysTextJson[this.boardType === 'none' && 'combo' || this.boardType].data.defaultSymbol || {}).map(([k, val]) => {
            return Object.assign({}, val, {
              text: k,
            })
          })
        })(),
      };
    },
    props: {
      testdata: {
        type: Object,
        default() {
          return {
            manswer: [],
            msubmitflag: 0,
          }
        },
      },
      is_correct: { // 输入框文字颜色
        type: Array,
        default() {
          return []
        },
      },
      rootdata: { //
        type: Object,
        default() {
          return {imshow: 0}
        },
      },
      num: { //
        type: [Number, String],
        default: -1,
      },
      inputarray: { //
        type: Array,
        default() {
          return [[]]
        },
      },
      /**/
      rects: { // 要替换的输入框client rects
        type: DOMRect,
        default() {
          return new DOMRect();
        },
      },
      prev: { // 要替换的输入框元素
        type: Object,
        default() {
          return {el: null}
        }
      },
      custom: { // 是否使用自定义的样式
        type: Boolean,
        default: false,
      },
      id: { // 当前组件的id，用于下一空跳转标识
        type: [Number, String],
        default: '',
      },
      nextId: { // 下一空跳转的id
        type: [Number, String],
        default: '',
      },
      boardType: { // 键盘类型
        type: [Number, String],
        default: 'none',
      }, // 指定键盘类型
      value: {
        type: [String, Number],
        default: '',
      },
      /*正确答案*/
      rightAnswers: {
        type: Array,
        default() {
          return []
        },
      },
      subject: {
        type: [String, Number],
        default: 2, // 默认学科：数学
      }, // 学科编号
    },
    created: function () {
      // Bus.iptComps.push({
      //   id: this.id,
      //   component: this,
      // });
      // /**/
      // Bus.$on('before-next', (id, callback) => {
      //   id === this.id && this.$emit('before-next', callback, {
      //     currentId: this.id,
      //   });
      // });

      let {el} = this.prev,
        initial = this.value.toString();

      if (this.testdata.mtype == 38) {
        this.maxlength = new Array();
        for (let i = 0; i < this.testdata.manswer.length; i++) {
          this.maxlength[i] = this.testdata.manswer[i][0].length;
        }
      } else {
        this.maxlength = "";
      }

      if (el && el.value.length > 0) {
        initial = el.value;
      }

      // for (let v of initial) {
      //   this.inputarray[0].push({
      //     name: 'aime',
      //     value: v,
      //   });
      // }

    },
    methods: {
      //点击添加光标
      addcursor: function (event, i, j, k, dir) {
        let {boardType, symbols, matchBoardType} = this;

        if (this.testdata.msubmitflag == 0) { // qti调用键盘
          // if (this.testdata.mtype == 33) {
          //   this.$addcursor(this, 'takeOff', event, i, j, k, dir);
          // } else if (this.testdata.mtype == 38) {
          //   if (this.rootdata.bookflag == 1 && this.is_correct[i] == 1) {
          //     return;
          //   }
          //   this.$addcursor(this, 3, event, i, j, k, dir);
          // } else {
          //   this.$addcursor(this, 0, event, i, j, k, dir);
          // }

          this.$addcursor(this, boardType === 'none' ? matchBoardType : boardType, event, i, j, k, dir, {
            symbols
          });

        }
      },
      //光标是否在公式里
      is_cursor: function (value) {
        let flag = value.up.findIndex((value, index, arr) => {
          return value.name == "cursor";
        });
        if (flag == -1) {
          flag = value.down.findIndex((value, index, arr) => {
            return value.name == "cursor";
          });
        }
        return flag != -1 ? 1 : 0;
      },
      /*格式化输入的值*/
      formatVal(arr) {
        let res = '';
        arr.forEach(({value = '', name = 'aime'}) => {
          switch (name) {
            case 'aime': {
              res += value;
            }
              break;
            case 'fraction': {
              res += `\\frac {${this.formatVal(value.up)}} {${this.formatVal(value.down)}}`;
            }
              break;
            case 'sqrt2': {
              res += `\\sqrt {${this.formatVal(value.down)}}`;
            }
              break;
            case 'sqrt3': {
              res += `\\sqrt[{3}] {${this.formatVal(value.down)}}`;
            }
              break;
            case 'aimsup': {
              res += `{${this.formatVal(value.up)}}^{${this.formatVal(value.down)}}`;
            }
              break;
            case 'aimsub': {
              res += `{${this.formatVal(value.up)}}_{${this.formatVal(value.down)}}`;
            }
              break;
          }
        });
        return res
      },


      /*转移焦点*/
      toNext(nextId = this.nextId) {
        if (!Bus.toNext(nextId)) { // 没有下一个输入框
          this.$closeanoahim();
        }
      },
      /*识别符号组*/
      matchSymbol(calcType, rightAnswers, gId) {
        /*
        *数字+符号键盘时
        *答案中含有非数字，优先判定为符号
        */
        if (calcType === 'number' && Number(rightAnswers) != rightAnswers) {

        } else if (calcType === 'letters') {
          /*字母键盘时，当做都有符号处理*/
        }

        /* 识别以空格区分的符号*/
        rightAnswers.split(' ').forEach(val => {
          let m = mathSymbol[val];
          if (m) putGid(gId, m.gid, val);
        });
        /*截取英文组成的符号*/
        let y = rightAnswers.match(/\w+/igm) || [];
        y.forEach(val => {
          let m = mathSymbol[val];
          /* // 获取英文组成的符号的组id*/
          if (m) putGid(gId, m.gid, val);
        });
        /*截取空格隔开的英文组成的符号*/
        let lsl = rightAnswers.match(/\w+ \w+/igm) || [];
        lsl.forEach(val => {
          let m = mathSymbol[val];
          /* // 获取英文组成的符号的组id*/
          if (m) putGid(gId, m.gid, val);
        });
        /*获取普通符号的组id*/
        for (let i of rightAnswers) {
          let m = mathSymbol[i];
          if (m) putGid(gId, m.gid, i);
        }
        /*整个字符作为符号时*/
        let match = mathSymbol[rightAnswers];
        /* // 获取英文组成的符号的组id*/
        if (match) putGid(gId, match.gid, rightAnswers);
        /*带有分数*/
        if (rightAnswers.match(/\\frac {\S*} {\S*}/)) {
          putGid(gId, 'G_2_19', '\\frac {\\S*} {\\S*}');
        }
        /*带有平方根*/
        if (rightAnswers.match(/\\sqrt\[\{2\}\] {\S*}|\\sqrt {\S*}/)) {
          putGid(gId, 'G_2_19', '\\sqrt[{2}] {\\S*}');
        }
        /*带有立方根*/
        if (rightAnswers.match(/\\sqrt\[\{3\}\] {\S*}/)) {
          putGid(gId, 'G_2_19', '\\sqrt[{3}] {\\S*}');
        }
        /*上标类*/
        if (rightAnswers.match(/{\S*}\^{\S*}/)) {
          let m = null;
          /*面积或者平方类单位*/
          if (m = rightAnswers.match(/{\w+}\^\{2\}/gm)) {
            m.forEach(val => {
              let sym = mathSymbol[val];
              if (sym) putGid(gId, sym.gid, val);
            });
            // putGid(gId, 'G_2_16', '{σ}^{2}');
          } else {
            // 带有上标
            putGid(gId, 'G_2_19', '{\\S*}^{\\S*}');
          }
        }
        if (rightAnswers.match(/{\S*}_{\S*}/m)) {
          // 带有下标
          putGid(gId, 'G_2_19', '{\\S*}_{\\S*}');
        }
        if (rightAnswers.match('Rt△')) {
          // 带有Rt△
          putGid(gId, 'G_2_12', 'Rt△');
        }
      },
    },
    computed: {
    },
    mounted() {

      let {subject, boardType, rightAnswers} = this,
        gId = {},
        required = {}, // 必须具备的符号
        group = {},
        calcType = boardType;
      /*未传递键盘类型时，通过正确答案判断类型*/
      // console.log('正确答案：', rightAnswers);
      if (rightAnswers.length > 0) {
        /*获取gid*/
        rightAnswers.forEach(val => {
          switch (subject.toString()) {
            /*学科为数学*/
            case '2': {
              let hasChinese = val.match(/[\u4E00-\u9FA5]+/gm), // 有汉字
                hasNum = val.match(/\d/gm), // 有数字
                hasEng = val.match(/[a-z]/igm); // 有字母

              if (hasChinese) {
                if (hasNum) {
                  this.matchBoardType = 'combo';
                } else {
                  this.matchBoardType = 'chinese';
                }
              } else if (hasNum) {
                /*含有数字且没有汉字，使用数字键盘*/
                this.matchBoardType = 'number';
              } else if (hasEng) {
                /*含有字母且没有汉字和数字，使用子母键盘*/
                this.matchBoardType = 'letters';
              } else {
                this.matchBoardType = 'symbol';
              }

              /*未指定键盘类型时，使用匹配出的键盘类型*/
              calcType = boardType === 'none' ? this.matchBoardType : calcType;

              /*获取符号组id*/
              this.matchSymbol(calcType, val, gId);
            }
              break;
          }
        })

        console.log(gId, calcType);

        Object.entries(gId).forEach(([k, val]) => {
          let g = querySymbol[k] || {};
          /*必备的符号*/
          Object.entries(val).forEach(([key, itm]) => {
            Object.assign(itm, g[key] || {});
          })
          Object.assign(required, val);
          /*匹配的符号组*/
          Object.assign(group, g);
        });
        let group_keys = Object.keys(group),
          group_length = group_keys.length,
          required_length = Object.keys(required).length,
          symNum = 0, // 不同键盘类型最少需要符号个数
          minNum = 0, // 实际的最少符号个数
          sum = null, // 干扰符号个数
          intruder = {},
          defaultSym = keysTextJson[calcType].data.defaultSymbol;
        /*数字键盘时，重置符号*/
        if (calcType === 'number') {
          symNum = 10;
        } else if (calcType === 'letters') {
          /*字母键盘时*/
          symNum = 4;
        }

        /*必备符号多于键盘符号按键，显示符号组所有符号*/
        if (required_length > symNum) {
          minNum = group_length;
          intruder = group;
        } else {
          minNum = symNum;
          sum = Math.min(symNum, group_length);
          /*选择干扰符号*/
          Array.from({length: sum}).forEach(() => {
            let k = group_keys.splice(Math.floor(Math.random() * group_keys.length), 1)[0];
            intruder[k] = group[k];
          });
        }

        this.symbols = Object.entries(Object.assign({}, required, intruder, defaultSym)).slice(0, minNum).map(([k, itm]) => {
          return Object.assign({}, itm, {
            text: k,
          })
        });

        /*打乱符号顺序*/
        this.symbols.forEach((itm, i, arr) => {
          let j = Math.floor(Math.random() * arr.length);
          [arr[i], arr[j]] = [arr[j], arr[i]];
        });

      }

    },
    watch: {
      inputarray: {
        deep: true,
        handler(val) {
          // let res = '',
          //   maxIdx = val.length - 1;
          // val.forEach((itm, idx) => {
          //   res += this.formatVal(itm);
          //   idx !== maxIdx && (res += ' \\n ');
          // });
          // // val = this.formatVal(val[0]);
          // if (this.prev.el) {
          //   let e = document.createEvent("HTMLEvents");
          //   e.initEvent("input", true, true);
          //   this.prev.el.value = res;
          //   this.prev.el.dispatchEvent(e);
          // }
          // this.$emit('input', res);
        },
      },
      value(val) {
        this.$emit('after-change', this.toNext, {
          value: val,
        });
      },
    },
  };


  function putGid(obj, id, k) {
    if (!obj[id]) {
      obj[id] = {
        [k]: {},
      };
    } else {
      obj[id][k] = {};
    }

  }
</script>

<style lang='scss' scoped>
  @import "iminputdiv";


</style>

