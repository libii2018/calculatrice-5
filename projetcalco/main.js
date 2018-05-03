function calculator()
{
	that=this,
	this.field="input#number",
	this.bouton="body .bouton"
	this.init=false,

	this.run=function(){
      
      console.log("loaded!");
      $(this.bouton).click(function(){
           var value=$(this).html();

           if (that.init==false) {
           	$(that.field).val("");
           	that.init=true;
           }
           if (value!="=")
            $(that.field).val($(that.field).val()+ value);

        that.dispatcher(value);
      });
	},
	this.dispatcher=function(value)
	{
           if ($(this.field).val().indexof("/")!=-1)
           	this.operation(value, "/");
           f ($(this.field).val().indexof("*")!=-1)
           	this.operation(value, "*");
           	f ($(this.field).val().indexof("-")!=-1)
           	this.operation(value, "-");
           	f ($(this.field).val().indexof("+")!=-1)
           	this.operation(value, "+");
	},

	this.operation=function(value,symbol)
	{
      var  numbers=$(this.field).val().split(symbol),
      result;

      if (symbol=="/") 
       result=numbers[0]/numbers[1];
   if (symbol=="*") 
       result=numbers[0]*numbers[1];
   if (symbol=="-") 
       result=numbers[0]-numbers[1];
   if (symbol=="+") 
       result=parsefloat(numbers[0])+parsefloat(numbers[1]);

   result=math.round((result)*100)/100;

   if (numbers.length>1) {
   	if (value=="=") 
   		$(this.field).val(result);
   }


	};
} 