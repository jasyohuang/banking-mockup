<?php 
 
include 'config.php';
 
error_reporting(0);
 
session_start();
 
if (isset($_SESSION['name'])) {
    header("Location: index.php");
}
 
if (isset($_POST['submit'])) {
    $email = $_POST['email'];
    $password = md5($_POST['password']);
 
    $sql = "SELECT * FROM users WHERE email='$email' AND password='$password'";
    $result = mysqli_query($conn, $sql);
    if ($result->num_rows > 0) {
        $row = mysqli_fetch_assoc($result);
        $_SESSION['name'] = $row['name'];
        header("Location: index.php");
    } else {
        echo "<script>alert('Wrong Email or Password, maybe you need to relax a bit.')</script>";
    }
}
 
?>
 
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
 
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
 
    <link rel="stylesheet" type="text/css" href="css/style.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    <title>Login :)</title>
</head>
<body>
    <div class="container">
        <form action="" method="POST" class="login-email" id="my-login-form">
            <h1>Login</h1>
            <div class="form-outline mb-4">
                <input type="email" class="form-control csu-username" id="email" placeholder="Email" name="email" value="<?php echo $email; ?>" required>
            </div>
            <div class="form-outline mb-4">
                <input class="form-control csu-password" id="password" type="password" placeholder="Password" name="password" value="<?php echo $_POST['password']; ?>" required>
            </div>
            <div class="form-outline mb-4">
                <button name="submit" class="btn btn-primary btn-block mb-4">Login</button>
            </div>
            <p class="login-register-text">No Account? <a href="register.php">Register</a></p>
        </form>
    </div>
</body>
</html>