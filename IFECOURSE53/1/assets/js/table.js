function drawTable() {
  // 根据表单选项获取数据
  var data = filterData();
  if(data.length) {
    var typeArr = new Array();
    // 判断渲染类型, [[line1, line2], merge-line, {mergeCount}]
    typeArr = drawType(data);
    // 渲染表格
    var tableDom = document.getElementById('table-wrapper')
    tableDom.innerHTML = '<table border="1" id="table"><tr><th>' + typeArr[0][0].toUpperCase() + '</th><th>' + typeArr[0][1].toUpperCase() + '</th></tr></table>'
    var table = document.getElementById('table');
    if(typeArr[1]) {
      for(let key in typeArr[2]) {
        var count = 1
        for(let n in data) {
          if(data[n][typeArr[1]] === key) {
            var tr = document.createElement('tr');
            if(count === 1) {
              // add rowspan              
              tr.innerHTML = '<td rowspan=' + typeArr[2][key] + '>' + key + '</td><td>' + data[n][typeArr[0][1]] + '</td>';
            } else {
              tr.innerHTML = '<td>' + data[n][typeArr[0][1]] + '</td>';
            }
            table.appendChild(tr);
            count += 1;
          } 
        }
      }
    } else {
      for(let i in data) {
        var tr = document.createElement('tr');
        for(let n in typeArr[0]) {
          var td = document.createElement('td');
          td.innerHTML = data[i][typeArr[0][n]];
          tr.appendChild(td)
        }
        table.appendChild(tr)
      }
    }
  }
}

// 判断渲染方式
function drawType(data) {
  var region = [];
  var product = [];
  for(let i in data) {
    if(!contains(region, data[i]['region'])) {
      region.push(data[i]['region'])
    }
    if(!contains(product, data[i]['product'])) {
      product.push(data[i]['product'])
    }
  }
  if(region.length == 1) {
    if(product.length == 1) {
      return [['product', 'region'], ''];
    } else {
      var res = {}
      for(let i in data) {
        if(!res.hasOwnProperty(data[i]['region'])) {
          res[data[i]['region']] = 0
        }
        res[data[i]['region']] += 1
      }
      return [['region', 'product'], 'region', res];
    }
  } else if(region.length > 1) {
    var res = {}
    for(let i in data) {
      if(!res.hasOwnProperty(data[i]['product'])) {
        res[data[i]['product']] = 0
      }
      res[data[i]['product']] += 1
    }
    return [['product', 'region'], 'product', res];
  }
}

function filterData() {
  var region = getCheckedVal('region-checkbox-wrapper');
  var product = getCheckedVal('product-checkbox-wrapper');
  var data = []
  for(let i in sourceData) {
    if(contains(region, sourceData[i]['region']) && contains(product, sourceData[i]['product'])) {
      data.push(sourceData[i]);
    }
  }
  return data;

}

// 勾选的元素
function getCheckedVal(id) {
  var input = document.getElementById(id).getElementsByTagName('input')
  var data = []
  for(let i = 0; i < input.length-1; i++) {
    if(input[i].checked) {
      data.push(input[i].value)
    }
  }
  return data;
}

// 元素是否在数组内
function contains(arr, obj) {
  var i = arr.length;
  while (i--) {
    if (arr[i] === obj) {
      return true;
    }
  }
  return false;
}