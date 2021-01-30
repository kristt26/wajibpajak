angular.module('adminctrl', [])
    .controller('homeController', homeController)
    .controller('loginController', loginController)
    .controller('profileController', profileController)
    .controller('petugasController', petugasController)
    .controller('wajibPajakController', wajibPajakController)
    .controller('contentWajibPajakController', contentWajibPajakController)
    .controller('categoriController', categoriController)
    .controller('laporanController', laporanController)
    ;
function homeController($scope) {
    $scope.Title = "Page Header";
    $scope.$emit("SendUp", "Home");
    $.LoadingOverlay("hide");
}
function loginController($scope, AuthService, helperServices) {
    $scope.model = {};

    $scope.login = () => {
        AuthService.login($scope.model).then(x => {
            if (x.id) {
                location.href = helperServices.url + "/home";
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Information',
                    text: 'Username tidak ditemukan'
                })
            }
        })
    }

}
function profileController($scope) {
    $scope.title = "Profile Header";
}

function petugasController($scope, helperServices, PetugasServices) {
    $scope.itemHeader = { title: "Petugas", breadcrumb: "Petugas", header: "Petugas" };
    $scope.$emit("SendUp", $scope.itemHeader);
    $scope.datas = [];
    $scope.model = {};
    $scope.simpan = true;
    PetugasServices.get().then(x => {
        $scope.datas = x;
        $.LoadingOverlay("hide");
    })
    $scope.edit = (item) => {
        $scope.model = angular.copy(item);
        $scope.simpan = false;
    }
    $scope.save = () => {
        $.LoadingOverlay("show");
        $scope.model.roles = helperServices.roles;
        if ($scope.model.id) {
            PetugasServices.put($scope.model).then(result => {
                Swal.fire({
                    icon: 'info',
                    title: 'Information',
                    text: "Proses Berhasil",
                    allowOutsideClick: false
                })
                $scope.model = {};
                $scope.simpan = true;
                $.LoadingOverlay("hide");
            })
        } else {
            PetugasServices.post($scope.model).then(result => {
                Swal.fire({
                    icon: 'info',
                    title: 'Information',
                    text: "Proses Berhasil",
                    allowOutsideClick: false
                })
                $scope.model = {};
                $scope.simpan = true;
                $.LoadingOverlay("hide");
            })
        }
    }
}

