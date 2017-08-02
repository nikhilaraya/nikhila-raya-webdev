(function () {

    angular
        .module("WamApp")
        .controller("profileController", profileController)

    function profileController($routeParams, userService,$location) {
        var model = this;
        var userId = $routeParams["userId"];

        model.updateUser = updateUser;
        model.unRegister = unRegister;

        function init() {
            userService.findUserById(userId)
                .then(function (response) {
                    model.user = response.data;
                });
        }
        init();

        function updateUser(user) {
            userService.updateUser(user._id, user)
                .then(function () {
                model.message = "user has been updated";
            })
        }

        function unRegister(userid) {
            userService.deleteUser(userid).then(function () {
                $location.url("/");
            },function () {
                model.message = "could not unregister! Please try again";
            })
        }
    }

})();