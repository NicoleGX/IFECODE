/*
 *  Document   : line.js
 *  Description: Using Canvas to draw line graph
 */

var Line = function () {

  var canvasWidth = 800;
  var canvasHeight = 400;
  var xWidth = canvasWidth * 0.9;
  var yHeight = canvasHeight * 0.9;
  var lineWidth = xWidth / 12 * 2 / 3;
  var lineMargin = xWidth / 12 / 6;
  var xColor = '#000';
  var yColor = '#000';
  var lineColor = '#57a9d4';

  var Xstart = ((canvasWidth - xWidth) / 2);
  var Xend = (canvasWidth - (canvasWidth - xWidth) / 2);
  var Ystart = ((canvasHeight - yHeight) / 2);
  var Yend = (yHeight + (canvasHeight - yHeight) / 2);
  var margin = lineWidth + lineMargin * 2;

  // draw axis
  var drawAxis = function (Ymax, xAxisCount) {
    var container = document.getElementById('container_line');
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
      for(let i = 0; i < xAxisCount; i++) {
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
      ctx.closePath();
      ctx.stroke();
    }
  }

  // Calculate the maximum value of Y axis
  var getMaxValue = function (data) {
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

  // Calculate the X axis
  var calXLine = function (Xstart, Yend, lineWidth, lineMargin) {
    var margin = lineWidth + lineMargin * 2;
    var res = [];
    for(let i = 0; i < 12; i++) {
      // [x1, y1, y2, g1, g2]    
      res.push([(Xstart + margin * i + (lineWidth/2 + lineMargin)), Yend, (Yend + 8), (Xstart + margin * i + (lineWidth/2 + lineMargin)), (Yend + 20)]);
    }
    return res;
  }

  // Calculate the Y axis
  var calYLine = function (Xstart, Ystart, yHeight) {
    var res = [];
    for(let i = 0; i < 12; i++) {
      // [x1, x2, y1, g1, g2]    
      res.push([(Xstart - 8), Xstart, (Ystart + (yHeight / 4) * i), (Xstart - 10), (Ystart + (yHeight / 4) * i + 4)]);
    }
    return res;
  }

  // Calculate coordinates
  var calLine = function (Xstart, Ystart, yHeight, lineWidth, lineMargin, Ymax, data) {
    var margin = lineWidth + lineMargin * 2;
    var res = [];
    for(let i = 0; i < data.length; i++) {
      // [x, y]    
      res.push([(Xstart + margin * i + (lineWidth/2 + lineMargin)), (Ystart + yHeight - (data[i] / Ymax * yHeight))]);
    }
    return res;
  }

  // Calculate the maximum value of the Ymax
  var Ymax = function (data) {
    var yMax = 0;
    for(let i in data) {
      if(getMaxValue(data[i]['sale']) > yMax) {
        yMax = getMaxValue(data[i]['sale']);
      }
    }
    return yMax;
  }

  // draw line graph
  var drawLine = function (data, color, Ymax) {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext){
      var ctx = canvas.getContext('2d');

      // 绘制折线
      ctx.beginPath();
      ctx.lineWidth = 2;//线条的宽度
      var lineCoordinate = calLine(Xstart, Ystart, yHeight, lineWidth, lineMargin, Ymax, data);
      var beforeNode = [lineCoordinate[0][0], lineCoordinate[0][1]];
      for(let i = 1; i < data.length; i++) {
        ctx.moveTo(beforeNode[0], beforeNode[1]);
        ctx.lineTo(lineCoordinate[i][0], lineCoordinate[i][1]);
        ctx.fillStyle= color;
        ctx.strokeStyle= color;
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

  var drawLines = function (data) {
    //  获取所有数据中的最大值
    var yMax = Ymax(data);
    // x轴坐标数
    var xAxisCount = data[0]['sale'].length;
    var colorTheme = ['#d87c7c', '#919e8b', '#d7ab82', '#6e7074', '#61a0a8', '#efa18d', '#787464', '#cc7e63', '#a4d8c2']
    // 绘制坐标轴    
    drawAxis(yMax, xAxisCount);
    // 绘制各条折线    
    for(let i in data) {
      drawLine(data[i]['sale'], colorTheme[i], yMax);
    }
  };

  return {
    drawLines: function (data) {
      drawLines(data);
    },
    drawLine: function (data, color, Ymax) {
      drawLine(data, color, Ymax)
    }
  };
}();

// Initialize line when page loads
// jQuery(function(){ Line.init(); });