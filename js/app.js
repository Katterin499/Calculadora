var calculadora = {
	
	visor: document.getElementById("display"),
	vrpant: "0",
	operacion: "",
	primvr: 0,
	segvr: 0,
	ultvr: 0,
	resultado: 0,
	auxTeclaIgual: false,
	
	init: (function(){
		this.asignarEventosFormatoBotones(".tecla");
		this.asignarEventosaFuncion();
	}),
	
	
	asignarEventosFormatoBotones: function(selector){
		var x = document.querySelectorAll(selector);
		for (var i = 0; i<x.length;i++) {
			x[i].onmouseover = this.eventoAchicaBoton;
			x[i].onmouseleave = this.eventoVuelveBoton;
		};
	},

	eventoAchicaBoton: function(event){
		calculadora.AchicaBoton(event.target);
	},

	eventoVuelveBoton: function(event){
		calculadora.AumentaBoton(event.target);
	},
	
	
	AchicaBoton: function(elemento){
		var x = elemento.id;
		if (x=="1" || x=="2" || x=="3" || x=="0" || x=="igual" || x=="punto" ) {
			elemento.style.width = "28%";
			elemento.style.height = "62px";
		} else if(x=="mas") {
			elemento.style.width = "88%";
			elemento.style.height = "98%";
		} else {
		elemento.style.width = "21%";
		elemento.style.height = "62px";
		}
	},
	
	AumentaBoton: function(elemento){
		var x = elemento.id;
		if (x=="1" || x=="2" || x=="3" || x=="0" || x=="igual" || x=="punto" ) {
			elemento.style.width = "29%";
			elemento.style.height = "62.91px";
		} else if(x=="mas") {
			elemento.style.width = "90%";
			elemento.style.height = "100%";
		} else {
		elemento.style.width = "22%";
		elemento.style.height = "62.91px";
		}
	},
	
	asignarEventosaFuncion: function(){
		document.getElementById("0").addEventListener("click", function() {calculadora.ingresoNumero("0");});
		document.getElementById("1").addEventListener("click", function() {calculadora.ingresoNumero("1");});
		document.getElementById("2").addEventListener("click", function() {calculadora.ingresoNumero("2");});
		document.getElementById("3").addEventListener("click", function() {calculadora.ingresoNumero("3");});
		document.getElementById("4").addEventListener("click", function() {calculadora.ingresoNumero("4");});
		document.getElementById("5").addEventListener("click", function() {calculadora.ingresoNumero("5");});
		document.getElementById("6").addEventListener("click", function() {calculadora.ingresoNumero("6");});
		document.getElementById("7").addEventListener("click", function() {calculadora.ingresoNumero("7");});
		document.getElementById("8").addEventListener("click", function() {calculadora.ingresoNumero("8");});
		document.getElementById("9").addEventListener("click", function() {calculadora.ingresoNumero("9");});
		document.getElementById("on").addEventListener("click", function() {calculadora.borrarVisor();});
		document.getElementById("sign").addEventListener("click", function() {calculadora.cambiarSigno();});
		document.getElementById("punto").addEventListener("click", function() {calculadora.ingresoDecimal();});
		document.getElementById("igual").addEventListener("click", function() {calculadora.verResultado();});
		document.getElementById("raiz").addEventListener("click", function() {calculadora.ingresoOperacion("raiz");});
		document.getElementById("dividido").addEventListener("click", function() {calculadora.ingresoOperacion("/");});
		document.getElementById("por").addEventListener("click", function() {calculadora.ingresoOperacion("*");});
		document.getElementById("menos").addEventListener("click", function() {calculadora.ingresoOperacion("-");});
		document.getElementById("mas").addEventListener("click", function() {calculadora.ingresoOperacion("+");});
	},
	
	borrarVisor: function(){ 

	    this.vrpant = "0";
		this.operacion = "";
		this.primvr = 0;
		this.segvr = 0;
		this.resultado = 0;
		this.Operación = "";
		this.auxTeclaIgual = false;
		this.ultvr = 0;
		this.updateVisor();
	},
	
	cambiarSigno: function(){
		if (this.vrpant !="0") {
			var aux;
			if (this.vrpant.charAt(0)=="-") {
				aux = this.vrpant.slice(1);
			}	else {
				aux = "-" + this.vrpant;
			}
		this.vrpant = "";
		this.vrpant = aux;
		this.updateVisor();
		}
	},
	
	ingresoDecimal: function(){
		if (this.vrpant.indexOf(".")== -1) {
			if (this.vrpant == ""){
				this.vrpant = this.vrpant + "0.";
			} else {
				this.vrpant = this.vrpant + ".";
			}
			this.updateVisor();
		}
	},
	
	ingresoNumero: function(valor){
		if (this.vrpant.length < 8) {
		
			if (this.vrpant=="0") {
				this.vrpant = "";
				this.vrpant = this.vrpant + valor;
			} else {
				this.vrpant = this.vrpant + valor;
			}
		this.updateVisor();
		}
	},
	
	ingresoOperacion: function(oper){
		this.primvr = parseFloat(this.vrpant);
		this.vrpant = "";
		this.operacion = oper;
		this.auxTeclaIgual = false;
		this.updateVisor();
	},
	
	verResultado: function(){

		if(!this.auxTeclaIgual){ 
			this.segvr = parseFloat(this.vrpant);
			this.ultvr = this.segvr;
			this.realizarOperacion(this.primvr, this.segvr, this.operacion);
		
		} else {
			this.realizarOperacion(this.primvr, this.ultvr, this.operacion);
		}
	
		this.primvr = this.resultado;
		this.vrpant = "";
	
		if (this.resultado.toString().length < 9){
			this.vrpant = this.resultado.toString();
		} else {
			this.vrpant = this.resultado.toString().slice(0,8) + "...";
		}
	
		this.auxTeclaIgual = true;		
		this.updateVisor();
	
	},
	
	realizarOperacion: function(primvr, segvr, operacion){
		switch(operacion){
			case "+": 
				this.resultado = eval(primvr + segvr);
			break;
			case "-": 
				this.resultado = eval(primvr - segvr);
			break;
			case "*": 
				this.resultado = eval(primvr * segvr);
			break;
			case "/": 
				this.resultado = eval(primvr / segvr);
			}
	},
	
	updateVisor: function(){
		this.visor.innerHTML = this.vrpant;
	}
	
};

calculadora.init();