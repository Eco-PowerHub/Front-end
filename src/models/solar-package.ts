export interface SolarPackage {
    packageId: number;
    image: string;
    packageName: string;
    totalPrice: number;
    requiredBatteries: number;
    requiredPanels: number;
    panelModel: string;
    inverterModel: string;
    surfaceArea: number;
    packagePrice: number;
    electricityUsage: number[];
    electricityUsageAverage: number;
    pricePerYear: number;
    roiYears: number;
    totalYearsSaving: number;
    savingCost: number;
    product?: any;
  }
  