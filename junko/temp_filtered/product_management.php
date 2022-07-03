<?php
    session_start();
    if (!isset($_SESSION["admin"])){
        header("location:login.php");
    }
    $admin_data=$_SESSION["admin"];
    include "includes/sidebar.php";
    try{
        $conn=new PDO("mysql:host=localhost;dbname=proja_db","root","");
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stm=$conn->prepare("SELECT * FROM PRODUIT");
        $res=$stm->fetchAll();
        $res=$res[0];

    }catch(PDOException $e) {
        echo "Connection failed: " . $e->getMessage();
      }
?>
        <div class="content-body">
            <!-- row -->
			<div class="container-fluid">
                    <div class="col-lg-12">
                        <div class="card">
                            <div class="card-header">
                                <h4 class="card-title">PRODUCTS</h4>
                                <!-- <h4 id="table">{{informations}}</h4> -->
                            </div>
                            <div class="card-body">
                                <div id="table" class="table-responsive">
                                    <table  class="table table-responsive-md">
                                        <thead>
                                            <tr>
                                                <th style="width:50px;">
													<div class="custom-control custom-checkbox checkbox-success check-lg mr-3">
														<input type="checkbox" class="custom-control-input" id="checkAll" required="">
														<label class="custom-control-label" for="checkAll"></label>
													</div>
												</th>
                                                <th><strong>Prod Id</strong></th>
                                                <th><strong>NAME</strong></th>
                                                <th><strong>Date</strong></th>
                                                <th><strong>Prix</strong></th>
                                                <th><strong>Status</strong></th>
                                            </tr>
                                            
                                        </thead>
                                        <tbody>
                                            <tr v-for="info in informations">
                                                <td>
													<div class="custom-control custom-checkbox checkbox-success check-lg mr-3">
														<input type="checkbox" class="custom-control-input" id="customCheckBox2" required="">
														<label class="custom-control-label" for="customCheckBox2"></label>
													</div>
												</td>
                                                <td><strong>{{info.id_prod}}</strong></td>
                                                <td><div class="d-flex align-items-center"><img :src=info.img_prod class="rounded-lg mr-2" width="24" alt=""> <span class="w-space-no">{{info.name_prod}}</span></div></td>
                                                <td>{{info.add_date}}	</td>
                                                <td>{{info.prix_prod}} DT</td>
                                                <td><div class="d-flex align-items-center"><i class="fa fa-circle text-success mr-1"></i> Successful</div></td>
                                                <td>
													<div class="d-flex">
														<a href="#" class="btn btn-primary shadow btn-xs sharp mr-1"><i class="fa fa-pencil"></i></a>
														<a href="#" class="btn btn-danger shadow btn-xs sharp"><i class="fa fa-trash"></i></a>
													</div>
												</td>
                                            </tr>
											
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
</div>
</div>
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

      <!-- link Vue -->
	<script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
    <!--  link axios-->
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
	<!-- Dashboard 1 -->
	<script src="./js/dashboard/dashboard-1.js"></script>
    <script src="./js/dashboard/product_managment_api.js"></script>

	
	
    
</body>
</html>