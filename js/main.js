new Vue({
  el: "#app",
  data() {
    return {
      preset: [
        {
          name: "android-chrome-192x192.png",
          size: {
            height: 192,
            width: 192
          }
        },
        {
          name: "android-chrome-512x512.png",
          size: {
            height: 512,
            width: 512
          }
        },
        {
          name: "apple-touch-icon-120x120.png",
          size: {
            height: 120,
            width: 120
          }
        },
        {
          name: "apple-touch-icon-152x152.png",
          size: {
            height: 152,
            width: 152
          }
        },
        {
          name: "apple-touch-icon-180x180.png",
          size: {
            height: 180,
            width: 180
          }
        },
        {
          name: "apple-touch-icon-60x60.png",
          size: {
            height: 60,
            width: 60
          }
        },
        {
          name: "apple-touch-icon-76x76.png",
          size: {
            height: 76,
            width: 76
          }
        },
        {
          name: "apple-touch-icon.png",
          size: {
            height: 256,
            width: 256
          }
        },
        {
          name: "favicon-16x16.png",
          size: {
            height: 16,
            width: 16
          }
        },
        {
          name: "favicon-32x32.png",
          size: {
            height: 32,
            width: 32
          }
        },
        {
          name: "msapplication-icon-144x144.png",
          size: {
            height: 144,
            width: 144
          }
        },
        {
          name: "mstile-150x150.png",
          size: {
            height: 150,
            width: 150
          }
        }
      ]
    };
  },
  mounted() {
    document.ondragover = document.ondragenter = document.ondrop = document.ondragleave = e => {
      if (e.type == "drop") {
        const file = e.dataTransfer.files[0];
        if (!file.type.startsWith("image/")) return;
        this.resizer(file);
      }
      e.preventDefault();
    };
  },
  methods: {
    resizer: function(file) {
      const sharp = require("sharp");
      const fs = require("fs");
      const path = require("path");
      const dir = path.dirname(file.path) + "/icons";

      fs.mkdir(dir, { recursive: true }, err => {
        if (err) throw err;

        for (set of this.preset) {
          const savePath = dir + "/" + set.name;
          sharp(file.path)
            .resize(set.size)
            .toBuffer()
            .then(data => {
              fs.writeFileSync(savePath, data, "binary");
            });
        }
      });
    }
  }
});
