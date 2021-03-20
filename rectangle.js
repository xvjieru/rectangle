$(function(){
  //get dom elem
  var $width = $('#width'),
      $height = $("#height"),
      $btnCal = $('#calc'),
      $perimeter = $('#perimeter'),
      $area = $('#area');
    
  /*calc button click event*/
  $btnCal.click(function() {
    //validate if error return
    if(!validate('#width') || !validate('#height')) return;

    //get vale
    var w = Number($width.val()),
        h = Number($height.val());
    
    //calculate
    function floatNumer(e, t) {
      return Math.round(e * Math.pow(10, t)) / Math.pow(10, t);   
    }

    var p = floatNumer(2*(w+h), 3),
        a = floatNumer(w*h, 3);

    //output
    $perimeter.val(p);
    $area.val(a);
  });


  //表单校验
  function validate(field) {
    //get DOM error message
    var $data = $(field),
        $msg = $(field + '-validation-message');

    //validate null
    if($data.val() === '') {
      $msg.html('不能为空！');
      $data.select();
      return false;
    }

    //validate number
    if(!/^-?(0|[1-9]\d*)(\.\d*)?([eE][+-]?\d+)?$/.test($data.val())){
      $msg.html('必须是数值！');
      $data.select();
      return false;
    }

    //validate > 0
    if(Number($data.val()) < 0) {
      $msg.html('必须大于零！');
      $data.select();
      return false;
    }

    $msg.html('');
    return true;
  }


  //字段级校验
  $width.focusout(function(){
    // if(!validate(width)) select this
    if(!validate('#width')) $width.select(); 
  });

  $height.focusout(function(){
    // if(!validate(width)) select this
    if(!validate('#height')) $height.select(); 
  });


  //字符级校验
    //1.event keypress
    //2.event argument get key value,e.key and e.target.value
    //3.illegal key filter, e.preventDefault();
    //4.合法字符出现的位置
  function isLegalKey(key,con,pos){
    //阻止不合法字符
    if(/[abcdf-zABCDF-Z`~!@#$%^&*()=_+[\]{}|;:'",<>/?\\]/.test(key)){  
      return false;
    }

    //合法字符：e和E
    //允许出现在非科学计数法的末尾、中间
    if(key === 'e' || key === 'E' ){
      //e和E不能出现在数字的首位
      if(pos === 0) return false;

       //e和E不能出现在科学计数法的数字中
      if(con.indexOf('e') !== -1 || con.indexOf('E') !== -1 ) return false;

      //e和E不能出现在负号和小数点后
      if(pos > 0 && /[-.]/.test(con.slice(pos-1, pos))) return false;
      
      //e和E不能出现在小数点前面
      if(con.slice(pos, con.length).indexOf('.') !== -1) return false;
    }

    //合法字符：.小数点
    if(key === '.'){
      //小数点不能出现在数字的首位
      if(pos === 0) return false;

      //小数点不能出现在小数中
      if(con.indexOf('.') !== -1) return false;

      //小数点不能出现在负号、e和E后面
      if(pos > 0 && /[-eE]/.test(con.slice(0, pos))) return false;
    }

    //合法字符：-负号
    if(key === '-'){
      //负号不能出现在数字的首位
      if(pos === 0) return false;

      //负号不能出现在数字和小数点后面
      if(pos > 0 && /[0-9.]/.test(con.slice(pos-1, pos))) return false;

      //负号不能重复出现
      if(pos > 0 && con.indexOf('-') !== -1) return false;
    }

    return true;
  }
  $width.keypress(function(e){
    if(!isLegalKey(e.key, e.target.value, e.target.selectionStart)){
      e.preventDefault();
    } 
  });

  $height.keypress(function(e){
    if(!isLegalKey(e.key, e.target.value, e.target.selectionStart)){
      e.preventDefault();
    }
  });

});
