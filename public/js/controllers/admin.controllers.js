angular.module('adminctrl', [])
    .controller('homeController', homeController)
    .controller('loginController', loginController)
    .controller('profileController', profileController)
    .controller('petugasController', petugasController)
    .controller('wajibPajakController', wajibPajakController)
    .controller('contentWajibPajakController', contentWajibPajakController)
    .controller('categoriController', categoriController)
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

function wajibPajakController($scope, helperServices, WajibPajakServices) {
    $scope.itemHeader = { title: "Wajib Pajak", breadcrumb: "Wajib Pajak", header: "Wajib Pajak" };
    $scope.$emit("SendUp", $scope.itemHeader);
    $scope.datas = [];
    $scope.model = {};
    $scope.simpan = true;
    var akhir = { lat: -2.585888, lng: 140.668497 };
    googleMap = new GoogleMap(12, akhir);
    WajibPajakServices.get().then(x => {
        $scope.datas = x;
        $.LoadingOverlay("hide");
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
            $scope.kategoris = x;
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
}
function contentWajibPajakController($scope, helperServices, WajibPajakServices, KategoriServices) {
    $scope.itemHeader = { title: "Wajib Pajak", breadcrumb: "Wajib Pajak", header: "Wajib Pajak" };
    $scope.sexs = helperServices.sex;
    $scope.$emit("SendUp", $scope.itemHeader);
    $scope.datas = [];
    $scope.model = {};
    $scope.model.usaha = {};
    $scope.kategoris = [];
    $scope.simpan = true;
    var akhir = { lat: -2.585888, lng: 140.668497 };
    googleMap = new GoogleMap(12, akhir);
    if (parseInt(helperServices.getParam())) {
        WajibPajakServices.getDetail(helperServices.getParam()).then(x => {
            $scope.model = x;
            console.log(x);

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
}
function categoriController($scope, helperServices, WajibPajakServices, KategoriServices) {
    $scope.itemHeader = { title: "Jenis Usaha", breadcrumb: "Jenis Usaha", header: "Jenis Usaha" };
    $scope.$emit("SendUp", $scope.itemHeader);
    $scope.datas = [];
    $scope.model = {};
    $scope.marker = helperServices.marker;
    $scope.simpan = true;
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