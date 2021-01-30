angular.module('apps', [
    'adminctrl',
    'helper.service',
    'auth.service',
    'services',
    'ngLocale',
    'ui.utils.masks',
    'naif.base64'
])
    .controller('indexController', function ($scope) {
        $scope.titleHeader = "SI Wajib Pajak";
        $scope.header = "";
        $scope.breadcrumb = "";
        

        $scope.$on("SendUp", function (evt, data) {
            $scope.title = data.title;
            $scope.header = data.header;
            $scope.breadcrumb = data.breadcrumb;
        });
    });
