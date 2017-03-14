export default {
	//格式化时间
	getTimeStr(time){
      var str;
  	  var date = new Date(time);
  	  var now = new Date();
      var term = now-date;
      var day = 1000*60*60*24;
      var hour = 1000*60*60;
      var minute = 1000*60;
  		if(term/day >1){
        str = Math.round(term/day) + '天前'; 
      }else if(term/hour>1){
        str = Math.round(term/hour) + '小时前';
      }else{
        str = Math.round(term/minute) + '分钟前';
      }
      return str;
  	},
  	//获取标签名称
  	getTag(top,good,tab,isClass){
  		var str,className;
  		if(top){
  			str = '置顶';
  			className = "top";
  		}else if(good){
  			str = '精华';
  			className = "good";
  		}else{
  			switch(tab){
  				case 'share':
                str = '分享';
                className = 'share';
                break;
            case 'ask':
                str = '问答';
                className = 'ask';
                break;
            case 'job':
                str = '招聘';
                className = 'job';
                break;
            default:
                str = '暂无';
                className = 'default';
                break;
  			}
  		}
  		return isClass?className:str;
  	},
  	
}