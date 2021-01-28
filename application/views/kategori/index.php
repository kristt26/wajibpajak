<div class="row" ng-controller="categoriController">
  <div class="col-md-5">
    <div class="card card-warning">
      <div class="card-header">
        <h3 class="card-title"><i class="fas fa-plus-square fa-1x" ></i>&nbsp;&nbsp; Input Kategori</h3>
      </div>
      <!-- /.card-header -->
      <div class="card-body">
        <form role="form" ng-submit="save()">
          <div class="form-group row">
            <label for="nip"  class="col-md-3 col-form-label col-form-label-sm">Kategori</label>
            <div class="col-md-9">
                <input type="text" class="form-control  form-control-sm" id="nip" ng-model="model.kategori" placeholder="Jenis Usaha">
            </div>

          </div>
          <div class="form-group row">
            <label for="marker" class="col-md-3 col-form-label col-form-label-sm">Marker Color</label>
            <div class="col-md-9">
                <select class="form-control  form-control-sm marker" id="marker" ng-model="model.marker">
                  <option value=""></option>
                  <option value="blue">Blue</option>
                  <option value="green">Green</option>
                  <option value="orange">Orange</option>
                  <option value="pink">Pink</option>
                  <option value="purple">Purple</option>
                  <option value="red">Red</option>
                  <option value="yellow">Yellow</option>
                </select>
            </div>

          </div>
          <div class="form-group d-flex justify-content-end">
            <button type="submit" class="btn btn-primary btn-sm pull-right">{{simpan ? 'Simpan': 'Ubah'}}</button>
          </div>
        </form>
      </div>
      <!-- /.card-body -->
    </div>
  </div>
  <div class="col-md-7">
    <div class="card card-warning">
      <div class="card-header">
        <h3 class="card-title"><i class="fas fa-th-list"></i>&nbsp;&nbsp; List Kategori</h3>
      </div>
      <!-- /.card-header -->
      <div class="card-body table-responsive p-0" style="height: 500px;">
        <table class="table table-sm table-hover table-head-fixed text-nowrap">
          <thead>
            <tr>
              <th>No</th>
              <th>Kategori</th>
              <th>Marker</th>
              <th><i class="fas fa-cog"></i></th>
            </tr>
          </thead>
          <tbody>
            <tr ng-repeat="item in datas">
              <td>{{$index+1}}</td>
              <td>{{item.kategori}}</td>
              <td><img ng-src="<?=base_url('public/img/marker/')?>{{item.marker | lowercase}}.png" alt=""></td>
              <td>
                <button type="button" class="btn btn-warning btn-sm" ng-click ="edit(item)"><i class="fas fa-edit"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- /.card-body -->
    </div>
  </div>
</div>
