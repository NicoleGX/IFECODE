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
function calXLine(Xstart, Yend, barWidth, barMargin) {
  var margin = barWidth + barMargin * 2;
  var res = [];
  for(let i = 0; i < 12; i++) {
    // [x1, x2, y1, y2, g1, g2]    
    res.push([(Xstart + margin * i + (barWidth/2 + barMargin)), (Xstart + margin * i + (barWidth/2 + barMargin)), Yend, (Yend + 8), (Xstart + margin * i + (barWidth/2 + barMargin)), (Yend + 10)]);
  }
  return res;
}

// 计算纵轴坐标
function calYLine(Xstart, Ystart, yHeight) {
  var res = [];
  for(let i = 0; i < 12; i++) {
    // [x1, x2, y1, y2, g1, g2]    
    res.push([(Xstart - 8), Xstart, (Ystart + (yHeight / 4) * i), (Ystart + (yHeight / 4) * i), (Xstart - 8), (Ystart + (yHeight / 4) * i)]);
  }
  return res;
}

// 计算柱子坐标
function calBar(Xstart, Ystart, yHeight, barWidth, barMargin, Ymax, data) {
  var res = [];
  for(let i = 0; i < data.length; i++) {
    // [x, y, width, height]    
    res.push([(Xstart + barMargin + (barWidth + barMargin * 2) * i), (Ystart + yHeight - (data[i] / Ymax * yHeight)), barWidth, (data[i] / Ymax * yHeight)]);
  }
  return res;
}

function drawBar(data) {
  
  // 获取纵轴最大值
  var Ymax = getMaxValue(data);
  
  var container = document.getElementById('container');
  container.innerHTML = '<svg width="100%" height="100%" id="svgBox"></svg>';
  var svgBox = document.getElementById('svgBox');
  
  var svgWidth = 1200;
  var svgHeight = 500;
  var xWidth = 900;
  var yHeight = 400;
  var xColor = '#000';
  var yColor = '#000';
  var barWidth = 50;
  var barMargin = 12.5;
  var barColor = '#57a9d4';
  
  var Xstart = ((svgWidth - xWidth) / 2);
  var Xend = (svgWidth - (svgWidth - xWidth) / 2);
  var Ystart = ((svgHeight - yHeight) / 2);
  var Yend = (yHeight + (svgHeight - yHeight) / 2);
  var margin = barWidth + barMargin * 2;
  
  var count = data.length;
  
  // 绘制坐标横轴
  svgBox.innerHTML = '<line x1="' + Xstart + '" y1="' + (Yend + 1) + '" x2="' + Xend + '" y2="' + (Yend + 1) + '" style="stroke:#000;stroke-width:1"/>';
  // 绘制坐标纵轴
  svgBox.innerHTML += '<line x1="' + Xstart + '" y1="' + Ystart + '" x2="' + Xstart + '" y2="' + Yend + '" style="stroke:#000;stroke-width:1"/>';
  
  // 绘制横轴标签
  var xLine = '';
  var xCoordinate = calXLine(Xstart, Yend, barWidth, barMargin);
  for(let i = 0; i < 12; i++) {
    xLine += '<line x1="' + xCoordinate[i][0] + '" y1="' + xCoordinate[i][2] + '" x2="' + xCoordinate[i][1] + '" y2="' + xCoordinate[i][3] + '" style="stroke:#000;stroke-width:1"/> <g class="tick" transform="translate(' + xCoordinate[i][4] + ',' + xCoordinate[i][5] + ')" style="opacity: 1;"><text y="3" x="0" dy=".71em" style="text-anchor: middle;">' + (i + 1) + '</text></g>'
  }
  // 绘制纵轴标签
  var yLine = '';
  var yCoordinate = calYLine(Xstart, Ystart, yHeight);
  for(let i = 0; i < 5; i++) {
    yLine += '<line x1="' + yCoordinate[i][0] + '" y1="' + yCoordinate[i][2] + '" x2="' + yCoordinate[i][1] + '" y2="' + yCoordinate[i][3] + '" style="stroke:#000;stroke-width:1"/> <g class="tick" transform="translate(' + yCoordinate[i][4] + ',' + yCoordinate[i][5] + ')" style="opacity: 1;"><text x="-30" y="6" dx=".71em" style="text-anchor: middle;">' + (Ymax - Ymax / 4 * i) + '</text></g>';
  }
  
  // 绘制柱子
  var bar = '';
  var barCoordinate = calBar(Xstart, Ystart, yHeight, barWidth, barMargin, Ymax, data);
  for(let i = 0; i < data.length; i++) {
    bar += '<rect x="' + barCoordinate[i][0] + '" y="' + barCoordinate[i][1] + '" width="' + barCoordinate[i][2] + '" height="' + barCoordinate[i][3] + '" style="fill:#57a9d4"/>';
  }
  svgBox.innerHTML += xLine + yLine + bar;
}
