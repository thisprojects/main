<?php

session_start();

?>

<!doctype HTML>
<html>
<body>
<?php
    
    if (!$_SESSION["poster"]){
        

        die("Please Login");
    }
    ?>
    
    
    
   <form action="page2.php" method="post">

    <input type="submit" name="submit" value="logout">

</form>   
    <p>You entered   <?php
        
        if ($_POST["submit"]){
            
            echo $_POST["submit"]; 
            
            $_SESSION["poster"] = array();
        } else {
            
        
        
        
        echo $_SESSION["poster"]; }?> </p>
    
    
    <a href="index.php">Index</a>
    
    
    
    
    
    
    
</body>





</html>

      
      