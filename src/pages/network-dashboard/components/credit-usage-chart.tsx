import { Box, Header, SpaceBetween } from '@cloudscape-design/components';

// Mock data for the bar chart
const chartData = [
  { x: 'x1', value: 183 },
  { x: 'x2', value: 257 },
  { x: 'x3', value: 213 },
  { x: 'x4', value: 122 },
  { x: 'x5', value: 210 }
];

const yAxisLabels = ['y1', 'y2', 'y3', 'y4', 'y5', 'y6'];
const maxValue = 300;

export function CreditUsageChart() {
  return (
    <SpaceBetween size="m">
      <Header variant="h3">Credit Usage</Header>
      
      <Box>
        <div className="credit-usage-chart">
          {/* Y-axis */}
          <div className="chart-y-axis">
            {yAxisLabels.reverse().map((label, index) => (
              <div key={label} className="y-axis-label">
                <span className="axis-text">{label}</span>
                <div className="grid-line"></div>
              </div>
            ))}
          </div>
          
          {/* Chart area */}
          <div className="chart-area">
            <svg width="100%" height="300" viewBox="0 0 600 300">
              {/* Grid lines */}
              {[0, 1, 2, 3, 4, 5].map(i => (
                <line 
                  key={i}
                  x1={0} 
                  y1={50 + i * 40} 
                  x2={600} 
                  y2={50 + i * 40}
                  stroke="#E9EBED" 
                  strokeWidth={1}
                />
              ))}
              
              {/* Bars */}
              {chartData.map((data, index) => {
                const barWidth = 80;
                const barSpacing = 100;
                const x = 60 + index * barSpacing;
                const barHeight = (data.value / maxValue) * 200;
                const y = 250 - barHeight;
                
                return (
                  <rect
                    key={data.x}
                    x={x}
                    y={y}
                    width={barWidth}
                    height={barHeight}
                    fill="#688AE8"
                    stroke="#FFF"
                    strokeWidth={2}
                    rx={4}
                  />
                );
              })}
              
              {/* Performance goal line */}
              <line 
                x1={50} 
                y1={150} 
                x2={550} 
                y2={150}
                stroke="#5F6B7A" 
                strokeWidth={2}
                strokeDasharray="4 4"
              />
            </svg>
          </div>
          
          {/* X-axis */}
          <div className="chart-x-axis">
            {chartData.map((data, index) => (
              <div key={data.x} className="x-axis-label">
                <div className="axis-tick"></div>
                <span className="axis-text">{data.x}</span>
              </div>
            ))}
          </div>
        </div>
        
        <Box textAlign="center" margin={{ top: 's' }}>
          <strong>Day</strong>
        </Box>
      </Box>
      
      {/* Legend */}
      <div className="chart-legend">
        <div className="legend-item">
          <div className="legend-color"></div>
          <span>Site 1</span>
        </div>
        <div className="legend-item">
          <div className="legend-line"></div>
          <span>Performance goal</span>
        </div>
      </div>
      
      <style jsx>{`
        .credit-usage-chart {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .chart-y-axis {
          display: flex;
          flex-direction: column-reverse;
          gap: 40px;
          margin-bottom: 16px;
        }
        
        .y-axis-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: #5F6B7A;
        }
        
        .grid-line {
          flex: 1;
          height: 1px;
          background: #E9EBED;
        }
        
        .chart-area {
          flex: 1;
          min-height: 300px;
        }
        
        .chart-x-axis {
          display: flex;
          justify-content: space-around;
          margin-top: 8px;
          padding: 0 60px;
        }
        
        .x-axis-label {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }
        
        .axis-tick {
          width: 1px;
          height: 8px;
          background: #D1D5DB;
        }
        
        .axis-text {
          font-size: 12px;
          color: #5F6B7A;
        }
        
        .chart-legend {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          margin-top: 16px;
        }
        
        .legend-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
        }
        
        .legend-color {
          width: 14px;
          height: 14px;
          border-radius: 2px;
          background: #688AE8;
        }
        
        .legend-line {
          width: 12px;
          height: 3px;
          background: repeating-linear-gradient(
            to right,
            #5F6B7A 0px,
            #5F6B7A 3px,
            transparent 3px,
            transparent 6px
          );
        }
      `}</style>
    </SpaceBetween>
  );
}
