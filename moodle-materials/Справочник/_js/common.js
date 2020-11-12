function doMovie(swfPath){
	if(swfPath == undefined){
		alert("Путь к видео файлу задан не верно");
		return;
	}
	newWindow = window.open("","subWind", "status=false,menubar=false,width=700,height=550");
	var doc = newWindow.document;
	var content = '';
	content += '<html><head>';
	content += '<link href="_css/popup.css" rel="stylesheet" type="text/css">';
	content += '<script src="_js/swfobject.js"><\/script>';
	content += '<\/head><body">';
	content += '<div id="container">Для корректной работы программы требуется JavaScript и Flash Plugin версии 8</div>';
	content += '<script type="text/javascript">';
	content += 'try{ var so = new SWFObject("MoviePlayer.swf", "mcPlayer", "700", "550", "8");';
	content += 'so.addVariable("swfPath", "'+swfPath+'");';
	content += 'so.write("container");  }catch(e){ location.reload() } ';
	content += '<\/script>';
	content += '<\/body><\/html>';
	doc.write( content );
	
	newWindow.focus( );
}

function doAudio(mp3Path,title){
	if(mp3Path == undefined){
		alert("Путь к видео файлу задан не верно");
		return;
	}
	title = (title != undefined) ? title : "";
	audioWindow = window.open("","subWind", "status=false,menubar=false,width=300,height=100");
	var doc = audioWindow.document;
	var content = '';
	content += '<html><head>';
	content += '<link href="_css/popup.css" rel="stylesheet" type="text/css">';
	content += '<script src="_js/swfobject.js"><\/script>';
	content += '<\/head><body">';
	content += '<div id="container">Для корректной работы программы требуется JavaScript и Flash Plugin версии 8</div>';
	content += '<script type="text/javascript">';
	content += 'try{ var so = new SWFObject("AudioPlayer.swf", "mcPlayer", "300", "100", "8");';
	content += 'so.addVariable("mp3Path", "'+mp3Path+'");';
	content += 'so.addVariable("title", "'+title+'");';
	content += 'so.write("container"); }catch(e){ location.reload() } ';
	content += '<\/script>';
	content += '<\/body><\/html>';
	doc.write( content );

	audioWindow.focus( );
}

function winClose(){
	window.close();
	return false;
}

/**
* get user id from location.href
* 
* @return userId or null
*/
function getUserId(){
	var param = location.href;
	var matches = param.match('/?userId=([0-9]+)');
	if(matches && matches.length>=2){
		return matches[1];
	}else{
		return null;
	}
}
/**
* send satistics on server
*
* @param type - type of media text, video, audio
*/
function saveStatistics(type){
	if(!userId || !type) return;
	var url = endPoint+"type="+type+"/userId="+userId+"/";
	//var url = './ajaxTest.php';
	new Ajax.Request(url, {
		method: 'get',
		onSuccess: function(transport){ 
			// return js code var status = false/true; and alert(error);
			eval(transport.responseText);
			if(status){ //success
				//alert('success');
			}else{
				//alert(transport.responseText);
			}
		},
		onFailure: function(transport){
			alert(transport);
		}
	});
}
	
/**
* Add to url user id and go
*
* @param url - requre url
*/
function goUrl(url){
	if(url){
		location.href = (userId) ? url+"?userId="+userId : location.href = url;
	}
}
	
/**
* window on init handler. sand statistics by type text
*/
function init(){
	saveStatistics('text'); 
}
/*   initialization   */
var endPoint = '/backend/reference/statistics/state=saveStatisticsJs/';
var userId = getUserId();
window.onload = init;
