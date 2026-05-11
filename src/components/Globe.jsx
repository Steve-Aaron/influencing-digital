import React, { useRef, useEffect } from 'react';

const NODES = [
  { lat: 51.5,  lon: 0     }, // London
  { lat: 48.9,  lon: 2.3   }, // Paris
  { lat: 42.7,  lon: 23.3  }, // Sofia
  { lat: 41.9,  lon: 12.5  }, // Rome
  { lat: 40.4,  lon: -3.7  }, // Madrid
  { lat: 52.5,  lon: 13.4  }, // Berlin
  { lat: 40.7,  lon: -74   }, // New York
  { lat: 35.7,  lon: 139.7 }, // Tokyo
  { lat: -33.9, lon: 151.2 }, // Sydney
  { lat: 1.3,   lon: 103.8 }, // Singapore
  { lat: 55.8,  lon: 37.6  }, // Moscow
  { lat: 19.4,  lon: -99.1 }, // Mexico City
  { lat: -23.5, lon: -46.6 }, // São Paulo
  { lat: 31.2,  lon: 121.5 }, // Shanghai
  { lat: 28.6,  lon: 77.2  }, // Delhi
  { lat: 6.5,   lon: 3.4   }, // Lagos
  { lat: -1.3,  lon: 36.8  }, // Nairobi
  { lat: 59.9,  lon: 10.7  }, // Oslo
  { lat: 47.4,  lon: 8.5   }, // Zurich
];

/*
 * Simplified continent polygon outlines as [lat, lon] pairs.
 * Each polygon is an array of vertices; drawing lifts the pen when a vertex
 * is on the far side of the globe (z < 0), so partial-hemisphere rendering works.
 */
const CONTINENTS = [
  // North America
  [
    [49,-128],[60,-143],[65,-168],[70,-150],[72,-130],[75,-100],[78,-80],
    [72,-78],[65,-80],[60,-64],[50,-55],[44,-67],[35,-75],[25,-80],[22,-88],
    [20,-87],[15,-90],[10,-84],[8,-77],[8,-83],[10,-76],[12,-68],[18,-66],
    [20,-75],[22,-81],[25,-80],[30,-80],[35,-75],[38,-75],[42,-70],[44,-67],
    [47,-52],[52,-56],[58,-62],[60,-64],[65,-80],[72,-80],[78,-80],[75,-100],
    [70,-140],[65,-168],[60,-152],[55,-130],[48,-125],[40,-124],[35,-120],
    [32,-117],[25,-110],[22,-106],[18,-104],[16,-95],[15,-90],[18,-87],
    [22,-88],[25,-80],[30,-80],[35,-75],[42,-70],[49,-68],[49,-80],[55,-82],
    [48,-80],[45,-77],[44,-76],[45,-65],[47,-53],[52,-56],[58,-62],[60,-64],
    [65,-80],[72,-80],[78,-80],[75,-100],[70,-140],[65,-168],[60,-152],
    [55,-130],[49,-128],
  ],
  // South America
  [
    [12,-71],[12,-62],[8,-61],[2,-55],[0,-51],[-5,-35],[-10,-37],[-15,-39],
    [-23,-43],[-33,-52],[-40,-62],[-45,-66],[-52,-68],[-55,-64],[-55,-68],
    [-52,-72],[-45,-72],[-40,-62],[-33,-52],[-25,-48],[-10,-37],[-5,-35],
    [0,-51],[2,-55],[6,-61],[8,-61],[10,-62],[12,-62],[12,-71],[8,-77],
    [4,-76],[0,-78],[-5,-81],[-10,-76],[-15,-75],[-22,-68],[-24,-68],
    [-18,-70],[-15,-75],[-10,-76],[-3,-80],[1,-78],[4,-76],[8,-77],[12,-71],
  ],
  // Europe
  [
    [36,-9],[38,0],[43,7],[44,14],[42,28],[46,30],[55,25],[60,25],
    [65,14],[58,5],[51,2],[51,-4],[46,-2],[44,-8],[36,-6],[36,-9],
  ],
  // Africa
  [
    [37,-5],[37,12],[30,32],[15,42],[11,44],[0,42],[-12,40],[-22,35],
    [-35,27],[-35,18],[-22,14],[-5,8],[0,8],[4,7],[10,3],[10,-17],
    [20,-17],[28,-13],[35,-5],[37,-5],
  ],
  // Asia (connected to Europe outline at shared border)
  [
    [42,28],[38,42],[36,37],[30,48],[22,55],[12,45],[11,44],[15,42],
    [30,32],[38,42],[42,52],[44,57],[40,60],[45,68],[35,72],[25,68],
    [8,77],[8,80],[20,90],[15,100],[5,103],[1,104],[5,116],[20,110],
    [30,120],[40,125],[48,135],[55,135],[65,170],[70,178],[72,160],
    [70,140],[72,120],[75,82],[72,55],[65,40],[62,32],[62,25],[57,22],
    [55,25],[60,25],[65,14],[58,5],[51,2],[51,-4],[46,-2],[44,-8],
    [36,-6],[36,-9],[38,0],[43,7],[44,14],[42,28],
  ],
  // Australia
  [
    [-18,122],[-25,114],[-32,115],[-35,117],[-35,137],[-38,140],
    [-38,146],[-35,150],[-30,153],[-20,148],[-15,145],[-12,136],
    [-13,130],[-16,128],[-18,125],[-18,122],
  ],
  // Greenland
  [
    [76,-18],[72,-22],[70,-26],[65,-38],[62,-44],[62,-52],[65,-55],
    [70,-52],[72,-45],[78,-52],[82,-30],[82,-18],[76,-18],
  ],
  // Japan (main island Honshu, simplified)
  [
    [31,130],[33,130],[34,132],[35,136],[36,138],[37,137],[38,140],
    [40,141],[41,141],[40,140],[38,141],[36,136],[34,135],[32,131],
    [31,130],
  ],
  // UK (Great Britain, simplified)
  [
    [50,-5],[51,-1],[52,1],[53,0],[54,-1],[56,-3],[57,-4],[58,-5],
    [57,-6],[55,-5],[53,-4],[51,-3],[50,-5],
  ],
  // New Zealand (North Island, simplified)
  [
    [-34,173],[-37,175],[-39,176],[-41,175],[-38,176],[-37,174],
    [-34,173],
  ],
  // Antarctica (partial outline, southern band)
  [
    [-70,-60],[-70,-30],[-70,0],[-70,30],[-70,60],[-70,90],
    [-70,120],[-70,150],[-70,180],[-70,-150],[-70,-120],[-70,-90],[-70,-60],
  ],
];

