<?php
require_once 'util/netutil.php';

function isJSON($string) {
 json_decode($string);
 return (json_last_error() == JSON_ERROR_NONE);
}

$url = null;
$params = array();

//
if(array_key_exists('ibio-url', $_GET) && array_key_exists('callback', $_GET)){
	$url = rawurldecode($_GET['ibio-url']);
}else{
	echo json_encode(array('ret' => 0, 'message' => 'ibio-url and callback needed'));
}

if($url){
	foreach ($_GET as $key => $value){
		//ibio-url: default target url
		if($key != 'ibio-url' && $key != 'callback'){
			$params[$key] = $value;
		}
	}
	$response = NetUtil::curlRequest($url, $params);	
	//a valid json & included a callback parameter
	if(isJSON($response)){
	    header('Content-Type: text/javascript; charset=utf8');
	    header('Access-Control-Allow-Origin: http://us.ibio8.com/');
	    header('Access-Control-Max-Age: 3628800');
	    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
	    $callback = $_GET['callback'];
	    echo $callback.'('.$response.');';
	}else{
	    echo json_encode(array('ret' => 0, 'message' => 'not an valid json'));
	}
}