<?php include('basedatos.php')?>
<?php 
    $id = $_POST['id'];
    $task =  $_POST['task'];
    $description = $_POST['description'];

    $query = "UPDATE task SET name = '$task', description = '$description' WHERE id = $id";
    $result = mysqli_query($connection,$query);
    if(!$result){
            die("Query Failed");
    }
    echo "Task Updated Successfully";
?>