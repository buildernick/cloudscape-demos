import { Box, Header, SpaceBetween } from '@cloudscape-design/components';
import styles from './network-traffic-chart.module.css';

// Mock data for the area chart
const chartData = [
  { x: 'x1', site1: 180, site2: 120 },
  { x: 'x2', site1: 160, site2: 140 },
  { x: 'x3', site1: 170, site2: 130 },
  { x: 'x4', site1: 150, site2: 110 },
  { x: 'x5', site1: 140, site2: 100 },
  { x: 'x6', site1: 160, site2: 120 },
  { x: 'x7', site1: 170, site2: 135 },
  { x: 'x8', site1: 180, site2: 145 },
  { x: 'x9', site1: 190, site2: 150 },
  { x: 'x10', site1: 200, site2: 160 },
  { x: 'x11', site1: 210, site2: 170 },
  { x: 'x12', site1: 220, site2: 180 }
];

const yAxisLabels = ['y1', 'y2', 'y3', 'y4', 'y5', 'y6'];

export function NetworkTrafficChart() {
  return (
    <SpaceBetween size="m">
      <Header variant="h3">Network traffic</Header>
      
      <Box>
        <div className={styles.networkTrafficChart}>
          {/* Y-axis */}
          <div className="chart-y-axis">
            {yAxisLabels.reverse().map((label, index) => (
              <div key={label} className="y-axis-label">
                <span className="axis-text">{label}</span>
                <div className="grid-line"></div>
              </div>
            ))}
          </div>
          
          {/* Chart area with SVG */}
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
              
              {/* Area paths */}
              <defs>
                <linearGradient id="site1Gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(116, 146, 231, 0.4)" />
                  <stop offset="100%" stopColor="rgba(116, 146, 231, 0.1)" />
                </linearGradient>
                <linearGradient id="site2Gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(195, 61, 105, 0.4)" />
                  <stop offset="100%" stopColor="rgba(195, 61, 105, 0.1)" />
                </linearGradient>
              </defs>
              
              {/* Site 1 area */}
              <path
                d="M50,200 L100,180 L150,185 L200,170 L250,160 L300,180 L350,185 L400,200 L450,210 L500,220 L550,230 L550,250 L500,250 L450,250 L400,250 L350,250 L300,250 L250,250 L200,250 L150,250 L100,250 L50,250 Z"
                fill="url(#site1Gradient)"
                stroke="#688AE8"
                strokeWidth={2}
              />
              
              {/* Site 2 area */}
              <path
                d="M50,150 L100,130 L150,135 L200,120 L250,110 L300,130 L350,135 L400,150 L450,160 L500,170 L550,180 L550,200 L500,200 L450,200 L400,200 L350,200 L300,200 L250,200 L200,200 L150,200 L100,200 L50,200 Z"
                fill="url(#site2Gradient)"
                stroke="#C33D69"
                strokeWidth={2}
              />
              
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
          <div className="legend-color site1"></div>
          <span>Site 1</span>
        </div>
        <div className="legend-item">
          <div className="legend-color site2"></div>
          <span>Site 2</span>
        </div>
        <div className="legend-item">
          <div className="legend-line"></div>
          <span>Performance goal</span>
        </div>
      </div>
      
      <style jsx>{`
        .network-traffic-chart {
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
          justify-content: space-between;
          margin-top: 8px;
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
        }
        
        .legend-color.site1 {
          background: rgba(116, 146, 231, 0.4);
          border: 1px solid #688AE8;
        }
        
        .legend-color.site2 {
          background: rgba(195, 61, 105, 0.4);
          border: 1px solid #C33D69;
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
