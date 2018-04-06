function Pizza(size, toppings){
  this.size = size;
  this.toppings = toppings;
}

Pizza.prototype.finalCost = function(){
  return this.size + this.toppings.length;
}

$(document).ready(function(){
  $("#formOne").submit(function(event){
    event.preventDefault();
    var inputtedSize = parseInt($("#size").val());
    var inputtedToppings = [];
    $("input:checkbox[name=toppings]:checked").each(function(){
      inputtedToppings.push($(this).val());
    });
    console.log(inputtedSize);
    console.log(inputtedToppings);
    var newPizza = new Pizza(inputtedSize, inputtedToppings);
    console.log("$" + newPizza.finalCost());
    $("#output").text("Your pizza is $" + newPizza.finalCost());
  });
});
