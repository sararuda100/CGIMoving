import { newData, tailwindColors } from './sampleData.js';

/**
 * 
 * 
 * BAR CHART & LINEAR CHART
 * 
 * Monthly activity + activity trend
 * 
 * 
 */


function barChart(barData, lineData) {
    var ctx = document.getElementById('barChart').getContext('2d');
    
     // Create gradient fill for the line chart
    const gradient = ctx.createLinearGradient(0, 0, 0, 400); // Adjust gradient dimensions as needed
    gradient.addColorStop(0, 'rgba(54, 162, 235, 1)'); // Start color
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.5)'); // Intermediate white color stop
    gradient.addColorStop(1, 'rgba(54, 162, 235, 0)'); // End color (transparent)
    const yourGoal = 8;


    const barChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
            datasets: [{
                type: 'bar',
                data: barData,
                backgroundColor: tailwindColors["lake-300"], // Bar color
                borderColor: 'rgba(54, 162, 235, 1)', // Border color
                barThickness: 18,
                borderRadius: 2,
                order: 1,
            }, 
            {
                type: 'line',
                label: 'Line Dataset',
                data: lineData.map((value, index) => ({ x: index, y: value })),// Line data values twice as wide as bar data
                pointStyle: 'dash',
                showLine: false,
                order: 3,
                fill: {
                    target: 'origin',
                    above: gradient,
                }
            },
            {
              type: 'line',
              label: 'Your Goal',
              legend: 'Your Goal',
              borderDash: [5, 5],
              borderWidth: 1,
              pointStyle: 'dash',
              radius: 0.1,
              order: 2,
              borderColor: tailwindColors['cloudy-200'],
              data: [yourGoal, yourGoal, yourGoal, yourGoal, yourGoal, yourGoal, yourGoal, yourGoal, yourGoal, yourGoal, yourGoal, yourGoal],
          }
        ]
        },
        options: {
            scales: {
                y: {
                  border: {
                    display: true,
                    color: 'black',
                    width: 2,
                    z: 10,
                  },
                    beginAtZero: true, // Start y-axis at zero
                    grid: {
                        display: false,
                    },
                    ticks: {
                      color: tailwindColors["cloudy-300"],
                      stepSize: 5,
                      callback: function (value, index, values) {
                            if (value === 0) {
                                return ""; // Show the value if it's divisible by 5
                            } else {
                                return value; // Hide the value otherwise
                            }
                        },
                    },
                    suggestedMax: Math.max(...barData) + 5 // Suggested maximum for the y-axis
                },
                x: {
                   border: {
                        display: true,
                        color: 'black',
                        width: 2,
                    },
                    grid: {
                        display: false
                    },   
                    ticks: {
                        color: tailwindColors["cloudy-300"],
                        maxRotation: 0,
                        minRotation: 0,
                        autoSkip: 'auto',
                      font: {
                          size: 11
                      }
                    },
                }
            },
            backgroundColor: tailwindColors.lavender,
            plugins: {
              legend: {
                  labels: {
                      filter: function (legendItem, chartData) {
                          return legendItem.datasetIndex === 2; // Show legend only for 'Your Goal' dataset
                      },
                      color: tailwindColors.midnight,
                      usePointStyle: true, // Use point style as legend marker
                      font: {
                          weight: 'bold',
                          size: 16,
                      },
                       generateLabels: function(chart) {
                        const labels = Chart.defaults.plugins.legend.labels.generateLabels(chart);
                        labels.forEach((label) => {
                            label.lineWidth = 0; // Hide the line in legend
                            if ((label.text === 'Your Goal') && (window.matchMedia('(min-width: 600px)').matches)) {
                                // Change the label text to display 'Your' on the first row and 'Goal' on the second
                                label.text = ['Your', 'Goal']; 
                            }
                            else{
                                label.text = '';
                            }
                        });
                        return labels;
                    },
                  },
                  position: 'right', // Set legend position
              },
              tooltip: {
                  enabled: true,
                  intersect: false,
                  mode: 'index',
                  callbacks: {
                    title: () => null,
                    label: function(context) {
                      if (context.datasetIndex === 0) {
                        return context.parsed.y.toFixed(0); 
                      } else {
                          return null; // Returning null hides the tooltip for other datasets
                      }
                  }
                  },
                  displayColors: false,
                  caretSize: 0,
                  filter: (tooltipItem) => tooltipItem.datasetIndex === 0, // Display tooltip only for 'Your Activity' dataset
                },
               

              
            },
          }
    });

      function adjustBarWidth() {
        const mediaQuery = window.matchMedia('(max-width: 500px)');
        if (mediaQuery.matches) {
            barChart.data.datasets[0].barThickness = 12; // Adjust width for mobile
        } else {
            barChart.data.datasets[0].barThickness = 20;
        }
        barChart.update(); // Update the chart
    }

    adjustBarWidth(); // Adjust initially

    window.addEventListener('resize', adjustBarWidth); // Adjust on window resize

    return barChart;
}

