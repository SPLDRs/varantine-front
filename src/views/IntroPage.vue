
<template>
  <div id="app">
		<div id="navbar">
            <div id="nav">
            <a href="#overview"><div id="overviewbutton">
                Overview
                </div></a>
            <a href="#team"><div id="overviewbutton">
                Team
                </div></a>
                <div class="clearfloat"></div>
            </div>      
            <div class="clearfloat"></div>
		</div>
		<div id="intro">
      <h1>Varantine</h1>
			<p id="p1">Connect with your special loved one; Overlap two faraway houses</p>
			<p id="p2">Get flipped when you are at the "same" place at home</p> 
			<div id="introbuttons">
				<a href=""><div id="signup">Sign Up</div></a>
				<a href=""><div id="signin">Sign In</div></a>
				<div class="clearfloat"></div>
			</div>
		</div>
		<div id="overview">
      <h1>Overview</h1>
      <div id="goal">
        <p class="p3">Because of the coronavirus, a lot of couples cannot go out and be with each other :(</p>
        <p class="p0">Varantine are here to help better connect</p>
        <p class="p3">♥ two seperated loved ones ♥</p>
        <p class="p3">Even though you are faraway in two houses</p>
        <p class="p3">you can still be at the same place together</p>
        <p class="p0"><strong>What you need to do:</strong></p>
        <p class="p3">1. Choose your house design</p>
        <p class="p3">2. Match with ♥ your loved one ♥</p>
        <p class="p3">-> See where you and your loved one at </p>
        <p class="p3">-> Phone buzzes when you are at the same place (bed, kitchen etc.)</p>
      </div>
    </div>
    <div id="team">
    <h1 id="t">Team</h1>
    <div id="m">
      <div id="m1">
        <img id="pic1" src = '../assets/img/cathy.png'>
        <p class="p5">Cathy Zhuang (calthaz)</p>
      </div>
      <div id="m2">
        <img id="pic2" src = '../assets/img/violet.png'>
        <p class="p5">Violet Guo</p>
      </div>
      <div id="m3">
        <img id="pic3" src = '../assets/img/catina.png'>
        <p class="p5">Catina Xie</p>
      </div>
      <div id="m4">
        <img id="pic4" src = '../assets/img/alice.png'>
        <p class="p5">Alice Shi</p>
      </div>
      <div id="m5">
        <img id="pic5" src = '../assets/img/michael.png'>
        <p class="p5">Michael</p>
      </div>
      <div class="clearfloat"></div>
    </div>
  </div>
  </div>
</template>
<script>
export default {
}
</script>

.<style lang="css">
		body {
			margin: 0;
            padding:0;
            height:100%;
            width:100%;
			background-color:pink;
		}	
		#navbar {
			background-color:pink;
			width: 100%;
			height: 60px;
            position: fixed;
            top: 0;
        
		}
		#nav {
            height: 60px;
            width: 100%;
            position: fixed;
            left: 10px;
            top: 0;
		}
        #overviewbutton {
            height: 60px;
            width: 100px;
            float: left;
            color: black;
            text-decoration: none;
            line-height: 60px;

        }
        #teambutton {
            height: 60px;
            width: 100px;
            float: left;
            color: black;
            text-decoration: none;
            line-height: 60px;
        }
        #app {
        margin: 0;
        padding: 0;
        }
		#intro {
			height: 700px;
			text-align: left;
			padding-top: 110px;
			background-image: url('../assets/img/lovehouse.jpg');
          background-size: 1400px;
          background-position: center;
          background-repeat:  no-repeat;			
            /* margin-top: -30px; */
            width: 100%;
            margin-top: -60px;
		}
		h1 {
			margin-top: 0px;
			font-size: 60pt;
            font-family: 'Gotu', sans-serif;
            text-align: center;
		}
		#introbuttons {
			width: 500px;
			height:50px;
			margin-top: 30px;
			margin-left: auto;
            margin-right: auto;
      font-family: 'Gotu', sans-serif;
		}
		#signup {
			width: 200px;
			height: 50px;
			background-color: pink;
			float: left;
			line-height: 50px;
			text-decoration: none;
			color:black;
      text-align: center;
		}
		#signin {
			width: 200px;
			height: 50px;
			background-color:pink;
			float: left;
			margin-left: 100px;
			line-height: 50px;
			text-decoration: none;
			color: black;
      text-align: center;
		}
		.clearfloat {
			clear: both;
		}
    .p0 {
        margin-top: 10px;
        font-size: 10pt;
      font-family: 'Gotu', sans-serif;
      text-align: left;
      margin-bottom: 0px;
    }
    #p1 {
      font-size: 15pt;
      margin-top: 330px;
      margin-bottom: 0px;
      font-family: 'Gotu', sans-serif;
      text-align: center;
    }
    #p2 {
      font-size: 15pt;
      margin-top: 0px;
      font-family: 'Gotu', sans-serif;
      text-align: center;
      margin-bottom: 0px;
    }

		#overview {
			height: 550px;
			text-align: left;
			padding-top: 70px;
			background-color: pink;
      background-size: 1400px;
      background-position: center;
      background-repeat:  repeat-y;
      margin-bottom: 0px;
            width: 80%;
            padding-left: 10%;
            padding-right: 10%;
		}
    .p3 {
      font-size: 10pt;
      margin-top: 0px;
      font-family: 'Gotu', sans-serif;
      text-align: left;
      margin-bottom: 0px;
    }
    .p4 {
      font-size: 10pt;
      margin-top: 0px;
      font-family: 'Gotu', sans-serif;
      text-align: left;
      margin-bottom: 0px;
    }
    #goal{
      width: 600px;
			height: 200px;
			float: left;
    }
    #step{
      width: 400px;
			height: 200px;
      margin-left:60px;
      float: left;
    }
    .clearfloat {
			clear: both;
		}
		#team {
			height: 600px;
			text-align: left;
			padding-top: 70px;
      background-size: 1400px;
      background-position: center;
			background-color: lightskyblue;
			padding-left: 0px;
      margin-bottom: 0px;
      margin-left:0px;
      width: 100%
		}

    .p5 {
      font-size: 15pt;
      margin-top: 0px;
      font-family: 'Gotu', sans-serif;
      text-align: center;
    }
    .clearfloat {
			clear: both;
		}
    #m{
      margin-top: 0px;
      margin-left: 0px;
      padding-left: 0;
      padding-right: 0;
 
    }
    #m1{
      float: left;
      width: 250px;
      margin-left: 10px;
    }
    #m2{
      float: left;
      width: 250px;
      margin-left: 10px;
    }
    #m3{
      float: left;
      width: 250px;
      margin-left: 10px;
    }
    #m4{
      float: left;
      width: 250px;
      margin-left: 10px;
    }
    #m5{
      float: left;
      width: 250px;
      margin-left: 10px;
    }
    #pic1{
      float: left;
      width: 250px;

    }
    #pic2{
      float: left;
      width: 250px;
    }
    #pic3{
      float: left;
      width: 250px;

    }
    #pic4{
      float: left;
      width: 250px;

    }
    #pic5{
      float: left;
      width: 250px;

    }

    @media (max-width: 991px) {

    }
    @media (max-width: 575px) {
		h1 {
			margin-top: 0px;
			font-size: 35pt;
            font-family: 'Gotu', sans-serif;
		}
        #p1 {
      font-size: 15pt;
      margin-top: 380px;
      margin-bottom: 0px;
      font-family: 'Gotu', sans-serif;
      text-align: center;
    }
        #introbuttons {
            width: 250px;
            margin-left: auto;
            margin-right: auto;

        }
		#signup {
			width: 100px;
			height: 50px;
			background-color: pink;
			float: left;
			line-height: 50px;
			text-decoration: none;
			color:black;
      text-align: center;
		}
		#signin {
			width: 100px;
			height: 50px;
			background-color:pink;
			float: left;
			margin-left: 50px;
			line-height: 50px;
			text-decoration: none;
			color: black;
      text-align: center;
		}
    #m1{
        clear: both;
       width: 250px;
      margin-left: 0px;
      height: 300px;
    }
    #m2{
         clear: both;
      width: 250px;
      margin-left: 0px;
      height: 300px;
    }
    #m3{
          clear: both;
      width: 250px;
      margin-left: 0px;
      height: 300px;
    }
    #m4{
          clear: both;
      width: 250px;
      margin-left: 0px;
      height: 300px;
    }
    #m5{
         clear: both;
      width: 250px;
      margin-left: 0px;
      height: 300px;
    }
    #pic1{
              clear: both;
      width: 250px;
 
    }
    #pic2{
         clear: both;
      width: 250px;

    }
    #pic3{
           clear: both;
      width: 250px;

    }
    #pic4{
         clear: both;
      width: 250px;
    }
    #pic5{
            clear: both;
      width: 250px;
    }
    #team {
		height: 1660px;
		text-align: left;
		padding-top: 70px;
        background-size: 1400px;
        background-position: center;
		background-color: lightskyblue;
		padding-left: 0px;
        margin-bottom: 0px;
        margin-left: 0px;
        width: 100%;
		}
    #m{
      margin-top: 0px;
      margin-left: auto;
      margin-right: auto;
      padding-left: 0;
      padding-right: 0;
      width: 250px;
      height: 1500;
    }
    #goal{
        width: 100%;
    }
    #step{
        width: 100%;
    }
}
</style>
