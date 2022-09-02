//////////////////////////
function update() {}
network = [];
inputs = 2;
outputs = 3;
hiddenLayers = 1;
network[0] = [];
network[hiddenLayers + 1] = [];

numberOfNeuronsInHidden = 3;
stepSize = 0.00005;
learningRate = 1;

class neuron {
  stoinost = 0;
  vruzkiOtzad = [];
  bias = 0;
  constructor(stoinost) {
    this.stoinost = stoinost;
  }
}
for (let i = 1; i <= hiddenLayers; i++) {
  network[i] = [];
  for (let j = 0; j < numberOfNeuronsInHidden; j++) {
    network[i][j] = new neuron(Math.random() * 1);
  }
}
for (let i = 0; i < inputs; i++) {
  network[0][i] = new neuron(Math.random());
}
for (let i = 0; i < outputs; i++) {
  network[hiddenLayers + 1][i] = new neuron(0);
}

for (let i = 1; i < network.length; i++) {
  for (let j = 0; j < network[i].length; j++) {
    for (let m = 0; m < network[i - 1].length; m++) {
      network[i][j].vruzkiOtzad.push({
        node: network[i - 1][m],
        weight: Math.random(),
      });
    }
  }
}
network[0][0].stoinost = 1;
network[0][1].stoinost = 2;
function runNetwork() {
  // network[0][0].stoinost = x;
  // network[0][1].stoinost = y;

  for (let i = 1; i < network.length; i++) {
    for (let j = 0; j < network[i].length; j++) {
      network[i][j].stoinost = 0;
      for (let m = 0; m < network[i - 1].length; m++) {
        network[i][j].stoinost +=
          network[i - 1][m].stoinost * network[i][j].vruzkiOtzad[m].weight;
      }
      network[i][j].stoinost += network[i][j].bias;
      // network[i][j].stoinost =
      (1 / (1 + Math.exp(1) ** -network[i][j].stoinost)) * 2 - 1;
    }
  }

  return network[network.length - 1];
  console.log(network[network.length - 1][0].stoinost);
}
function getNetworkError() {
  runNetwork();

  return {
    x:
      (network[0][0].stoinost -
        (Math.cos(network[network.length - 1][0].stoinost) +
          Math.cos(network[network.length - 1][1].stoinost) +
          Math.cos(network[network.length - 1][2].stoinost))) **
      2,
    y:
      (network[0][1].stoinost -
        (Math.sin(network[network.length - 1][0].stoinost) +
          Math.sin(network[network.length - 1][1].stoinost) +
          Math.sin(network[network.length - 1][2].stoinost))) **
      2,
  };
}
function betterTraining() {
  // console.log(getNetworkError());
  weightMap = [];

  for (let j = network.length - 1; j > 0; j--) {
    weightMap[j] = [];
    for (let m = network[j].length - 1; m > 0; m--) {
      weightMap[j][m] = [];
      for (let k = 0; k < network[j][m].vruzkiOtzad.length; k++) {
        beforeTweak = (getNetworkError().x + getNetworkError().y) ** 2;
        network[j][m].vruzkiOtzad[k].weight += stepSize;
        afterTweak = (getNetworkError().x + getNetworkError().y) ** 2;
        network[j][m].vruzkiOtzad[k].weight -= stepSize;
        // console.log(beforeTweak - afterTweak);
        slope = (beforeTweak - afterTweak) / stepSize;
        weightMap[j][m][k] = slope;
      }
    }
  }
  for (let j = network.length - 1; j > 0; j--) {
    for (let m = network[j].length - 1; m > 0; m--) {
      for (let k = 0; k < network[j][m].vruzkiOtzad.length; k++) {
        network[j][m].vruzkiOtzad[k].weight +=
          Math.sign(weightMap[j][m][k]) * stepSize;
      }
    }
  }
}
function draw() {
  context.fillRect(mouseX, mouseY, 10, 10);
  for (let i = 0; i < 409; i++) {
    betterTraining();
  }
  vectors = [];
  // for (let i = 0; i < network[network.length - 1].length; i += 2) {
  //   vectors.push({
  //     x: Math.cos(network[network.length - 1][i]),
  //     y: Math.sin(network[network.length - 1][i + 1]),
  //   });
  // }
  vectors = [];
  for (let i = 0; i < 3; i++) {
    vectors.push({
      x: Math.cos(network[network.length - 1][i].stoinost),
      y: Math.sin(network[network.length - 1][i].stoinost),
    });
  }
  // sumOfX =
  //   Math.cos(network[network.length - 1][0].stoinost) +
  //   Math.cos(
  //     network[network.length - 1][1].stoinost +
  //       Math.cos(network[network.length - 1][2].stoinost)
  //   );
  // sumOfY =
  //   Math.sin(network[network.length - 1][0].stoinost) +
  //   Math.sin(
  //     network[network.length - 1][1].stoinost +
  //       Math.cos(network[network.length - 1][2].stoinost)
  //   );
  // for (i of vectors) {
  //   drawLine(300, 300, i.x * 100, i.y * 100);
  // }
  context.lineWidth = 20;
  drawLine(200, 300, vectors[0].x * 100 + 200, vectors[0].y * 100 + 300);
  drawLine(
    vectors[0].x * 100 + 200,
    vectors[0].y * 100 + 300,
    (vectors[0].x + vectors[1].x) * 100 + 200,
    (vectors[0].y + vectors[1].y) * 100 + 300
  );
  drawLine(
    (vectors[0].x + vectors[1].x) * 100 + 200,
    (vectors[0].y + vectors[1].y) * 100 + 300,
    (vectors[0].x + vectors[1].x + vectors[2].x) * 100 + 200,
    (vectors[0].y + vectors[1].y + vectors[2].y) * 100 + 300
  );
  // drawLine(
  //   network[network.length - 1][2].stoinost + 100,
  //   network[network.length - 1][3].stoinost + 300,
  //   network[network.length - 1][4].stoinost + 100,
  //   network[network.length - 1][5].stoinost + 300
  // );
  count = 0;
  // for (let i = 0; i < data.length - 1; i++) {
  //   context.fillStyle = "red";

  //   drawLine(
  //     data[i].x * 300 + 100,
  //     data[i].y * 40 + 400,

  //     data[i + 1].x * 300 + 100,
  //     data[i + 1].y * 40 + 400
  //   );
  // }
  // for (let i of data) {
  //   context.fillStyle = "blue";
  //   // context.fillRect(i.x * 300 + 100, runNetwork(i.x) * 40 + 400, 5, 5);
  // }

  for (let i = 0; i < network.length; i++) {
    for (let j = 0; j < network[i].length; j++) {
      context.strokeStyle = "black";
      context.lineWidth = 200;
      context.beginPath();
      context.stroke();

      for (let m = 0; m < network[i][j].vruzkiOtzad.length; m++) {
        if (network[i][j].vruzkiOtzad[m].weight < 0) {
          context.strokeStyle = "blue";
        } else {
          context.strokeStyle = "red";
        }
        context.lineWidth = Math.abs(network[i][j].vruzkiOtzad[m].weight * 0.4);
      }
      context.font = "20px Ariel";
      context.fillText(
        Math.round(network[i][j].stoinost * 10) / 10,
        i * 80 + 20,
        j * 80 + 100 - 20
      );
    }
  }
}
dob = 0;

function update() {
  // console.log((mouseX - 200) / 300, (mouseY - 300) / 300);
  network[0][0].stoinost = (mouseX - 200) / 100;
  network[0][1].stoinost = (mouseY - 300) / 100;
}