//bar data
const barData = [12, 15, 8, 15, 7, 4, 14, 8, 15, 7, 1, 3];
//the gradient background behind bars
const lineData = [12, 15, 8, 15, 7, 4, 14, 8, 15, 7, 1, 3];

const chart = barChart(barData, lineData);


/**
 * 
 *
 * 
 *        LINEAR CHART, ACTIVITY TREND
 *
 * 
 * 
 */

const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const ctx = document.getElementById('linearChart').getContext('2d');


const activites = 8;
// const monthOfYear = new Date().getMonth();
const monthOfYear = 3;

const yourActivity = activites/monthOfYear;

const k1 = 10/12;
const k2 = 20/12;
const k3 = 30/12;

const lineChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: months,
    datasets: [
      {
        label: 'Level 1',
        data: months.map((month, index) => k1 * (index + 1)), // y = kx, where x is the index of the month
        borderColor: tailwindColors.forest,
        borderWidth: 4.5,
        pointRadius: 0,
        pointStyle: 'line',
        order: 2,
        fill: false,
      },
      {
        label: 'Level 2',
        data: months.map((month, index) => k2 * (index + 1)),
        borderColor: tailwindColors.cherry,
        borderWidth: 4.5,
        pointRadius: 0,
        pointStyle: 'line',
        order: 2,
        fill: false
      },
      {
        label: 'Level 3',
        data: months.map((month, index) => k3 * (index + 1)),
        borderColor: tailwindColors.lavender,
        borderWidth: 4.5,
        pointRadius: 0,
        pointStyle: 'line',
        order: 2,
        fill: false
      },
      {
        label: 'Your Activity',
         data: months.map((month, index) => {
          if (index <= monthOfYear) {
            return yourActivity * (index + 1);
          } else {
            return NaN;
          }
        }),
        borderColor: tailwindColors.midnight,
        pointStyle: (context) => context.dataIndex === monthOfYear ? 'circle' : 'line',
        pointRadius: (context) => context.dataIndex === monthOfYear ? 2.5 : 0, // Set radius 0 to hide points
        order: 1,
        backgroundColor: 'black',
        borderWidth: 4,
      }
    ]
  },
  options: {
    scales: {
      x: {
        border: {
          // display: true,
          color: 'black',
          width: 2,
        },
        grid: {
          display: false,
        },
         ticks: {
          color: tailwindColors["cloudy-300"],
          font: {
            size: 11,
          },
          
          maxRotation: 0,
          minRotation: 0,
          autoSkip: 'auto',
        },
        
      },
      y: {
        border: {
          display: true,
          color: 'black',
          width: 2,
          dash: [5, 2],
          
        },
        grid: {
        
          color: (context) => {
          const index = context.tick.value;
          if (index === 10 || index === 20 || index === 30) {
            return tailwindColors['cloudy-300']; // Color for the specified y-values
          } else {
            return 'transparent'; // Hide other gridlines
          }
        },
          drawTicks: false,
          
        },
        // beginAtZero: true,
        ticks: {
          padding: 10,
          color: tailwindColors["cloudy-300"],
            callback: (value, index) => {
              if (window.matchMedia('(min-width: 1024px)').matches) {
                if (value === 10) return 'Level 1';
                else if (value === 20) return 'Level 2';
                else if (value === 30) return 'Level 3';
                else return "";
              } else {
                if (value === 10) return 'L1';
                else if (value === 20) return 'L2';
                else if (value === 30) return 'L3';
                else return "";
              }
          },
        },
        min: 0, // Minimum y-axis value
        max: 40 // Maximum y-axis value
      }
    },
    plugins: {
      tooltip: {
        enabled: true,
        intersect: false,
        mode: 'index',
        callbacks: {
          title: () => null,
           label: function(context) {

                if (context.datasetIndex === 3 && context.dataIndex === monthOfYear) {
                  return 'You are here';  
                  //return context.parsed.y.toFixed(0); // Display only Y-value for the bar dataset
                } else {
                    return null; // Returning null hides the tooltip for other datasets
                }
            }
        },
        filter: (tooltipItem) => {
          return tooltipItem.datasetIndex === 3 && tooltipItem.dataIndex === monthOfYear;
        },
        caretSize: 0,
        displayColors: false,
      },
      legend: {
        position: 'right', //to make it line up with barChart
         maxWidth: 40,
        labels: {
            boxWidth: 0,
            color: 'transparent',
        }
      },
    },
  },
});