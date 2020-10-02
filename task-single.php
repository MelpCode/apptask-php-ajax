<?php include('basedatos.php')?>
<?php 
    if(isset($_POST['id'])){
        $Id = $_POST['id'];
        $query = "SELECT * FROM task WHERE id = $Id";
        $result = mysqli_query($connection,$query);
        if(!$result){
            die("Query Failed");
        }
        $json = array();
        while($row=mysqli_fetch_array($result)){
            $json[] = array(
                'name'=>$row['name'],
                'description'=>$row['description'],
                'id'=> $row['id']
            );
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
        }
?>