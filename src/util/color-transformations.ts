import { take } from 'ramda';
export type colorRgb = [number, number, number];

export function RGBtoHSV(rgb: colorRgb): { h: number; s: number; v: number } {
  const [r, g, b] = rgb;
  let rabs, gabs, babs, rr, gg, bb, h, s, v, diff, diffc, percentRoundFn;
  rabs = r / 255;
  gabs = g / 255;
  babs = b / 255;
  (v = Math.max(rabs, gabs, babs)), (diff = v - Math.min(rabs, gabs, babs));
  diffc = (c) => (v - c) / 6 / diff + 1 / 2;
  percentRoundFn = (num) => Math.round(num * 100) / 100;
  if (diff == 0) {
    h = s = 0;
  } else {
    s = diff / v;
    rr = diffc(rabs);
    gg = diffc(gabs);
    bb = diffc(babs);

    if (rabs === v) {
      h = bb - gg;
    } else if (gabs === v) {
      h = 1 / 3 + rr - bb;
    } else if (babs === v) {
      h = 2 / 3 + gg - rr;
    }
    if (h < 0) {
      h += 1;
    } else if (h > 1) {
      h -= 1;
    }
  }
  return {
    h: Math.round(h * 360),
    s: percentRoundFn(s * 100),
    v: percentRoundFn(v * 100),
  };
}

export function HSVtoRGB(hsv: {h: number, s: number, v: number}): colorRgb {
  let h = hsv.h/360
  let s = hsv.s/100
  let v = hsv.v/100

  let r, g, b, i, f, p, q, t;
  i = Math.floor(h * 6);
  f = h * 6 - i;
  p = v * (1 - s);
  q = v * (1 - f * s);
  t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0:
      (r = v), (g = t), (b = p);
      break;
    case 1:
      (r = q), (g = v), (b = p);
      break;
    case 2:
      (r = p), (g = v), (b = t);
      break;
    case 3:
      (r = p), (g = q), (b = v);
      break;
    case 4:
      (r = t), (g = p), (b = v);
      break;
    case 5:
      (r = v), (g = p), (b = q);
      break;
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}



export function RGBtoHex(colorRgb: colorRgb){
  const compToHex = (c) => {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
  let s =  "#" + compToHex(colorRgb[0]) + compToHex(colorRgb[1]) + compToHex(colorRgb[2]);
  return s.toUpperCase()
}

export function randomColor(): colorRgb {
  const color = () => Math.floor(Math.random() * 256);
  return [color(), color(), color()];
}

export function generateEvenWheel(size: number, primary = null): colorRgb[] {
  let hsv = primary ? RGBtoHSV(primary) : RGBtoHSV(randomColor());
  let spacing = Math.floor(360 / size);

  let generate = (i) => {
    let h = (hsv.h + spacing * i) % 360;
    return HSVtoRGB({
      ...hsv,
      h,
    });
  };

  return Array(size)
    .fill(0)
    .map((_, i) => generate(i));
}

export function generateShadesWheel(
  size: number,
  primary: colorRgb = null
): colorRgb[] {
  let hsv = primary ? RGBtoHSV(primary) : RGBtoHSV(randomColor());
  let spacing = 100 / (size + 1);

  let generate = (i) => {
    let v = spacing + spacing * i;
    let color = { ...hsv, v };
    return HSVtoRGB(color);
  };

  return Array(size)
    .fill(0)
    .map((_, i) => {
      const value = generate(i);
      return value;
    });
}

export function generateTetradWheel(
  size: number,
  primary: colorRgb = null,
  setDeg = null
): colorRgb[] {
  let hsv = primary ? RGBtoHSV(primary) : RGBtoHSV(randomColor());
  let deg = setDeg || Math.random() * 70 + 5;
  let arr = [];
  let arrOp = [];
  let i = 0;
  while (arr.length + arrOp.length < size) {
    let a = HSVtoRGB({ ...hsv, h: hsv.h + deg * i });
    let b = HSVtoRGB({ ...hsv, h: hsv.h + deg * i + 180 });
    arr.push(a);
    arrOp.push(b);
    i++;
  }

  return take(size, [...arr, ...arrOp]);
}

export function generateAdjacentWheel(
  size: number,
  primary: colorRgb = null,
  setDeg = null
): colorRgb[] {
  let hsv = primary ? RGBtoHSV(primary) : RGBtoHSV(randomColor());
  let deg = setDeg || Math.random() * 70 + 5;

  let generate = (i) => {
    let h = deg * i;
    let color = { ...hsv, h: hsv.h + h };
    return HSVtoRGB(color);
  };

  return Array(size)
    .fill(0)
    .map((_, i) => {
      const value = generate(i);
      return value;
    });
}
