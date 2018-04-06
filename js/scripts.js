function Pizza(size, toppings){
  this.size = size;
  this.sizeCost = 0;
  this.toppings = toppings;
}

function Address(street, city, state, zipcode){
  this.street = street;
  this.city = city;
  this.state = state;
  this.zipcode = zipcode;
}

Pizza.prototype.getSizeCost = function(){
  if(this.size === "Small"){
      this.sizeCost = 8;
  } else if(this.size === "Medium"){
    this.sizeCost = 10;
  } else if(this.size === "Large"){
    this.sizeCost = 12;
  } else{
    this.sizeCost = 14;
  }
}

Pizza.prototype.finalCost = function(){
  return this.sizeCost + this.toppings.length;
}

var orderCounter = 1;
var deliveryCharge = 0;

$(document).ready(function(){
  $("#pickup").click(function(){
    $("#formPizza").show();
    $("#selector").hide();
  });
  $("#delivery").click(function(){
    $("#formDelivery").show();
    $("#selector").hide();
  });
  $("#formDelivery").submit(function(event){
    event.preventDefault();
    var inputtedStreet = $("#street").val();
    var inputtedCity = $("#city").val();
    var inputtedState = $("#state").val();
    var inputtedZipcode = $("#zipcode").val();
    var newAddress = new Address(inputtedStreet, inputtedCity, inputtedState, inputtedZipcode);
    deliveryCharge = 3;
    $(".addressLine1").text(newAddress.street);
    $(".addressLine2").text(newAddress.city + ", " + newAddress.state + ", " + newAddress.zipcode);
    $("#formPizza").show();
    $("#formDelivery").hide();
  });
  $("#formPizza").submit(function(event){
    event.preventDefault();
    var inputtedSize = $("#size").val();
    var inputtedToppings = [];
    $("input:checkbox[name=toppings]:checked").each(function(){
      inputtedToppings.push($(this).val());
    });
    var newPizza = new Pizza(inputtedSize, inputtedToppings);
    newPizza.getSizeCost();
    // $("#output").text("Your pizza is $" + newPizza.finalCost());
    $("ul#pizzas").append("<li><span class='pizza'>order " + orderCounter + "</span></li>");
    $(".pizza").last().click(function(){
      $("#show-pizza").show();
      $(".size").text(newPizza.size);
      $(".total-cost").text(newPizza.finalCost() + deliveryCharge);
      if(newPizza.toppings.length === 0){
        newPizza.toppings.push("None");
      }
      $(".toppings").text(newPizza.toppings.join(", "));
    });
    orderCounter++;
  });
});
