(function () {
  // AJAX, minus the A and the X
  var tracks = (function (path) {
    req = new XMLHttpRequest();
    req.open("GET", path, false); // false for synchronous, hence no callback
    req.send();

    if (req.readyState === XMLHttpRequest.DONE && req.status === 200) {
      // Success
      return JSON.parse(req.responseText);
    }
  })("tracks.json");

  var app = new Vue({
    el: "#app",
    data: {
      tracks: tracks,
      current: 0,
      playing: false,
    },
    methods: {
      log: console.log,
      load: function () {
        if (this.playing) {
          document.getElementById("player").play();
        }
      },
      next: function () {
        if (this.current + 1 < this.tracks.length) {
          this.current++;
          document.getElementById("player").play();
        }
      },
      prev: function () {
        if (this.current > 0) {
          this.current--;
          document.getElementById("player").play();
        }
      },
      select: function (index) {
        if (index >= 0 && index < this.tracks.length) {
          this.playing = true;
          this.current = index;
          var player = document.getElementById("player");
          player.currentTime = 0;
        }
      }
    },
  });
}).call(window);
