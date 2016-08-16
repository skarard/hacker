/*
*(c) Copyright 2011 Simone Masiero. Some Rights Reserved. 
*This work is licensed under a Creative Commons Attribution-Noncommercial-Share Alike 3.0 License
*/

jQuery(
	function(){
		jQuery( document ).keydown(
			function ( event ) { 
					Typer.addText( event ); //Capture the keydown event and call the addText, this is executed on page load
			}
		);
	}
);

var Typer={
	text:null,
	consoleUpdate:null,
	progressUpdate:null,
	antiHackUpdate:null,
	compileUpdate:null,
	noAntiHack:false,
	isCutScene:false, //Disable Keyboard Input
	progress:100, //progress bar
	index:0, // current cursor position
	speed:2, // speed of the Typer
	file:"", //file, must be setted
	antiHackStart:50, //percent of antiHack starting
	antiHackDifficulty: 40, // time is ms up antiHack update
	init: function(){// inizialize Hacker Typer
		consoleUpdate=setInterval(function(){Typer.updLstChr();},500); // console updater for cursor
		progressUpdate=setInterval(function(){Typer.progressUpdate();}, 100); // progress bar updater
		jQuery.get(Typer.file,function(data){// get the text file
			Typer.text=data;// save the textfile in Typer.text
		});
	},
	
	content:function(){
		return jQuery("#console").html();// get console content
	},
	
	write:function(str){// append to console content
		jQuery("#console").append(str);
		return false;
	},
	
	makeAccess:function(){//create Access Granted popUp
		Typer.hidepop(); // hide all popups
		var access=jQuery(".access");
		access.addClass("Granted"); // add class to the div
		access.html("<h1>VIRUS QUARANTINED</h1>"); // set content of div
		clearInterval(progressUpdate);
		clearInterval(antiHackUpdate);
		Typer.isCutScene=true;

		return false;
	},

	makeDenied:function(){//create Access Denied popUp
		Typer.hidepop(); // hide all popups
		var access=jQuery(".access");
		access.addClass("Denied");// add class to the div
		access.html("<h1>VIRUS OVERWHȩ̵͖̩̙̰̘͖̳͓͖͙͓̻̗̯̫̋ͯ̍̾̌ͮ̈́ͧ̉̓̊ͤ̌ͪͦ̈ͣ̊͡ļ̤͚̤̹͚̻̼̫̠̙̻̟͙̣̒͛͒͋ͣ̇͂͐̈͂ͥ̾̓́̕m̋͊͗̽ͪ̓ͥ͆̚҉̵̠͙̖̥̪̯̭͍̦̕͢͠ę̹͕͚̪̫̬͇̪͉̣͇͇̲̹͚̿̽ͭ̐ͧ͐̇̆̔̑̔͛d̷̔̇̈́́̐ͣ̏͋̽̍ͯͧͭ̂̏҉̵͈̰͉̹</h1>");// set content of div
		clearInterval(progressUpdate);
		clearInterval(antiHackUpdate);
		Typer.isCutScene=true;
		setTimeout(function(){ jQuery("#giphy").css({'display' :'block'}); }, 1500);
		setTimeout(function(){ jQuery("#giphy").fadeIn(20).fadeOut(20).fadeIn(100).fadeOut(150).fadeIn(250).fadeOut(20).fadeIn(100).fadeOut(120).fadeIn(400);}, 1500);
		return false;
	},

	hidepop:function(){// remove all existing popups
		var access=jQuery(".access");
		access.removeClass ("Granted");
		access.removeClass ("Denied");
	},

	resetHacking:function() {
		Typer.hidepop();
	},
	
	addText:function(key){// main function to add the code
		if ( !Typer.isCutScene ) {
			if ( Typer.progress == Typer.antiHackStart && !Typer.noAntiHack ) {
				antiHackUpdate=setInterval(function(){ Typer.antiHackUpdate(); }, Typer.antiHackDifficulty);// inisialise timer for progress bar
				Typer.noAntiHack = true;
			};
			if ( Typer.progress <= 100 && Typer.progress > 0 ) {
				Typer.progress--;
			};
			if(key.keyCode==27){ // key 27 = esc key
				Typer.hidepop(); // hide all popups
			}else if(Typer.text){ // otherway if text is loaded
 				Typer.outputtext('#console', key);
			}
			if(Typer.progress == 0) {
				Typer.makeAccess();
				jQuery("#progressbar").css({'height': '0%'});
				Typer.index=0;
				compileUpdate=setInterval(function(){Typer.compile();},20); // console updater for cursor
			}
			if ( key.preventDefault && key.keyCode != 122 ) { // prevent F11(fullscreen) from being blocked
				key.preventDefault()
			};  
			if(key.keyCode != 122){ // otherway prevent keys default behavior
				key.returnValue = false;
			}
		}
	},

	outputtext:function(box, key){
		var cont=Typer.content(); // get the console content
		if(cont.substring(cont.length-1,cont.length)=="|") // if the last char is the blinking cursor
			jQuery(box).html(jQuery(box).html().substring(0,cont.length-1)); // remove it before adding the text
			//if(key.keyCode!=8){ // if key is not backspace
				Typer.index+=Typer.speed;	// add to the index the speed
			//}else{
			//	if(Typer.index>0) // else if index is not less than 0 
			//		Typer.index-=Typer.speed;//	remove speed for deleting text
			//}
			var text=jQuery("<div/>").text(Typer.text.substring(0,Typer.index)).html();// parse the text for stripping html enities
			var rtn= new RegExp("\n", "g"); // newline regex
			var rts= new RegExp("\\s", "g"); // whitespace regex
			var rtt= new RegExp("\\t", "g"); // tab regex
			jQuery(box).html(text.replace(rtn,"<br/>").replace(rtt,"&nbsp;&nbsp;&nbsp;&nbsp;").replace(rts,"&nbsp;"));// replace newline chars with br, tabs with 4 space and blanks with an html blank
	//		window.scrollBy(0,50); // scroll to make sure bottom is always visible
			jQuery(box).scrollTo('+=50px', 0);
	},

	compile:function(){
		Typer.outputtext('#compile', null);
		jQuery("#compilewrap").css({'display': 'block'});
	},

	progressUpdate:function(){
		jQuery("#progressbar").css({'height': Typer.progress + '%'});
	},

	antiHackUpdate:function() {
		if ( Typer.progress < 100 && Typer.progress > 0 ) {
			Typer.progress++;
		};
		if ( Typer.progress == 100 ) {
			Typer.makeDenied();
			clearInterval(progressUpdate);
			clearInterval(antiHackUpdate);
			jQuery("#progressbar").css({'height': '100%'});
		}
	},
	
	updLstChr:function(){ // blinking cursor
		var cont=this.content(); // get console 
		if(cont.substring(cont.length-1,cont.length)=="|") // if last char is the cursor
			jQuery("#console").html(jQuery("#console").html().substring(0,cont.length-1)); // remove it
		else
			this.write("|"); // else write it
	}
}