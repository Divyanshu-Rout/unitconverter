// Type definitions for conversion data
export type ConversionUnit = {
  value: string;
  label: string;
  toBase: number;
};

export type ConversionCategory = {
  baseUnit: string;
  units: ConversionUnit[];
};

export type ConversionDataType = {
  [key: string]: ConversionCategory;
};

export const conversionData: ConversionDataType = {
  length: {
    baseUnit: "meters",
    units: [
      { value: "millimeter", label: "Millimeters (mm)", toBase: 0.001 },
      { value: "centimeter", label: "Centimeters (cm)", toBase: 0.01 },
      { value: "meter", label: "Meters (m)", toBase: 1 },
      { value: "kilometer", label: "Kilometers (km)", toBase: 1000 },
      { value: "inch", label: "Inches (in)", toBase: 0.0254 },
      { value: "foot", label: "Feet (ft)", toBase: 0.3048 },
      { value: "yard", label: "Yards (yd)", toBase: 0.9144 },
      { value: "mile", label: "Miles (mi)", toBase: 1609.344 },
    ],
  },
  weight: {
    baseUnit: "grams",
    units: [
      { value: "milligram", label: "Milligrams (mg)", toBase: 0.001 },
      { value: "gram", label: "Grams (g)", toBase: 1 },
      { value: "kilogram", label: "Kilograms (kg)", toBase: 1000 },
      { value: "ton", label: "Metric Tons (t)", toBase: 1000000 },
      { value: "ounce", label: "Ounces (oz)", toBase: 28.3495 },
      { value: "pound", label: "Pounds (lb)", toBase: 453.592 },
      { value: "stone", label: "Stone (st)", toBase: 6350.29 },
      { value: "us-ton", label: "US Tons", toBase: 907184.74 },
    ],
  },
  temperature: {
    baseUnit: "celsius",
    units: [
      { value: "celsius", label: "Celsius (°C)", toBase: 1 },
      { value: "fahrenheit", label: "Fahrenheit (°F)", toBase: 1 },
      { value: "kelvin", label: "Kelvin (K)", toBase: 1 },
    ],
  },
  area: {
    baseUnit: "square meters",
    units: [
      {
        value: "square-millimeter",
        label: "Square Millimeters (mm²)",
        toBase: 0.000001,
      },
      {
        value: "square-centimeter",
        label: "Square Centimeters (cm²)",
        toBase: 0.0001,
      },
      { value: "square-meter", label: "Square Meters (m²)", toBase: 1 },
      { value: "hectare", label: "Hectares (ha)", toBase: 10000 },
      {
        value: "square-kilometer",
        label: "Square Kilometers (km²)",
        toBase: 1000000,
      },
      {
        value: "square-inch",
        label: "Square Inches (in²)",
        toBase: 0.00064516,
      },
      { value: "square-foot", label: "Square Feet (ft²)", toBase: 0.092903 },
      { value: "square-yard", label: "Square Yards (yd²)", toBase: 0.836127 },
      { value: "acre", label: "Acres", toBase: 4046.86 },
      { value: "square-mile", label: "Square Miles (mi²)", toBase: 2589988.11 },
    ],
  },
  volume: {
    baseUnit: "liters",
    units: [
      { value: "milliliter", label: "Milliliters (ml)", toBase: 0.001 },
      { value: "liter", label: "Liters (L)", toBase: 1 },
      { value: "cubic-meter", label: "Cubic Meters (m³)", toBase: 1000 },
      {
        value: "cubic-centimeter",
        label: "Cubic Centimeters (cm³)",
        toBase: 0.001,
      },
      { value: "cubic-inch", label: "Cubic Inches (in³)", toBase: 0.0163871 },
      { value: "cubic-foot", label: "Cubic Feet (ft³)", toBase: 28.3168 },
      {
        value: "fluid-ounce",
        label: "Fluid Ounces (fl oz)",
        toBase: 0.0295735,
      },
      { value: "cup", label: "Cups", toBase: 0.236588 },
      { value: "pint", label: "Pints (pt)", toBase: 0.473176 },
      { value: "quart", label: "Quarts (qt)", toBase: 0.946353 },
      { value: "gallon", label: "Gallons (gal)", toBase: 3.78541 },
    ],
  },
};
