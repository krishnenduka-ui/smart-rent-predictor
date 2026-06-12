import * as tf from "@tensorflow/tfjs";

let model;

// Location Encoding
const locationMap = {
  Kakkanad: 1,
  Edappally: 2,
  Palarivattom: 3,
  FortKochi: 4,
  Vyttila: 5,
  Kalamassery: 6,
};

const normalize = (value, max) => value / max;

export const trainModel = async (properties) => {
  const xs = properties.map((p) => [
    normalize(p.sqft || 0, 5000),
    normalize(p.bedrooms || 0, 10),
    normalize(p.bathrooms || 0, 10),
    normalize(p.amenities?.length || 0, 20),
    normalize(p.neighbourhoods?.length || 0, 20),
    normalize(p.rating || 0, 5),
    normalize(locationMap[p.location] || 0, 10), // Location
  ]);

  const ys = properties.map((p) => [
    normalize(p.price || 0, 100000),
  ]);

  const xTensor = tf.tensor2d(xs);
  const yTensor = tf.tensor2d(ys);

  model = tf.sequential();

  model.add(
    tf.layers.dense({
      units: 32,
      activation: "relu",
      inputShape: [7], // 6 features + location
    })
  );

  model.add(
    tf.layers.dense({
      units: 16,
      activation: "relu",
    })
  );

  model.add(
    tf.layers.dense({
      units: 1,
    })
  );

  model.compile({
    optimizer: tf.train.adam(0.001),
    loss: "meanSquaredError",
    metrics: ["mae"],
  });

  await model.fit(xTensor, yTensor, {
    epochs: 150,
    batchSize: 8,
    validationSplit: 0.2,
    shuffle: true,
  });

  xTensor.dispose();
  yTensor.dispose();

  console.log("Rent prediction model trained");
};

export const predictRent = (data) => {
  try {
    if (!model) {
      throw new Error("Model not trained yet");
    }

    const input = tf.tensor2d([
      [
        normalize(Number(data.sqft) || 0, 5000),
        normalize(Number(data.bedrooms) || 0, 10),
        normalize(Number(data.bathrooms) || 0, 10),
        normalize(Number(data.amenities) || 0, 20),
        normalize(Number(data.neighbourhoods) || 0, 20),
        normalize(Number(data.rating) || 0, 5),
        normalize(locationMap[data.location] || 0, 10),
      ],
    ]);

    const prediction = model.predict(input);

    const predictedValue = prediction.dataSync()[0];

    input.dispose();
    prediction.dispose();

    return Math.round(predictedValue * 100000);
  } catch (error) {
    console.log(error);
    throw error;
  }
};