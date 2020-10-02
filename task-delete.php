<?php include('basedatos.php')?>
<?php 
    if(isset($_POST['id'])){
        $Id = $_POST['id'];
        $query = "DELETE FROM task WHERE id = $Id";
        $result = mysqli_query($connection,$query);
        if(!$result){
            die("Query Failed");
        }
        echo "Task Deleted Successfully";
    }
?>