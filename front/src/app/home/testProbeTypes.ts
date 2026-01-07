export interface TestProbeResponse {
  message: string;
  timestamp?: string;
}

export interface TestProbeState {
  loading: boolean;
  data: TestProbeResponse | null;
  error: string | null;
}
