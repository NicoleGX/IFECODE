// 获取纵轴最大值
function getMaxValue(data) {
  max = 0
  for(let i in data) {
    if(data[i] > max) {
      max = data[i];
    }
  }
  if(max%20){
    max = (parseInt(max/20) + 1) * 20
  }
  return max;
}

// 计算横轴坐标
function calXLine(Xstart, Yend, lineWidth, lineMargin) {
  var margin = lineWidth + lineMargin * 2;
  var res = [];
  for(let i = 0; i < 12; i++) {
    // [x1, y1, y2, g1, g2]    
    res.push([(Xstart + margin * i + (lineWidth/2 + lineMargin)), Yend, (Yend + 8), (Xstart + margin * i + (lineWidth/2 + lineMargin)), (Yend + 20)]);
  }
  return res;
}

// 计算纵轴坐标
function calYLine(Xstart, Ystart, yHeight) {
  var res = [];
  for(let i = 0; i < 12; i++) {
    // [x1, x2, y1, g1, g2]    
    res.push([(Xstart - 8), Xstart, (Ystart + (yHeight / 4) * i), (Xstart - 10), (Ystart + (yHeight / 4) * i + 4)]);
  }
  return res;
}

// 计算线条坐标
function calLine(Xstart, Ystart, yHeight, lineWidth, lineMargin, Ymax, data) {
  var margin = lineWidth + lineMargin * 2;
  var res = [];
  for(let i = 0; i < data.length; i++) {
    // [x, y]    
    res.push([(Xstart + margin * i + (lineWidth/2 + lineMargin)), (Ystart + yHeight - (data[i] / Ymax * yHeight))]);
  }
  return res;
}

function drawLine(data) {
  // 获取纵轴最大值
  var Ymax = getMaxValue(data);
  
  var canvasWidth = 1200;
  var canvasHeight = 500;
  var xWidth = 900;
  var yHeight = 400;
  var xColor = '#000';
  var yColor = '#000';
  var lineWidth = 50;
  var lineMargin = 12.5;
  var lineColor = '#57a9d4';
  
  var Xstart = ((canvasWidth - xWidth) / 2);
  var Xend = (canvasWidth - (canvasWidth - xWidth) / 2);
  var Ystart = ((canvasHeight - yHeight) / 2);
  var Yend = (yHeight + (canvasHeight - yHeight) / 2);
  var margin = lineWidth + lineMargin * 2;
  
  var container = document.getElementById('container');
  container.innerHTML = '<canvas id="canvas" width="1200" height="500"></canvas>';
  var canvas = document.getElementById('canvas');
  if (canvas.getContext){
    var ctx = canvas.getContext('2d');

    // 绘制横轴\纵轴
    ctx.beginPath();
    ctx.moveTo(Xstart, Ystart);
    ctx.lineTo(Xstart, Yend);
    ctx.moveTo(Xstart, Yend);
    ctx.lineTo(Xend, Yend);
    
    // 绘制横轴坐标
    // [x1, x2, y1, y2, g1, g2]  
    var xCoordinate = calXLine(Xstart, Yend, lineWidth, lineMargin);
    for(let i = 0; i < 12; i++) {
      ctx.moveTo(xCoordinate[i][0], xCoordinate[i][1]);
      ctx.lineTo(xCoordinate[i][0], xCoordinate[i][2]);
      ctx.font = ".71em serif";
      ctx.textAlign = 'center';
      ctx.strokeText((i + 1), xCoordinate[i][3], xCoordinate[i][4]);
    }
    // 绘制纵轴坐标
    var yCoordinate = calYLine(Xstart, Ystart, yHeight);
    for(let i = 0; i < 5; i++) {
      ctx.moveTo(yCoordinate[i][0], yCoordinate[i][2]);
      ctx.lineTo(yCoordinate[i][1], yCoordinate[i][2]);
      ctx.font = ".71em serif";
      ctx.textAlign = 'right';
      ctx.strokeText((Ymax - Ymax / 4 * i), yCoordinate[i][3], yCoordinate[i][4]);
    }
    ctx.stroke();
    
    // 绘制折线
    ctx.beginPath();
    ctx.lineWidth = 2;//线条的宽度
    var lineCoordinate = calLine(Xstart, Ystart, yHeight, lineWidth, lineMargin, Ymax, data);
    var beforeNode = [lineCoordinate[0][0], lineCoordinate[0][1]];
    for(let i = 1; i < data.length; i++) {
      ctx.moveTo(beforeNode[0], beforeNode[1]);
      ctx.lineTo(lineCoordinate[i][0], lineCoordinate[i][1]);
      ctx.fillStyle="red";
      ctx.strokeStyle="red";
      // x, y, radius, startAngle, endAngle, anticlockwise      
      ctx.arc(beforeNode[0], beforeNode[1], 3, 0, Math.PI*2, true);
      ctx.fill();
      beforeNode = [lineCoordinate[i][0], lineCoordinate[i][1]];
    }
    // 最后一个节点
    ctx.arc(beforeNode[0], beforeNode[1], 3, 0, Math.PI*2, true);
    ctx.fill();
    
    ctx.closePath();
    ctx.stroke();
  }
}