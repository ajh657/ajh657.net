var g = new JustGage({
    id: "cpu",
    value: 1,
    min: 0,
    max: 100,
    title: "CPU",
    customSectors: {
        percents: true,
        ranges: [{
          color : "#00ff00",
          lo : 0,
          hi : 50
        },{
          color : "#ffff00",
          lo : 51,
          hi : 90
        },{
            color : "#ff0000",
            lo : 91,
            hi : 100
          }]
      }
});