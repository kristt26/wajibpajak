angular.module('adminctrl', [])
    .controller('pageController', pageController)
    .controller('profileController', profileController)
    ;
function pageController($scope) {
    $scope.Title = "Page Header";
}
function profileController($scope) {
    $scope.title = "Profile Header";
}