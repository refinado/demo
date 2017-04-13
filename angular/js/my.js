
   var App = angular.module("my-app",['ngRoute']);

      App.service('changeName', function() {  //自定义服务
          this.myFunc = function (x) {
                console.log(x);
            }
      }); 
      App.config(['$routeProvider', function($routeProvider){
          $routeProvider
              .when('/',{template:'这是首页页面'})
              .when('/computers',{template:'这是电脑分类页面'})
              .when('/printers',{template:'这是打印机页面'})
              .otherwise({redirectTo:'/'});
      }]);
      App.controller("mycontrol",function($scope,$http,changeName){
       	 $scope.add = "增加";
         $scope.cg = "查询";
       	 $scope.person={
       	 	name:"lee",
       	 	age:15,
       	 	sex:"nan"
         	}
          changeName.myFunc($(".cg").val());
         	$scope.persons = [{
                  id:"1",
                  name:"zhansan",
                  age:17,
                  sex:"nan"
         	},{
             id:"2",
         	 	 name:"lisi",
         	 	 age:18,
         	 	 sex:"nv"

         	},{   id:"3",
                name:"wanger",
                age:13,
                sex:"nan"
         	}];
         	$scope.addPerson = function(){
              var  name = $("#na").val();
              var  age = $("#ag").val();
              var  sex = $("#se").val();
              var obj = {
                id: Math.random()*10,
                name:name,
                age:age,
                sex:sex
              }
              $scope.persons.push(obj);
         	}
          $scope.del = function(id){
            $scope.persons = _.filter($scope.persons,function(item){
              return item.id != id;
            })
          }
          $scope.cha = function(){
            var name = $("#na").val();
            $scope.persons = _.filter($scope.persons,function(item){
              if(name == item.name){
                  return name ==item.name;
              }
            })
          }
          //查询数据 添加到表格
         $http.get("database/data.json").then(function(res){
         	$scope.persons.push(res.data);
         },function(res){
         	alert(1);
         })
        $scope.changeInfo = function(){
        	 var nameTest = $(".changeInfo").val(); 
        	 console.log(nameTest);
        	_.each($scope.persons,function(item){
        		if(item.id == 1008611){
        			item.name = nameTest;
        		}
        	})
        }
      });
