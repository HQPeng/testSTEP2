<?php 
$name=$_POST['name'];
$password=$_POST['password'];

$link=mysqli_connect('localhost:3307' , 'root' , 'root' , 'study');
$sql="SELECT * FROM `usermessage` WHERE `name`='$name' AND `password`='$password' ";
$sql1="INSERT INTO `usermessage` VALUES('237' ,'2www24' ,'33')";
$res=mysqli_query($link , $sql1);
$data = mysqli_fetch_all($res, MYSQLI_ASSOC);

if(count($data)){
    echo json_encode(array(
        "message"=>"成功",
        "res"=>$data,
        "code"=>1
    ));
}
else{
    echo json_encode(array(
        "message"=>"失败"
        
    ));
}

?>