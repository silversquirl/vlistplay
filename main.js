(function () {
  var loadJson = function (path) {
    return new Promise(function (res, rej) {
      var req = new XMLHttpRequest();

      req.onload = function () {
        if (req.status === 200) {
          res(JSON.parse(req.responseText));
        } else {
          rej(Error("Failed to load JSON; HTTP status code: " + request.statusText));
        }
      };

      req.onerror = function () {
        rej(Error("Failed to load JSON; network error"))
      };

      req.open("GET", path);
      req.send();
    });
  };

  loadJson("tracks.json").then(function (tracks) {
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
        next: function () { this.select(this.current + 1); },
        prev: function () { this.select(this.current + 1); },
        select: function (index) {
          if (index >= 0 && index < this.tracks.length) {
            this.playing = true;
            this.current = index;
            var player = document.getElementById("player");
            player.currentTime = 0;
            player.play();
          }
        }
      },
    });
  }, function (err) {
    console.log(err);
  });
}).call(window);
