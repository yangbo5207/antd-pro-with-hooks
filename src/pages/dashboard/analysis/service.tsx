import request from '@/utils/request';
import {AnalysisData} from './data.d';

export async function fakeChartData() {
  return request<AnalysisData>('/api/fake_chart_data');
}