/* Read current theme from DOM — called each animation frame so it reacts instantly */
function isDarkMode() {
  return document.documentElement.getAttribute('data-theme') === 'dark';
}

export default function Globe({ size = 460 }) {
  const canvasRef = useRef(null);
  const stateRef  = useRef({ rotY: 0.4, rotX: 0.3, dragging: false, lastX: 0, lastY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width  = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width  = size + 'px';
    canvas.style.height = size + 'px';
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    const R  = size / 2 * 0.8;
    const cx = size / 2;
    const cy = size / 2;
    let animId;

    function project(lat, lon) {
      const phi   = (lat * Math.PI) / 180;
      const theta = (lon * Math.PI) / 180;
      const st    = stateRef.current;

      let x = Math.cos(phi) * Math.sin(theta);
      let y = Math.sin(phi);
      let z = Math.cos(phi) * Math.cos(theta);

      const cosY = Math.cos(st.rotY), sinY = Math.sin(st.rotY);
      const x1   = x * cosY + z * sinY;
      const z1   = -x * sinY + z * cosY;

      const cosX = Math.cos(st.rotX), sinX = Math.sin(st.rotX);
      const y3   = y  * cosX - z1 * sinX;
      const z3   = y  * sinX + z1 * cosX;

      return { x: cx + x1 * R, y: cy - y3 * R, z: z3 };
    }

    function drawContinent(poly, fillStyle, strokeStyle) {
      ctx.beginPath();
      let penDown = false;
      for (const [lat, lon] of poly) {
        const p = project(lat, lon);
        if (p.z > -0.05) {
          if (!penDown) { ctx.moveTo(p.x, p.y); penDown = true; }
          else          { ctx.lineTo(p.x, p.y); }
        } else {
          penDown = false;
        }
      }
      if (fillStyle) {
        ctx.fillStyle = fillStyle;
        ctx.fill();
      }
      ctx.strokeStyle = strokeStyle;
      ctx.lineWidth   = 0.9;
      ctx.stroke();
    }

    function drawGlobe() {
      const dark = isDarkMode();
      ctx.clearRect(0, 0, size, size);

      /* ── Sphere background ── */
      const bg = ctx.createRadialGradient(cx - R * 0.25, cy - R * 0.3, R * 0.05, cx, cy, R);
      if (dark) {
        bg.addColorStop(0,   '#0E0E10');
        bg.addColorStop(0.6, '#080809');
        bg.addColorStop(1,   '#030304');
      } else {
        bg.addColorStop(0,   '#F5F0EA');
        bg.addColorStop(0.5, '#EDE6DB');
        bg.addColorStop(1,   '#E0D8CC');
      }
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = bg;
      ctx.fill();

      /* ── Clip to sphere for everything inside ── */
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R - 1, 0, Math.PI * 2);
      ctx.clip();

      /* ── Continent fills (beneath grid) ── */
      const contFill   = dark
        ? 'rgba(28, 28, 32, 0.92)'
        : 'rgba(195, 178, 148, 0.60)';
      const contStroke = dark
        ? 'rgba(70, 70, 85, 0.65)'
        : 'rgba(120, 95, 60, 0.60)';

      CONTINENTS.forEach(poly => drawContinent(poly, contFill, contStroke));

      /* ── Grid lines (on top of continents) ── */
      const gridColour = dark
        ? 'rgba(80, 80, 100, 0.18)'
        : 'rgba(100, 80, 60, 0.15)';

      const SEGS = 90;

      for (let lat = -80; lat <= 80; lat += 20) {
        ctx.beginPath();
        let pen = false;
        for (let i = 0; i <= SEGS; i++) {
          const p = project(lat, -180 + (360 / SEGS) * i);
          if (p.z >= -0.05) {
            pen ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y);
            pen = true;
          } else { pen = false; }
        }
        ctx.strokeStyle = gridColour;
        ctx.lineWidth   = 0.6;
        ctx.stroke();
      }

      for (let lon = -180; lon < 180; lon += 20) {
        ctx.beginPath();
        let pen = false;
        for (let i = 0; i <= SEGS; i++) {
          const p = project(-90 + (180 / SEGS) * i, lon);
          if (p.z >= -0.05) {
            pen ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y);
            pen = true;
          } else { pen = false; }
        }
        ctx.strokeStyle = gridColour;
        ctx.lineWidth   = 0.6;
        ctx.stroke();
      }

      /* ── Connection lines between nearby visible nodes ── */
      const visible = NODES
        .map(n => ({ ...project(n.lat, n.lon) }))
        .filter(p => p.z > 0.1);

      visible.forEach((a, i) => {
        visible.forEach((b, j) => {
          if (j <= i) return;
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < R * 0.52) {
            const alpha = (1 - dist / (R * 0.52)) * 0.18 * Math.min(a.z, b.z);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(252, 10, 5, ${alpha})`;
            ctx.lineWidth   = 0.9;
            ctx.stroke();
          }
        });
      });

      /* ── City nodes ── */
      NODES.forEach(node => {
        const p = project(node.lat, node.lon);
        if (p.z <= 0) return;
        const alpha = Math.min(1, p.z * 1.8);

        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 10);
        grd.addColorStop(0, `rgba(252, 10, 5, ${alpha * 0.5})`);
        grd.addColorStop(1, 'rgba(252, 10, 5, 0)');
        ctx.beginPath();
        ctx.arc(p.x, p.y, 10, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(252, 10, 5, ${alpha})`;
        ctx.fill();
      });

      ctx.restore();

      /* ── Rim ── */
      const rimColour = dark ? 'rgba(70, 70, 90, 0.50)' : 'rgba(120, 100, 70, 0.25)';
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = rimColour;
      ctx.lineWidth   = 1.5;
      ctx.stroke();

      /* ── Sheen highlight ── */
      const hl = ctx.createRadialGradient(cx - R * 0.38, cy - R * 0.38, 0, cx, cy, R);
      hl.addColorStop(0,   dark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.50)');
      hl.addColorStop(0.5, 'rgba(255,255,255,0)');
      hl.addColorStop(1,   'rgba(0,0,0,0)');
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = hl;
      ctx.fill();
    }

    function animate() {
      if (!stateRef.current.dragging) stateRef.current.rotY += 0.0025;
      drawGlobe();
      animId = requestAnimationFrame(animate);
    }

    animate();

    function getPos(e) {
      const src = e.touches ? e.touches[0] : e;
      return { x: src.clientX, y: src.clientY };
    }

    function onDown(e) {
      const pos = getPos(e);
      Object.assign(stateRef.current, { dragging: true, lastX: pos.x, lastY: pos.y });
      canvas.style.cursor = 'grabbing';
    }

    function onMove(e) {
      const st = stateRef.current;
      if (!st.dragging) return;
      const pos = getPos(e);
      st.rotY += (pos.x - st.lastX) * 0.007;
      st.rotX  = Math.max(-1.3, Math.min(1.3, st.rotX + (pos.y - st.lastY) * 0.007));
      st.lastX = pos.x;
      st.lastY = pos.y;
    }

    function onUp() {
      stateRef.current.dragging = false;
      canvas.style.cursor = 'grab';
    }

    canvas.addEventListener('mousedown',  onDown);
    window.addEventListener('mousemove',  onMove);
    window.addEventListener('mouseup',    onUp);
    canvas.addEventListener('touchstart', onDown, { passive: true });
    window.addEventListener('touchmove',  onMove, { passive: true });
    window.addEventListener('touchend',   onUp);

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener('mousedown',  onDown);
      window.removeEventListener('mousemove',  onMove);
      window.removeEventListener('mouseup',    onUp);
      canvas.removeEventListener('touchstart', onDown);
      window.removeEventListener('touchmove',  onMove);
      window.removeEventListener('touchend',   onUp);
    };
  }, [size]);

  return (
    <canvas
      ref={canvasRef}
      style={{ cursor: 'grab', display: 'block', userSelect: 'none' }}
      aria-label="Interactive globe — drag to rotate"
    />
  );
}
