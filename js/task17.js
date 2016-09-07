/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/
window.onload = function(){
  init();
}
//用于根据classname获取elements
function getName(oFather,oName){
  var list = [];
  var obj = document.getElementById(oFather).getElementsByTagName("*");
  for (var i = 0; i < obj.length; i++) {
    if(obj[i].name == oName){
      list.push(obj[i]);
    }
  }
  return list;
}
//跨浏览器支持DMO3
function addHandler(obj,event,func){
  if (obj.addEventListener) {
    obj.addEventListener(event,func);
  }else if(obj.attachEvent){
    obj.attachEvent("on"+event,func);
  }else{
    obj['on'+ event] = func;
  }
}
// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
  var wrap = document.getElementById("aqi-chart-wrap");
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化 
  var day = this.value;
  if (pageState.nowGraTime != day) {
    // 设置对应数据
    pageState.nowGraTime = day;
  }
  // 调用图表渲染函数
  renderChart(); 
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 
  var city = this.value;
  // alert(this.value);
  if(city != pageState.nowSelectCity){
  // 设置对应数据
    pageState.nowSelectCity = city;
  // 调用图表渲染函数
    renderChart();
  }
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var radios = getName("form-gra-time","gra-time");
  for (var i = 0; i < radios.length; i++) {
        addHandler(radios[i],'click', graTimeChange);
  }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var select = document.getElementById("city-select");
  var citys = Object.getOwnPropertyNames(aqiSourceData);
  select.innerHTML = citys.map(function(city){
    return "<option>" + city + "</option>";
  });
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  addHandler(select,'change',citySelectChange);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  var week = {}, weekdata = 0, wcount = 0, cityweek = {};
  var month = {}, monthdata = 0, mcount = 0, citymonth = {};
  // 将原始的源数据处理成图表需要的数据格式
  for(var data in aqiSourceData){
    var dataTemp = aqiSourceData[data];
    var date = Object.getOwnPropertyNames(dataTemp).sort();
    var monthTemp = date[0].slice(5,7);

    for(var i = 0;i<date.length;i++){
      if (date[i].slice(5,7)===monthTemp) {
        monthdata += dataTemp[date[i]];
        mcount ++;
        var weekTemp = date[i].slice(8,10);
        var weekInit = 1;
        if (weekTemp % 7 !=0) {
          weekdata += dataTemp[date[i]];
          wcount ++;
        } else {
          var tempw = date[i].slice(0,4) + "年"+date[i].slice(5,7)+"月第"+weekInit+"周";
          cityweek[tempw] = Math.floor(weekdata / wcount);
          weekInit ++;
          weekdata = 0;
          console.log(weekInit);
        }
        //console.log(cityweek);
      }else{
        var tempm = date[i].slice(0,4) + "年"+monthTemp+"月";
        citymonth[tempm] = Math.floor(monthdata / mcount);
        mcount = 1;
        monthTemp = date[i].slice(5,7);
        monthdata = dataTemp[date[i]];
      }
    }
    var length = data.length;
    var tempm = date[length].slice(0,4) + "年"+monthTemp+"月";
    citymonth[tempm] = Math.floor(monthdata / mcount);
    month[data] = citymonth;
    //console.log(citymonth);
  }
  //console.log(month);
  // 处理好的数据存到 chartData 中
  chartData.day = aqiSourceData;
  chartData.week = week;
  chartData.month = month;
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
}

