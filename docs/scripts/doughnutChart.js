import { newData, tailwindColors } from './sampleData.js';

// const tailwindColors = {
//   lavender: "#adabed",
//   'bubble-gum-300': '#ff749f',
//   forest: '#25ce6c',
//   sunshine: '#fecc31', 
//   'lake-100': '#ecf5fe',
//   'lake-200': '#5bafed',
//   'lake-300': '#5aafed',
//   'cloudy-100': '#ecebff',
//   'cloudy-200': '#8a8a8c',
//   'cloudy-300': '#bdbfc0',
//   'midnight': '#030d14',
//   'cherry': '#ee657a',
// };
// Count occurrences of each activity type
const activityCounts = {};
newData.forEach(activity => {
  const { type } = activity;
  activityCounts[type] = (activityCounts[type] || 0) + 1;
});

// Sort activityCounts by count in descending order
const sortedActivities = Object.entries(activityCounts)
  .sort(([, countA], [, countB]) => countB - countA)
  .slice(0, 4); // Take the top four activities

// Calculate total number of activities
const totalActivities = Object.values(activityCounts).reduce((total, count) => total + count, 0);

// Calculate percentages for top activities
const topActivitiesWithPercentage = sortedActivities.map(([activity, count]) => {
  const percentage = ((count / totalActivities) * 100).toFixed(2);
  return { activity, percentage };
});

// Extracting the top activities and percentages
const topActivities = topActivitiesWithPercentage.map(item => item.activity);
const cut = topActivitiesWithPercentage.map(item => Math.round(parseFloat(item.percentage)));

// Now, update datasetValues and labels
const cutValues = cut; // Use the percentages directly for datasetValues
const activities = topActivities; 

console.log('Dougnhut', topActivitiesWithPercentage);

const datasetValues = cutValues;
const maxDataSetValues = Math.max(...datasetValues);
const maxIndex = datasetValues.indexOf(maxDataSetValues);


const dataDoughnut = {
  labels: activities,
  datasets: [
    {
      data: datasetValues,
      backgroundColor: [
        tailwindColors.lavender,
        tailwindColors["bubble-gum-300"],
        tailwindColors.forest,
        tailwindColors.sunshine,
      ],
      //to remove all hover-effects
      hoverOffset: 0,
      hoverBackgroundColor: [
        tailwindColors.lavender,
        tailwindColors["bubble-gum-300"],
        tailwindColors.forest,
        tailwindColors.sunshine,
      ],
      hoverBorderColor: [
        tailwindColors.lavender,
        tailwindColors["bubble-gum-300"],
        tailwindColors.forest,
        tailwindColors.sunshine,
      ],
      // borderWidth: Array(4).fill(0), // Initialize borderWidth with zeros
    },
  ],
};

//adding border and bordercolor to highest ranking activity
const borderWidthValues = Array(dataDoughnut.labels.length).fill(0);
borderWidthValues[maxIndex] = 8; // Set the desired border width, for example, 10px

const borderColorValues = dataDoughnut.datasets[0].backgroundColor.map((color, index) => {
  if (index === maxIndex) {
    return color; // Match the border color to the color of the highest value
  }
  return '';
});

const configDoughnut = {
  type: "doughnut",
  data: {
    ...dataDoughnut,
    datasets: [
      {
        ...dataDoughnut.datasets[0],
        borderColor: borderColorValues,
        borderWidth: borderWidthValues, // Assign borderWidth array to the dataset
      },
    ],
  },
  options: {
    cutout: 64,
    spacing: 20,
    elements: {
      arc: {
        borderRadius: 80,
        spacing: 15,
        hoverOffset: 0,
      },
      hover: {
        mode: null,
      },
    },
    padding: 10,
    plugins: {
      legend: {
        position: 'bottom',
        display: false
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            var label = "";
            if (label) {
              label += ': ';
            }
            label += context.parsed.toFixed(0) + '%';
            return label;
          },
        },
        
        enabled: false,
        
      },
    },
  },
};

var chartDoughnut = new Chart(
  document.getElementById("chartDoughnut"),
  configDoughnut
);

let percentages = document.querySelectorAll('.percentage');
let labels = document.querySelectorAll('.label');

percentages.forEach((dd, index) => {
  let percentageValue = dataDoughnut.datasets[0].data[index] + "%";
  dd.textContent = percentageValue;
});

labels.forEach((dt, index) => {
  let titleValue = dataDoughnut.labels[index];
  dt.textContent = titleValue;
});

