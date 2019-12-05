import { Col, Row } from 'antd';
import React, { Suspense, useEffect } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { useSelector, useDispatch } from 'dva';
import PageLoading from './components/PageLoading';
import { AnalysisData } from './data.d';

const IntroduceRow = React.lazy(() => import('./components/IntroduceRow'));
const SalesCard = React.lazy(() => import('./components/SalesCard'));
const TopSearch = React.lazy(() => import('./components/TopSearch'));
const ProportionSales = React.lazy(() => import('./components/ProportionSales'));
const OfflineData = React.lazy(() => import('./components/OfflineData'));

export interface LoadingEffect {
  effects: {
    [key: string]: boolean
  },
  global: boolean,
  models: {
    [key: string]: boolean
  }
}

export type SalesType = 'all' | 'online' | 'stores';
export type DateType = 'today' | 'week' | 'month' | 'year';

export default function AnalysisFC() {
  const dashboardAnalysis = useSelector<any, AnalysisData>(state => state.dashboardAnalysis);
  const loadingEffect = useSelector<any, LoadingEffect>(state => state.loading);
  const loading = loadingEffect.effects['dashboardAnalysis/fetch'];
  const dispatch = useDispatch();
  
  const {
    visitData, visitData2, salesData, searchData, offlineData, offlineChartData, salesTypeData, salesTypeDataOnline, salesTypeDataOffline,
  } = dashboardAnalysis;

  const salesPieData = {
    all: salesTypeData,
    online: salesTypeDataOnline,
    stores: salesTypeDataOffline
  };

  useEffect(() => {
    dispatch({ type: 'dashboardAnalysis/fetch'});
  }, []);

  if (loading) { return null; }

  return (
    <GridContent>
      <Suspense fallback={<PageLoading />}>
        <IntroduceRow visitData={visitData} />
      </Suspense>

      <Suspense fallback={null}>
        <SalesCard salesData={salesData} onChange={() => {}} />
      </Suspense>

      <Row gutter={24} type="flex" style={{ marginTop: 24 }}>
        <Col xl={12} lg={24} md={24} sm={24} xs={24}>
          <Suspense fallback={null}>
            <TopSearch visitData2={visitData2} searchData={searchData} />
          </Suspense>
        </Col>
        <Col xl={12} lg={24} md={24} sm={24} xs={24}>
          <Suspense fallback={null}>
            <ProportionSales salesPieData={salesPieData} />
          </Suspense>
        </Col>
      </Row>

      <Suspense fallback={null}>
        <OfflineData offlineData={offlineData} offlineChartData={offlineChartData} />
      </Suspense>
    </GridContent>
  );
}
