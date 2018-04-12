Array.prototype.sum = function () {
  var result = 0
  for (var i = 0; i < this.length; i++) {
    result += this[i]
  }
  return result
}

Array.prototype.avg = function () {
  var result = 0
  for (var i = 0; i < this.length; i++) {
    result += this[i]
  }
  return result / this.length
}

function cdf (x, mean, variance) {
  return 0.5 * (1 + erf((x - mean) / (Math.sqrt(2 * variance))));
}

function erf (x) {
  // save the sign of x
  var sign = (x >= 0) ? 1 : -1;
  x = Math.abs(x);

  // constants
  var a1 = 0.254829592;
  var a2 = -0.284496736;
  var a3 = 1.421413741;
  var a4 = -1.453152027;
  var a5 = 1.061405429;
  var p = 0.3275911;

  // A&S formula 7.1.26
  var t = 1.0 / (1.0 + p * x);
  var y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
  return sign * y; // erf(-x) = -erf(x);
}

// 标准正态分布计算
function std_n_cdf (x) {
  return cdf(x, 0, 1);
}

function std_n_cdf2 (a) {
  var p = 0.2316419;
  var b1 = 0.31938153;
  var b2 = -0.356563782;
  var b3 = 1.781477937;
  var b4 = -1.821255978;
  var b5 = 1.330274429;
  var x = Math.abs(a);
  var t = 1 / (1 + p * x);
  var val1 = 1 - (1 / (Math.sqrt(2 * Math.PI)) * Math.exp(-1 * Math.pow(a, 2) / 2)) * (b1 * t + b2 * Math.pow(t, 2) + b3 * Math.pow(t, 3) + b4 * Math.pow(t, 4) + b5 * Math.pow(t, 5));
  if (a < 0) {
    val1 = 1 - val1;
  }
  return val1;
}

/**
 * @param {array} data 原始数据数组 - 最终得分
 * @param {array} originElo 原始数据数组 - 原始ELO值
 * @param {number} k 计算常数 
 * @return {array} 新ELO值
 */
export const calculateElo = (data, originElo, k) => {
  // 样本平均值
  let avg = data.avg()
  // 样本数量
  let n = data.length
  // 样本与平均数差的平方和
  let sum1 = data.map(item => {
    return Math.pow((item - avg), 2)
  }).sum()
  // 标准差  
  let stdev = data.map(item => {
    return (item - avg) / Math.sqrt(sum1 / (n - 1))
  })
  // 分别对每个样本计算ELO变动值
  let results = stdev.map((item, index, arr) => {
    /**
     * 标准正态分布计算
     */
    // 该选手的对其他选手标准差之差
    let stdevCopy = Object.assign([], stdev)
    // 去掉自身
    stdevCopy.splice(index, 1)
    // 标准正态分布概率累积之和-实际
    let actual = stdevCopy.map(item1 => {
      return std_n_cdf2(item - item1)
    }).sum()
    // console.log(`正态分布选手${index + 1}:`, stdevCopy.map((item1, j) => {
    //   return std_n_cdf2(item - item1)
    // }))
    /**
     * 胜率期望计算
     */
    let originEloCopy = Object.assign([], originElo)
    let ownOriginal = originEloCopy.splice(index, 1)[0]
    // 上次期望预估
    let forecast = originEloCopy.map(item1 => {
      return 1 / (1 + Math.pow(10, (item1 - ownOriginal) / 400))
    }).sum()
    // ELO变动值
    let delta = (actual - forecast) * k
    // 新ELO
    return +ownOriginal + +delta
  })
  
  // console.log('results', results)
  return results
}
// // test data
// let data = [
//   67.99,
//   84.07,
//   90.80,
//   78.10,
//   75.61,
//   60.48,
//   86.49,
//   65.51,
//   88.43,
//   91.70,
//   79.05,
//   86.68,
//   70.18,
//   89.12,
//   85.78
// ]
// let ori = [
//   1200,
//   1050,
//   1075,
//   1100,
//   1125,
//   1150,
//   1175,
//   1200,
//   1225,
//   1250,
//   1275,
//   1300,
//   1325,
//   1350,
//   1375
// ]
// calculateElo(data, ori, 16)