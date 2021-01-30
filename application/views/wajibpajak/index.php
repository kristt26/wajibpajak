<div class="row" ng-controller="wajibPajakController" ng-init="Init()">
  <div class="col-md-12">

  </div>
  <div class="col-md-12">
    <div class="card card-warning">
      <div class="card-header">
        <h3 class="card-title"><i class="fas fa-th-list"></i>&nbsp;&nbsp; MAP</h3>
        <?php if ($this->session->userdata('role') == 'Petugas'): ?>
        <div class="card-tools">
          <a href="<?=base_url('wajibpajak/content')?>" class="btn btn-primary btn-sm">Tambah</a>
        </div>
        <?php endif;?>
      </div>
      <!-- /.card-header -->
      <div class="card-body">
        <div class="row">
          <div class="col-md-5">
            <div class="form-group row">
              <label for="" class="col-sm-2 col-form-label col-form-label-sm">Distrik</label>
              <div class="col-sm-7">
                <select class="form-control form-control-sm" ng-options="item as item for item in distrik"
                  ng-model="itemdistrik" ng-change=filterMarker()>
                </select>
              </div>
            </div>
          </div>
          <div class="col-md-7">
            <div class="form-group row">
              <label for="" class="col-sm-2 col-form-label col-form-label-sm">Kategori Usaha</label>
              <div class="col-sm-8">
                <div class="custom-control custom-checkbox custom-control-inline" ng-repeat="item in kategoris">
                  <input class="custom-control-input custom-control-input-danger custom-control-input-outline" type="checkbox" id="inlineCheckbox{{item.id}}" ng-model="item.checked" ng-change=filterMarker()>
                  <label class="custom-control-label" for="inlineCheckbox{{item.id}}">{{item.kategori}}</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="map-panel">
          <input id="pac-input" class="controls" type="text" placeholder="Search Box" />
          <div id="map">&#160;</div>
          <div id="directions-panel"></div>
        </div>
      </div>
      <div class="card-header">
        <h3 class="card-title"><i class="fas fa-th-list"></i>&nbsp;&nbsp; List Wajib Pajak</h3>
        <!-- <div class="card-tools">
          <a href="<?=base_url('wajibpajak/content')?>" class="btn btn-primary btn-sm">Tambah</a>
        </div> -->
      </div>
      <div class="card-body table-responsive p-0">
        <table class="table table-sm table-hover table-head-fixed text-nowrap">
          <thead>
            <tr>
              <th>No</th>
              <th>NIK</th>
              <th>Nomor Wajib Pajak</th>
              <th>Nama</th>
              <th>Jenis Kelamin</th>
              <th>Alamat</th>
              <th>Telepon</th>
              <th>Email</th>
              <th>Nama Usaha</th>
              <th><i class="fas fa-cog"></i></th>
            </tr>
          </thead>
          <tbody>
            <tr ng-repeat="item in datas">
              <td>{{$index+1}}</td>
              <td>{{item.nik}}</td>
              <td>{{item.nowajibpajak}}</td>
              <td>{{item.nama}}</td>
              <td>{{item.jk}}</td>
              <td><span class="tag tag-success">{{item.alamat}}</span></td>
              <td>{{item.kontak}}</td>
              <td>{{item.email}}</td>
              <td>{{item.usaha.nama}}</td>
              <td>
                <!-- <a href="javascript:void()" class="btn btn-info btn-sm" ng-click="showMap(item)"><i
                    class="fas fa-eye"></i></a> -->
                <a href="<?=base_url('wajibpajak/content/')?>{{item.id}}" class="btn btn-warning btn-sm"><i
                    class="fas fa-edit"></i></a>
              </td>
            </tr>
          </tbody>
        </table>

      </div>
      <!-- /.card-body -->
    </div>
  </div>
  <div class="modal fade" id="detail">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Detail Wajib Pajak</h4>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div id="map-panel">
            <input id="pac-input" class="controls" type="text" placeholder="Search Box" />
            <div id="map"></div>
            <div id="directions-panel"></div>
          </div>
        </div>
        <div class="modal-footer justify-content-between">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>
      <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
  </div>
</div>
<style>
  #map-panel {
    height: auto;
    justify-content: space-between;
    align-items: stretch;
    /* margin-bottom: -400px; */
  }

  #map-panel>#map {
    margin: 0 auto;
    width: 100%;
    background-color: red;
    min-height: 500px;
    height: 100%;
  }

  #map-panel>#directions-panel {
    clear: both;
    width: 25%;
    height: 100%;
    margin: 10px 0 0 0;
    font-size: 11px;
    line-height: normal;
    /* height: 395px; */
    overflow: auto;
    /* max-width: 300px;
    height: 100%; */
  }

  .pac-card {
    margin: 10px 10px 0 0;
    border-radius: 2px 0 0 2px;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    outline: none;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
    background-color: #fff;
    font-family: Roboto;
  }

  #pac-container {
    padding-bottom: 12px;
    margin-right: 12px;
  }

  .pac-controls {
    display: inline-block;
    padding: 5px 11px;
  }

  .pac-controls label {
    font-family: Roboto;
    font-size: 13px;
    font-weight: 300;
  }

  #pac-input {
    background-color: #fff;
    font-family: Roboto;
    font-size: 15px;
    font-weight: 300;
    margin-left: 12px;
    padding: 0 11px 0 13px;
    text-overflow: ellipsis;
    width: 400px;
  }

  #pac-input:focus {
    border-color: #4d90fe;
  }

  #title {
    color: #fff;
    background-color: #4d90fe;
    font-size: 25px;
    font-weight: 500;
    padding: 6px 12px;
  }

  #target {
    width: 345px;
  }

  .label-marker {
    font-weight: bold;
    font-size: 13px;
    text-align: center;
  }

  .label-marker.blue {
    background-color: rgb(23, 75, 247);
  }

  .label-marker.green {
    background-color: #58D400;
  }

  .label-marker.orange {
    background-color: orange;
  }

  .label-marker.pink {
    background-color: rgb(231, 83, 211);
  }

  .label-marker.purple {
    background-color: purple;
  }

  .label-marker.red {
    background-color: #D80027;
    color: #fff;
  }

  .label-marker.yellow {
    background-color: #FCCA00;
  }
</style>