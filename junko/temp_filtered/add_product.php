<?php
	session_start();
	
	if (!isset($_SESSION["admin"])){
		header("location:login.php");
	}
	$admin_data=$_SESSION["admin"];
    echo "00000";
    if(isset($_POST["submit"])){
        echo "11111";

        $desc=$_POST["desc"];
        $prix=$_POST["prix"];
        $fullURL = 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
        $target_file = "uploads/" . time() . basename($_FILES["img"]["name"]);
        $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
        $check = getimagesize($_FILES["img"]["tmp_name"]);
        if($check !== false) {
            echo "File is an image - " . $check["mime"] . ".";
         $uploadOk = 1;
        } else {
            echo "File is not an image.";
            $uploadOk = 0;
        }
        if (file_exists($target_file)) {
            echo "Sorry, file already exists.";
            $uploadOk = 0;
        }
        if ($_FILES['img']["size"] > 500000) {
            echo "Sorry, your file is too large.";
            $uploadOk = 0;
        }
        if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif" ) {
            echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
            $uploadOk = 0;
        }
        if ($uploadOk == 0) {
            echo "Sorry, your file was not uploaded.";
        // if everything is ok, try to upload file
        } else {
        echo "image uploaded";

            if (move_uploaded_file($_FILES["img"]["tmp_name"],$target_file)) {
        echo "3333";

                try {
                    $conn = new PDO("mysql:host=localhost;dbname=proja_db","root", "");
                    // set the PDO error mode to exception
                    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                    // =:opt1 another methode
                    $stmt=$conn->prepare("INSERT INTO `produit` (`img_prod`, `prix_prod`, `desc_prod`, `id_admin`) VALUES (?,?,?,?)");
                    $adm=$_SESSION["admin"];
                    $stmt->execute(array(
                        "admin/".$target_file,
                        $prix,
                        $desc,
                        $admin_data["id_user"]
                    ));
                    echo "The file ". htmlspecialchars( basename( $_FILES["img"]["name"])). " has been uploaded.";
                    print_r($result);  
                  } catch(PDOException $e) {
                    echo "Connection failed: " . $e->getMessage();
                  }
            } else {
                echo "Sorry, there was an error uploading your file.";
            }
        }
    }
	

		include 'includes/sidebar.php';

	?>

	<!-- 
		tache il add product
	-->
    <head>
<!-- Bootstrap Dropzone CSS -->
        <link href="vendors/dropify/dist/css/dropify.min.css" rel="stylesheet" type="text/css"/>
    </head>
    <div class="content-body" style="min-height: 656px;">
    <div class="container-fluid">
    <div class="row page-titles mx-0">
                    <div class="col-sm-6 p-md-0">
                        <div class="welcome-text">
                            <h4>Hi, welcome back!</h4>
                            <span>Element</span>
                        </div>
                    </div>
                    <div class="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="javascript:void(0)">Form</a></li>
                            <li class="breadcrumb-item active"><a href="javascript:void(0)">Element</a></li>
                        </ol>
                    </div>
                </div>
                <div class="row">
                <div class="col-xl-12 col-lg-12">
                        <div class="card">
                            <div class="card-header">
                                <h4 class="card-title">Input Style</h4>
                            </div>
                            <div class="card-body">
                                <div class="basic-form">
                                    <form enctype="multipart/form-data" action="" method="POST">
                                    <div class="dropify-errors-container"><ul></ul></div>
                                    <div class="form-group">
                                        <div class="input-group">
                                            <div class="custom-file">
                                                <input type="file" class="custom-file-input" name="img">
                                                <label class="custom-file-label">Image de Prod</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                            <div class="form-row">

                                                <div class="col-sm-6 ">
                                                    <input type="text" class="form-control" placeholder="Saisir le prix" name="prix">
                                                </div>
                                                <div class="col-sm-6">
                                                    <input type="text" class="form-control" placeholder="Saisir le nom" name="prix">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <textarea class="form-control" rows="4" name="desc" id="comment" placeholder="Description...."></textarea>
                                        </div>
                                        <div class="form-group">
                                             <div class="input-group">
                                                 <button  type="submit" name="submit" class="btn btn-danger btn-lg btn-block" >Submit</button>
                                            </div>
                                        </div>
                                     </form>
                                    </div>
                            </div>
                          
                        </div>
					</div>

</div>
</div>
</div>






        <!--**********************************
            Footer start
        ***********************************-->
        <div class="footer">
            <div class="copyright">
                <p>Copyright © Designed &amp; Developed by <a href="http://dexignzone.com/" target="_blank">DexignZone</a> 2021</p>
            </div>
        </div>
        <!--**********************************
            Footer end
        ***********************************-->

		<!--**********************************
           Support ticket button start
        ***********************************-->

        <!--**********************************
           Support ticket button end
        ***********************************-->


    </div>
    <!--**********************************
        Main wrapper end
    ***********************************-->

    <!--**********************************
        Scripts
    ***********************************-->
    <!-- Required vendors -->
    <script src="./vendor/global/global.min.js"></script>
	<script src="./vendor/bootstrap-select/dist/js/bootstrap-select.min.js"></script>
    <script src="./js/custom.min.js"></script>
	<script src="./js/deznav-init.js"></script>
	<!-- Apex Chart -->
	<script src="./vendor/apexchart/apexchart.js"></script>
	
	
	<!-- Dashboard 1 -->
	<script src="./js/dashboard/dashboard-1.js"></script>
	
	
    
</body>
<script src="vendors/dropify/dist/js/dropify.min.js"></script>

</html>