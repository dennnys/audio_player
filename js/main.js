var chant = false;
var playerActive = 0;
var chantInfinite = false;
var trak = 1;

$(document).ready(function() { 

	$(".audio1").on("click", function(){
		var player = document.getElementById("Player1");
		stopAll();
		playStop(player,1);
	});

	$(".audio2").on("click", function(){
		var player = document.getElementById("Player2");
		stopAll();
		playStop(player,2);
	});

	$(".audio3").on("click", function(){
		var player = document.getElementById("Player3");
		stopAll();
		playStop(player,3);
	});

	$(".audio4").on("click", function(){
		var player = document.getElementById("Player4");
		stopAll();
		playStop(player,4);
	});

	function animassionDisk(x) {
		if (x == 0) {
			$('#rotateDisc1').removeClass("ratateActive");
			$('#rotateDisc2').removeClass("ratateActive");
			$('#rotateDisc3').removeClass("ratateActive");
			$('#rotateDisc4').removeClass("ratateActive");

		};
		if (x == 1) $('#rotateDisc1').addClass("ratateActive");
		if (x == 2) $('#rotateDisc2').addClass("ratateActive");
		if (x == 3) $('#rotateDisc3').addClass("ratateActive");
		if (x == 4) $('#rotateDisc4').addClass("ratateActive");
	};

	function stopAll() {
		$("#audio_container audio").each(function(){
			$(this)[0].pause();
			$(this)[0].currentTime = 0;
			animassionDisk(0);
			chant = false;
			chantInfinite = false;
		});
	};

	function playStop(IDplayer, IDactive) {
		if (playerActive == IDactive) {
			chant = false;
			playerActive = 0;
			stopAll();
		} else {
				if (chant && playerActive != IDactive){
					stopAll();
					IDplayer.play();
					playerActive = IDactive;
					animassionDisk(IDactive);
				} else {
					playerActive = IDactive;
					IDplayer.play();
					chant = true;
					animassionDisk(IDactive);
				}
			}
	};

// VOLUM
	$("#volum").on("change", function(){
		var volumSete = $("#volum").val()/100;
		$("audio.player").each(function(){
			this.volume = volumSete;
		});
	});
// end VOLUM

// UPDATE
	function udateNidle(nidlePosition, nidleUpdate) {
		if (nidlePosition.currentTime >= nidlePosition.duration) {
			nidleUpdate.css('transform', 'rotate(0deg)');
			animassionDisk(0);
			chant = false;
			playerActive = 0;
		} else {
				var deg = 18 + 24 * nidlePosition.currentTime / nidlePosition.duration;
				deg = deg.toFixed(2);
				var degString = 'rotate('+deg+'deg)';
				nidleUpdate.css('transform', degString);
		}
	}

	var playerG1 = document.getElementById("Player1");
	$(playerG1).bind('timeupdate',function(){
		var nidle = $('#acul1');
		udateNidle(this, nidle);
		if (playerActive != 1) nidle.css('transform', 'rotate(0deg)');
	});

	var playerG2 = document.getElementById("Player2");
	$(playerG2).bind('timeupdate',function(){
		var nidle = $('#acul2');
		udateNidle(this, nidle);
		if (playerActive != 2) nidle.css('transform', 'rotate(0deg)');
	});

	var playerG3 = document.getElementById("Player3");
	$(playerG3).bind('timeupdate',function(){
		var nidle = $('#acul3');
		udateNidle(this, nidle);
		if (playerActive != 3) nidle.css('transform', 'rotate(0deg)');
	});

	var playerG4 = document.getElementById("Player4");
	$(playerG4).bind('timeupdate',function(){
		var nidle = $('#acul4');
		udateNidle(this, nidle);
		if (playerActive != 4) nidle.css('transform', 'rotate(0deg)');
	});
// end UPDATE

// TOUS  / ALEATOIRES / STOP(RESET)
	function playTous() { //Chante tous le chanson PAS aleatoir
		var player1 = document.getElementById("Player1");
		var player2 = document.getElementById("Player2");
		var player3 = document.getElementById("Player3");
		var player4 = document.getElementById("Player4");

		stopAll();

		chant = true;
		player1.play();
		animassionDisk(1);
		playerActive = 1;

		$(player1).bind('timeupdate',function(){
			if (player1.currentTime >= player1.duration) {
				player2.play();
				animassionDisk(0);
				animassionDisk(2);
				playerActive = 2;
			}
		});

		$(player2).bind('timeupdate',function(){
			if (player2.currentTime >= player2.duration) {
				player3.play();
				animassionDisk(0);
				animassionDisk(3);
				playerActive = 3;
			}
		});

		$(player3).bind('timeupdate',function(){
			if (player3.currentTime >= player3.duration) {
				player4.play();
				animassionDisk(0);
				animassionDisk(4);
				playerActive = 4;
			}
		});

		$(player4).bind('timeupdate',function(){
			if (player4.currentTime >= player4.duration) {
				player1.play();
				animassionDisk(0);
				animassionDisk(1);
				playerActive = 1;
			}
		});
	};

	function playTrak(x) {
		var player1 = document.getElementById("Player1");
		var player2 = document.getElementById("Player2");
		var player3 = document.getElementById("Player3");
		var player4 = document.getElementById("Player4");
		if (x == 1) player1.play();
		if (x == 2) player2.play();
		if (x == 3) player3.play();
		if (x == 4) player4.play();
	};

	function random() {
		var aux = 1 + Math.floor(Math.random() * 4);
		return aux;
	};

	function playAleatoir() {
		var player1 = document.getElementById("Player1");
		var player2 = document.getElementById("Player2");
		var player3 = document.getElementById("Player3");
		var player4 = document.getElementById("Player4");

		stopAll();

		chant = true;
		trak = random();
		playTrak(trak);
		animassionDisk(trak);
		playerActive = trak;

		$(player1).bind('timeupdate',function(){
			if (player1.currentTime >= player1.duration && trak == 1) {
				trak = random();
				playTrak(trak);
				animassionDisk(0);
				animassionDisk(trak);
				playerActive = trak;
			}
		});

		$(player2).bind('timeupdate',function(){
			if (player2.currentTime >= player2.duration && trak == 2) {
				trak = random();
				playTrak(trak);
				animassionDisk(0);
				animassionDisk(trak);
				playerActive = trak;
			}
		});

		$(player3).bind('timeupdate',function(){
			if (player3.currentTime >= player3.duration && trak == 3) {
				trak = random();
				playTrak(trak);
				animassionDisk(0);
				animassionDisk(trak);
				playerActive = trak;
			}
		});

		$(player4).bind('timeupdate',function(){
			if (player4.currentTime >= player4.duration && trak == 4) {
				trak = random();
				playTrak(trak);
				animassionDisk(0);
				animassionDisk(trak);
				playerActive = trak;
			}
		});

	};

	$("#Tous").on("click", function(){
				var player = document.getElementById("Player1");
				if (!chantInfinite) {
					chantInfinite =true;
					playTous();
				}
			});

	$("#Aleatoire").on("click", function(){
				var player = document.getElementById("Player1");
				if (!chantInfinite) {
					chantInfinite =true;
					playAleatoir();
				}
			});

	$("#Reset").on("click", function(){
				stopAll();
				chantInfinite = false;
				console.log("stop");
			});

});