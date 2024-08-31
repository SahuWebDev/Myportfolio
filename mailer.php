<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use Dotenv\Dotenv;

require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';
require 'vendor/autoload.php';

// Load the .env file
$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

$responseMessage = '';
$responseType = '';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $messageContent = htmlspecialchars($_POST['message']);

    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host = $_ENV['SMTP_HOST'];   
        $mail->SMTPAuth = true;
        $mail->Username = $_ENV['SMTP_USER'];
        $mail->Password = $_ENV['SMTP_PASS'];
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port = $_ENV['SMTP_PORT'];

        $mail->setFrom($email, $name);
        $mail->addAddress('ashishakumarsahu@gmail.com');

        $mail->isHTML(false);
        $mail->Subject = "New Contact Form Submission from $name";
        $mail->Body    = "Name: $name\nEmail: $email\n\nMessage:\n$messageContent";

        $mail->send();

        $responseMessage = 'Your message has been sent successfully!';
        $responseType = 'success';
    } catch (Exception $e) {
        $responseMessage = "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
        $responseType = 'error';
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Form Response</title>
    <style>
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
        }
        .response-container {
            text-align: center;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            background-color: #fff;
            width: 300px;
        }
        .response-container h1 {
            font-size: 24px;
            margin-bottom: 10px;
        }
        .response-container p {
            font-size: 18px;
            margin-bottom: 20px;
        }
        .success {
            color: #28a745;
        }
        .error {
            color: #dc3545;
        }
    </style>
</head>
<body>
    <div class="response-container <?php echo $responseType; ?>">
        <h1><?php echo $responseMessage; ?></h1>
        <p>You will be redirected to the homepage shortly.</p>
    </div>

    <script>
        setTimeout(function() {
            window.location.href = "index.html"; // Replace with your homepage URL
        }, 4000);
    </script>
</body>
</html>