function wajibPajakController($scope, helperServices, WajibPajakServices, KategoriServices) {
    $scope.itemHeader = { title: "Wajib Pajak", breadcrumb: "Wajib Pajak", header: "Wajib Pajak" };
    $scope.$emit("SendUp", $scope.itemHeader);
    $scope.datas = [];
    $scope.model = {};
    $scope.distrik=[];
    $scope.simpan = true;
    $scope.itemdistrik = 'All';
    var akhir = { lat: -2.585888, lng: 140.668497 };
    googleMap = new GoogleMap(12, akhir, "roadmap");
    WajibPajakServices.get().then(x => {
        $scope.datas = x;
        $scope.setMarker($scope.datas);
    })
    $scope.edit = (item) => {
        $scope.model = angular.copy(item);
        $scope.simpan = false;
    }
    $scope.save = () => {
        $scope.model.roles = helperServices.roles;
        if ($scope.model.id) {
            WajibPajakServices.put($scope.model).then(result => {

            })
        } else {
            WajibPajakServices.post($scope.model).then(result => {

            })
        }
    }
    $scope.showMap = (item) => {

        var pos = { lat: parseFloat(item.usaha.lat), lng: parseFloat(item.usaha.long) };
        const contentString =
            '<div id="content">' +
            '<div id="siteNotice">' +
            '<h4 id="firstHeading" class="firstHeading">' + item.usaha.nama + '</h4>' +
            '<div id="bodyContent">' +
            '<div class="col-md-12">' +
            "<p>Pemilik: " + item.nama + "</p></br>" +
            "<p>NIK: " + item.nik + "</p></br>" +
            "<p>No Wajib Pajak: " + item.nowajibpajak + "</p></br>" +
            "<p>Telepon: " + item.kontak + "</p></br>" +
            "<p>Email: " + item.email + "</p></br>" +
            "<p>Alamat Usaha" + item.usaha.alamat + "</p></br>" +
            "</div>" +
            "</div>";
        googleMap = new GoogleMap(15, pos);
        googleMap.setMarker(pos, item.nama, null, null, contentString);
        $("#detail").modal("show");
    }
    $scope.Init = () => {
        // googleMap.setMarker(akhir);
        googleMap.showdata = $scope.show;
        KategoriServices.get().then(x => {
            $scope.distrik.push('All');
            helperServices.distrik.forEach(element => {
                $scope.distrik.push(element);
            });
            x.forEach(element => {
             element.checked = true;   
            });
            $scope.kategoris = x;
        })
        // googleMap.setMarkerLabel(null);
    };
    
    $scope.filterMarker = ()=>{
        console.log($scope.kategoris);
        var data = angular.copy($scope.datas);
        var setData = $scope.itemdistrik == 'All' ? data : data.filter(x=>x.usaha.distrik==$scope.itemdistrik);
        var setitem = [];
        $scope.kategoris.forEach(element => {
            if(element.checked){
                setData.forEach(itemdata => {
                    if(itemdata.usaha.kategoriid == element.id){
                        setitem.push(itemdata);
                    }
                });
            }
        });
        // console.log();
        googleMap = new GoogleMap(12, akhir, "roadmap");
        $scope.setMarker(setitem);
        // googleMap.clearMaker();
    }
    $scope.setMarker = (data) => {
        
        data.forEach(element => {
            var pos = { lat: parseFloat(element.usaha.lat), lng: parseFloat(element.usaha.long) };
              const contentString =
                '<div class="col-md-12">'+
                        '<div class="card-body pb-0">'+
                            '<div class="row d-flex align-items-stretch">'+
                                '<div class="col-12 d-flex align-items-stretch">'+
                                    '<div class="card">'+
                                        '<div class="card-header text-muted border-bottom-0">'+
                                            element.usaha.nama+
                                        '</div>'+
                                        '<div class="card-body pt-0">'+
                                            '<div class="row">'+
                                                '<div class="col-7">'+
                                                    '<h2 class="lead"><b>Pemilik ' + element.nama + '</b></h2>'+
                                                    '<p class="text-muted text-sm"><b>Jenis Usaha. </b>' + element.usaha.kategori.kategori + '</p>'+
                                                    '<ul class="ml-4 mb-0 fa-ul text-muted">'+
                                                        '<li class="small"><span class="fa-li"><i class="fas fa-lg fa-building"></i></span>Alamat. '+ element.usaha.alamat +'</li>'+
                                                        '<li class="small"><span class="fa-li"><i class="fas fa-lg fa-phone"></i></span> Phone. ' +element.kontak+ '</li>'+
                                                    '</ul>'+
                                                '</div>'+
                                                '<div class="col-5 text-center">'+
                                                    '<img src="'+ helperServices.url + '/public/img/foto/' + element.usaha.gambar + '" alt="user-avatar" style="width:100%" class="img-fluid">'+
                                                '</div>'+
                                            '</div>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                '</div>';
              googleMap.setMarker(pos, element.nama, helperServices.url+'/public/img/marker/'+element.usaha.kategori.marker+'.png', null, contentString, element.usaha.kategori.kategori,element.usaha.kategori.marker);
        });
        var infoWindow = new google.maps.InfoWindow;
        googleMap.setCurrentPosition();
        googleMap.showdata = $scope.show;
        $.LoadingOverlay("hide");
    };

    $scope.show = (item) => {
        $scope.$apply(x => {
            $scope.model.usaha.alamat = item.alamat;
            $scope.model.usaha.lat = item.location.lat;
            $scope.model.usaha.long = item.location.lng;
            // $("#modal-map").modal('hide');
        })
    }
}
function contentWajibPajakController($scope, helperServices, WajibPajakServices, KategoriServices) {
    $scope.itemHeader = { title: "Wajib Pajak", breadcrumb: "Wajib Pajak", header: "Wajib Pajak" };
    $scope.sexs = helperServices.sex;
    $scope.$emit("SendUp", $scope.itemHeader);
    $scope.datas = [];
    $scope.model = {};
    $scope.distrik = helperServices.distrik;
    $scope.model.usaha = {};
    $scope.kategoris = [];
    $scope.simpan = true;
    var akhir = { lat: -2.585888, lng: 140.668497 };
    googleMap = new GoogleMap(12, akhir);
    // const urlParams = new URLSearchParams(window.location.search);
    if (parseInt(document.URL.substring(document.URL.lastIndexOf('/') + 1))) {
        WajibPajakServices.getDetail(helperServices.getParam()).then(x => {
            $scope.model = x;
            $scope.model.usaha.jumlahpegawai = parseInt($scope.model.usaha.jumlahpegawai);
            $scope.model.usaha.distrik = $scope.distrik.find(itemdistrik=>itemdistrik == $scope.model.usaha.distrik);
            $scope.simpan = false;
            console.log($scope.model.usaha);
        })
    }
    $scope.edit = (item) => {
        location.href = helperServices.url + "/wajibpajak/content/" + item.id;
    }
    $scope.save = () => {
        if ($scope.model.id) {
            WajibPajakServices.put($scope.model).then(result => {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Proses Berhasil'
                })
                location.href = helperServices.url + "/wajibpajak";
            })
        } else {
            WajibPajakServices.post($scope.model).then(result => {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Proses Berhasil'
                })
                location.href = helperServices.url + "/wajibpajak";
            })
        }
    }
    $scope.showMap = () => {
        $("#modal-map").modal("show");
    }
    $scope.Init = () => {
        // googleMap.setMarker(akhir);
        googleMap.showdata = $scope.show;
        KategoriServices.get().then(x => {
            $scope.kategoris = x;
            $.LoadingOverlay("hide");
        })
    };
    // $scope.Init = () => {
    //     googleMap.showdata = $scope.show;
    // };

    $scope.show = (item) => {
        $scope.$apply(x => {
            $scope.model.usaha.alamat = item.alamat;
            $scope.model.usaha.lat = item.location.lat;
            $scope.model.usaha.long = item.location.lng;
            $("#modal-map").modal('hide');
        })
    }
    $scope.logFile= (item)=>{
        console.log(item);
    }
}
function categoriController($scope, helperServices, WajibPajakServices, KategoriServices) {
    $scope.itemHeader = { title: "Jenis Usaha", breadcrumb: "Jenis Usaha", header: "Jenis Usaha" };
    $scope.$emit("SendUp", $scope.itemHeader);
    $scope.datas = [];
    $scope.model = {};
    $scope.marker = helperServices.marker;
    $scope.simpan = true;
    // var akhir = { lat: -2.585888, lng: 140.668497 };
    // googleMap = new GoogleMap(12, akhir);
    KategoriServices.get().then(x => {
        $scope.datas = x;
        $.LoadingOverlay("hide");
    })
    $scope.edit = (item) => {
        $scope.model = angular.copy(item);
        $scope.simpan = false;
    }
    $scope.save = () => {
        $.LoadingOverlay("show");
        if ($scope.model.id) {
            KategoriServices.put($scope.model).then(result => {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Proses Berhasil',
                    allowOutsideClick: false
                })
                $scope.model = {};
                $scope.simpan = true
                $.LoadingOverlay("hide");
            })
        } else {
            KategoriServices.post($scope.model).then(result => {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Proses Berhasil'
                })
                $scope.model = {};
                $scope.simpan = true
                $.LoadingOverlay("hide");
            })
        }
    }
}
function laporanController($scope, LaporanServices) {
    $scope.datas = [];
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('set') == 'tempat') {
        $scope.itemHeader = { title: "Laporan Tempat Usaha", breadcrumb: "Laporan", header: "Laporan" };
        $scope.$emit("SendUp", $scope.itemHeader);
        $.LoadingOverlay("hide");
    }else{
        $scope.itemHeader = { title: "Laporan Rekapitulasi", breadcrumb: "Laporan", header: "Laporan" };
        $scope.$emit("SendUp", $scope.itemHeader);
        $.LoadingOverlay("hide");
    }
    $scope.print = () => {
        $("#print").printArea();
    }
}