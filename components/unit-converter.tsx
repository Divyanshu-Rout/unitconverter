"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRightLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { conversionData } from "@/lib/conversion-data";

export default function UnitConverter() {
  const [category, setCategory] = useState("length");
  const [fromUnit, setFromUnit] = useState("");
  const [toUnit, setToUnit] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [formula, setFormula] = useState("");

  // Set default units when category changes
  useEffect(() => {
    if (conversionData[category]?.units.length > 0) {
      setFromUnit(conversionData[category].units[0].value);
      setToUnit(
        conversionData[category].units.length > 1
          ? conversionData[category].units[1].value
          : conversionData[category].units[0].value
      );
    }
  }, [category]);

  // Convert units whenever inputs change
  useEffect(() => {
    if (fromUnit && toUnit && inputValue) {
      convertUnits();
    } else {
      setResult("");
      setFormula("");
    }
  }, [fromUnit, toUnit, inputValue]);

  const convertUnits = () => {
    setError("");

    // Validate input is a number
    if (isNaN(Number(inputValue))) {
      setError("Please enter a valid number");
      setResult("");
      setFormula("");
      return;
    }

    const value = Number.parseFloat(inputValue);

    // Handle special cases for temperature
    if (category === "temperature") {
      let convertedValue = 0;
      let formulaText = "";

      if (fromUnit === "celsius" && toUnit === "fahrenheit") {
        convertedValue = (value * 9) / 5 + 32;
        formulaText = `(${value} × 9/5) + 32 = ${convertedValue.toFixed(4)}`;
      } else if (fromUnit === "fahrenheit" && toUnit === "celsius") {
        convertedValue = ((value - 32) * 5) / 9;
        formulaText = `(${value} - 32) × 5/9 = ${convertedValue.toFixed(4)}`;
      } else if (fromUnit === "celsius" && toUnit === "kelvin") {
        convertedValue = value + 273.15;
        formulaText = `${value} + 273.15 = ${convertedValue.toFixed(4)}`;
      } else if (fromUnit === "kelvin" && toUnit === "celsius") {
        convertedValue = value - 273.15;
        formulaText = `${value} - 273.15 = ${convertedValue.toFixed(4)}`;
      } else if (fromUnit === "fahrenheit" && toUnit === "kelvin") {
        convertedValue = ((value - 32) * 5) / 9 + 273.15;
        formulaText = `(${value} - 32) × 5/9 + 273.15 = ${convertedValue.toFixed(
          4
        )}`;
      } else if (fromUnit === "kelvin" && toUnit === "fahrenheit") {
        convertedValue = ((value - 273.15) * 9) / 5 + 32;
        formulaText = `(${value} - 273.15) × 9/5 + 32 = ${convertedValue.toFixed(
          4
        )}`;
      } else {
        // Same unit
        convertedValue = value;
        formulaText = `${value} = ${convertedValue}`;
      }

      setResult(convertedValue.toFixed(4));
      setFormula(formulaText);
      return;
    }

    // For other unit types (length, weight, etc.)
    const fromUnitData = conversionData[category].units.find(
      (u) => u.value === fromUnit
    );
    const toUnitData = conversionData[category].units.find(
      (u) => u.value === toUnit
    );

    if (fromUnitData && toUnitData) {
      // Convert to base unit first, then to target unit
      const valueInBaseUnit = value * fromUnitData.toBase;
      const convertedValue = valueInBaseUnit / toUnitData.toBase;

      // Create formula explanation
      let formulaText = "";
      if (fromUnit === toUnit) {
        formulaText = `${value} = ${convertedValue}`;
      } else {
        formulaText = `${value} ${fromUnitData.label} × ${
          fromUnitData.toBase
        } = ${valueInBaseUnit.toFixed(6)} ${conversionData[category].baseUnit}`;
        formulaText += `\n${valueInBaseUnit.toFixed(6)} ${
          conversionData[category].baseUnit
        } ÷ ${toUnitData.toBase} = ${convertedValue.toFixed(6)} ${
          toUnitData.label
        }`;
      }

      setResult(convertedValue.toFixed(6));
      setFormula(formulaText);
    }
  };

  const swapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  return (
    <Card className="shadow-lg">
      <CardContent className="p-6">
        <Tabs
          defaultValue="length"
          value={category}
          onValueChange={setCategory}
          //   className="w-full"
        >
          <TabsList className="flex items-center justify-start flex-wrap h-auto space-y-1">
            <TabsTrigger value="length">Length</TabsTrigger>
            <TabsTrigger value="weight">Weight</TabsTrigger>
            <TabsTrigger value="temperature">Temperature</TabsTrigger>
            <TabsTrigger value="area">Area</TabsTrigger>
            <TabsTrigger value="volume">Volume</TabsTrigger>
          </TabsList>

          {Object.keys(conversionData).map((cat) => (
            <TabsContent key={cat} value={cat} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="from-value">Value</Label>
                  <Input
                    id="from-value"
                    type="text"
                    placeholder="Enter value"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <div className="flex w-full  gap-2 items-end flex-wrap">
                  <div className="flex-1 w-full md:w-max space-y-3">
                    <Label htmlFor="from-unit">From</Label>
                    <Select value={fromUnit} onValueChange={setFromUnit}>
                      <SelectTrigger id="from-unit">
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        {conversionData[cat].units.map((unit) => (
                          <SelectItem key={unit.value} value={unit.value}>
                            {unit.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="w-full md:w-max">
                    <Button
                      variant="outline"
                      size="icon"
                      className="mb-0.5"
                      onClick={swapUnits}
                    >
                      <ArrowRightLeft className="h-4 w-4" />
                      <span className="sr-only">Swap units</span>
                    </Button>
                  </div>

                  <div className="flex-1 space-y-3">
                    <Label htmlFor="to-unit">To</Label>
                    <Select value={toUnit} onValueChange={setToUnit}>
                      <SelectTrigger id="to-unit">
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        {conversionData[cat].units.map((unit) => (
                          <SelectItem key={unit.value} value={unit.value}>
                            {unit.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {result && !error && (
                <div className="space-y-3 p-4 bg-slate-50 dark:bg-slate-900 rounded-md">
                  <div className="flex flex-col md:flex-row md:items-baseline gap-2">
                    <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      Result:
                    </h3>
                    <p className="text-2xl font-bold">
                      {result}{" "}
                      {toUnit &&
                        conversionData[cat].units.find(
                          (u) => u.value === toUnit
                        )?.label}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                    <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
                      Conversion Formula:
                    </h4>
                    <pre className="text-xs bg-slate-100 dark:bg-slate-800 p-2 rounded overflow-x-auto whitespace-pre-wrap">
                      {formula}
                    </pre>
                  </div>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
