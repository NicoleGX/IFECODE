/*
 *  Document    : app.js
 *  Description: 
 */

 var App = function () {
  var selectChange = function () {
    var data = filterData();
    Table.init(data);
    Line.drawLines(data);
  }

  //  depend on checked
  var filterData = function () {
    var region = getCheckedVal(regionId);
    var product = getCheckedVal(productId);
    var data = []
    for(let i in sourceData) {
      if(contains(region, sourceData[i]['region']) && contains(product, sourceData[i]['product'])) {
        data.push(sourceData[i]);
      }
    }
    return data;
  }

  // depend on localstorage   
  var loadData = function () {
    var data = [];
    if(localStorage.tableData) {
      data = readLocalstorage();
    } else {
      data = sourceData;
    }
    return data;
  }

  var initCheckbox = function (data) {
    var region = [];
    var product = [];
    for(let i in data) {
        if(region.indexOf(data[i]['region']) === -1) {
            region.push(data[i]['region']);
        }
        if(product.indexOf(data[i]['product']) === -1) {
            product.push(data[i]['product']);
        }
    }
    for(let i in region) {
        if(region.length === 3) {
            document.getElementById('all-region-checkbox-wrapper').checked = 'checked';
        }
        document.getElementById(idList(region[i])).checked = 'checked';
    }
    for(let i in product) {
        if(product.length === 3) {
            document.getElementById('all-product-checkbox-wrapper').checked = 'checked';
        }
        document.getElementById(idList(product[i])).checked = 'checked';
    }
  }

  var readLocalstorage = function () {
    var initData = [];
    var data = localStorage.getItem('tableData');
    var data_arr = data.split('&');
    for(let i in data_arr) {
        var item_arr = data_arr[i].split(',');
        var tem = {};
        for(let n in item_arr) {
            var key_val = item_arr[n].split(':');
            if(key_val[0] === 'sale') {
                var sale = key_val[1].split('-');
                tem['sale'] = [];
                for(let m in sale) {
                    tem['sale'].push(parseInt(sale[m]));
                }
            } else {
                tem[key_val[0]] = key_val[1];
            }
        }
        for(let m in sourceData) {
            if(sourceData[m]['region'] === tem['region'] && sourceData[m]['product'] === tem['product']) {
                sourceData[m]['sale'] = tem['sale'];
            }
        }
        initData.push(tem);
    }
    return initData;
  }

  var idList = function (word) {
    switch(word) {
        case '华北':
            return 'huabei'
            break; 
        case '华南':
            return 'huanan'
            break; 
        case '华东':
            return 'huadong'
            break; 
        case '手机':
            return 'phone'
            break; 
        case '笔记本':
            return 'pc'
            break; 
        case '智能音箱':
            return 'audio'
            break; 
    }
  }

  return {
    addListener: function () {
      document.getElementById(regionId).addEventListener('click', selectChange);
      document.getElementById(productId).addEventListener('click', selectChange);
    },
    init: function () {
      // load data
      var data = loadData();
      initCheckbox(data);
    },
    drawTableandLine: function () {
        selectChange();
    }
  }
 }();

// Initialize APP when page loads
jQuery(function(){ App.addListener();App.init();App.drawTableandLine(); });