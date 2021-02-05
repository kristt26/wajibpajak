<div ng-controller="homeController">
  <div class="row">
    <div class="col-md-7">
      <div class="row">
        <div class="col-lg-4 col-6">
          <!-- small box -->
          <div class="small-box bg-info">
            <div class="inner">
              <h3><?=$result->pengguna?></h3>

              <p>Total Pengguna</p>
            </div>
            <div class="icon">
              <i class="ion ion-android-person"></i>
            </div>
            <a href="<?=base_url('petugas')?>" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
          </div>
        </div>
        <!-- ./col -->
        <div class="col-lg-4 col-6">
          <!-- small box -->
          <div class="small-box bg-success">
            <div class="inner">
              <h3><?=$result->kategori?></h3>

              <p>Kategori</p>
            </div>
            <div class="icon">
              <i class="ion ion-android-list"></i>
            </div>
            <a href="<?=base_url('kategori')?>" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
          </div>
        </div>
        <!-- ./col -->
        <div class="col-lg-4 col-6">
          <!-- small box -->
          <div class="small-box bg-warning">
            <div class="inner">
              <h3><?=$result->usaha?></h3>

              <p>Total Usaha</p>
            </div>
            <div class="icon">
              <i class="ion ion-bag"></i>
            </div>
            <a href="<?=base_url('wajibpajak')?>" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
          </div>
        </div>
        <!-- ./col -->
        <!-- ./col -->
      </div>
    </div>
    <div class="col-md-5">
      <h3 class="text-center">SISTEM PENDATAAN WAJIB PAJAK</h3>
      <p class="text-justify" style="margin-left:20px; margin-right:20px;">Sistem ini diperuntukkan bagi petugas Dinas Pendapatan Kota Jayapura untuk dapat mendata wajib pajak yang terdapat pada Kota Jayapura. Sistem ini memiliki fitur antara lain:</p>
      <ul>
        <li>Manajemen Data Petugas</li>
        <li>Manajemen Data Kategori Usaha</li>
        <li>Manajemen Data Wajib Pajak</li>
        <li>Manajemen Laporan</li>
      </ul>
    </div>
  </div>
</div>
