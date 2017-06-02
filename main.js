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
        load: function () {
          if (this.playing) {
            document.getElementById("player").play();
          }
        },

        play: function () {
          this.playing = true;
          document.getElementById("player").play();
        },

        seek: function (position) {
          document.getElementById("player").currentTime = position;
        },

        next: function () { this.select(this.current + 1); },
        prev: function () { this.select(this.current + 1); },

        select: function (index) {
          if (index >= 0 && index < this.tracks.length) {
            this.current = index;
            this.seek(0);
            this.play();
          }
        }
      },
    });
  }, function (err) {
    console.log(err);
  });
}).call(window);
