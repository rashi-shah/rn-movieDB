type FunctionType = (size: number, factor?: number) => number;

interface GlobalMetricsType {
  isAndroid: boolean;
  isIos: boolean;
  isPad: boolean;
  isTV: boolean;
}

interface DimensionType {
  height: number;
  width: number;
}
export type {FunctionType, GlobalMetricsType, DimensionType};
