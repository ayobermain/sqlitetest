var db = null;

var example = angular.module('starter', ['ionic'])
    .run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            if(window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if(window.StatusBar) {
                StatusBar.styleDefault();
            }
            // db = $cordovaSQLite.openDB({ name: "my.db" });
            // $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS people (id integer primary key, firstname text, lastname text)");
            document.addEventListener("deviceready", onDeviceReady, false);
            function onDeviceReady() {
                alert('deviceready');
             db = window.sqlitePlugin.openDatabase("Database", "1.0", "Demo", -1);
             db.transaction(populateDB, errorCB, successCB);
            }
            function populateDB(tx) {
             tx.executeSql('DROP TABLE IF EXISTS test_table');
             tx.executeSql('CREATE TABLE IF NOT EXISTS test_table (id integer primary key, data1 text, data2 integer, svgImage text)');
             tx.executeSql('INSERT INTO test_table (data1, data2, svgImage) VALUES (?,?,?)', ['test1', 100, '<svg version="1.1" x="0px" y="0px" width="100px" height="100px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve"><rect x="4.815" y="4.815" fill="#039BF9" stroke="" width="100" height="100"></svg>']);
             tx.executeSql("INSERT INTO test_table (data1, data2, svgImage) VALUES (?,?,?)", ['test2', 200, '<svg version="1.1" x="0px" y="0px" width="100px" height="100px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve"><rect x="4.815" y="4.815" fill="#039BF9" stroke="" width="100" height="100"></svg>']);
             queryDB(tx);
            }
            // form the query
            function queryDB(tx) {
             tx.executeSql("SELECT id, data1, data2, svgImage from test_table;", [], querySuccess, errorCB);
            }
            // Display the results
            function querySuccess(tx, results) {
             var len = results.rows.length;
             alert("results.rows.length: " + results.rows.length + " [should be 2]");
            }
            // Transaction error callback
            function errorCB(err) {
                console.log("Erroressing SQL: " + err.code);
            }
            // Success error callback
            function successCB() {
            }
        });
    });

example.controller("ExampleController", function($scope) {

    $scope.insert = function(firstname, lastname) {
        // var query = "INSERT INTO people (firstname, lastname) VALUES (?,?)";
        // $cordovaSQLite.execute(db, query, [firstname, lastname]).then(function(res) {
        //     // console.log("INSERT ID -> " + res.insertId);
        //     alert("INSERT ID -> " + res.insertId);
        // }, function (err) {
        //     // console.error(err);
        //     alert(err);

        // });
        alert(firstname);
    }

    $scope.select = function(lastname) {
        alert(lastname);
        /*var query = "SELECT firstname, lastname FROM people WHERE lastname = ?";
        $cordovaSQLite.execute(db, query, [lastname]).then(function(res) {
            if(res.rows.length > 0) {
                alert("SELECTED -> " + res.rows.item(0).firstname + " " + res.rows.item(0).lastname);
                console.log("SELECTED -> " + res.rows.item(0).firstname + " " + res.rows.item(0).lastname);
            } else {
                alert("No results found");
                console.log("No results found");
            }
        }, function (err) {
            alert(err);
            console.error(err);
        });*/
    }

});
