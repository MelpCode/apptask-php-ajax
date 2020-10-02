<?php include('basedatos.php')?>
<?php 
    if(isset($_POST['task'])){
        $task = $_POST['task'];
        $description = $_POST['description'];
        $query = "INSERT INTO task (name,description) VALUES ('$task','$description')";
        $result = mysqli_query($connection,$query);
        if(!$result){
            die("Query Failed");
        }
        echo "Task Added Successfully";
    }
?>