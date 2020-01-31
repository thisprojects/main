

function nQuery(){


this.element= "";

this.select = function (element) {

this.element = element;
return this;
};

this.click = function (callback) {

var le = nQ.element;

document.getElementById(le).onclick = (function() {callback();});
return this;
}

this.HTML = function (input) {

var le = nQ.element;

document.getElementById(le).innerHTML = input;

return this;
}

this.fdein = function (speed) {

      var animId;
      var x=0.0;
      var le = nQ.element;

      function fade() {

          x += speed;
          document.getElementById(le).style.opacity = x;
            console.log(le);
              if (x > 1.0){
                    cancelAnimationFrame(animId);
                    return;
              }

        animId = requestAnimationFrame(fade);
      }

      animId = requestAnimationFrame(fade);

      return this;

}

this.fdeout = function (speed){

      var animId;
      var x=1.0;
      var le = nQ.element;

      function fade() {

          x -= speed;
          document.getElementById(le).style.opacity = x;

              if (x < 0.0){
                    cancelAnimationFrame(animId);
                    return;
              }

          animId = requestAnimationFrame(fade);
      }

      animId = requestAnimationFrame(fade);

      return this;
}

this.right = function (srt, fin, spd) {

    var animId;
    var el = nQ.element;


    function slide() {

          srt += spd;
          document.getElementById(el).style.left = srt;

          if (srt >= fin){
                cancelAnimationFrame(animId);
                return;
          }
          animId = requestAnimationFrame(slide);

          }

          animId = requestAnimationFrame(slide);
          return this;

}

this.left = function (srt, fin, spd) {

    var animId;
    var el = nQ.element;


    function slide() {

          srt -= spd;
          document.getElementById(el).style.left = srt;

          if (srt <= fin){
                cancelAnimationFrame(animId);
                return;
          }
          animId = requestAnimationFrame(slide);

          }

          animId = requestAnimationFrame(slide);
          return this;

}

this.slide = function () {


    var el = nQ.element;
    document.getElementById(el).style.position = "relative";

    return this;
}

this.down = function (srt, fin, spd){

    var animId;
    var el = nQ.element;

    function slide() {

          srt += spd;
          document.getElementById(el).style.top = srt;

          if (srt >= fin){
                cancelAnimationFrame(animId);
                return;
          }
          animId = requestAnimationFrame(slide);

          }

          animId = requestAnimationFrame(slide);
          return this;

}

this.up = function (srt, fin, spd){

    var animId;
    var el = nQ.element;

    function slide() {

          srt -= spd;
          document.getElementById(el).style.top = srt;

          if (srt <= fin){
                cancelAnimationFrame(animId);
                return;
          }
          animId = requestAnimationFrame(slide);

          }

          animId = requestAnimationFrame(slide);
          return this;

}
};