import { Col, Dropdown, Icon, Menu, Row } from 'antd';
import React, { Suspense, useEffect, useState } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { useSelector, useDispatch } from 'dva';
import PageLoading from './components/PageLoading';
import { getTimeDistance } from './utils/utils';
import { AnalysisData } from './data.d';
import { RangePickerValue } from 'antd/es/date-picker/interface';
import styles from './style.less';

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
  const [salesType, setSalesType] = useState<SalesType>('all');
  const [currentTabKey, setCurrentTabKey] = useState('');
  
  const {
    visitData, visitData2, salesData, searchData, offlineData, offlineChartData, salesTypeData, salesTypeDataOnline, salesTypeDataOffline,
  } = dashboardAnalysis;

  useEffect(() => {
    dispatch({ type: 'dashboardAnalysis/fetch'});
  }, []);

  const dropdownGroup = (
    <span className={styles.iconGroup}>
      <Dropdown 
        overlay={
          <Menu>
            <Menu.Item>操作一</Menu.Item>
            <Menu.Item>操作二</Menu.Item>
          </Menu>
        } 
        placement="bottomRight"
      >
        <Icon type="ellipsis" />
      </Dropdown>
    </span>
  );

  const salesPieData = {
    all: salesTypeData,
    online: salesTypeDataOnline,
    stores: salesTypeDataOffline
  }[salesType];
  const activeKey = currentTabKey || (offlineData[0] && offlineData[0].name);

  return (
    <GridContent>
      <Suspense fallback={<PageLoading />}>
        <IntroduceRow visitData={visitData} />
      </Suspense>

      <Suspense fallback={null}>
        <SalesCard salesData={salesData} onChange={() => {}} />
      </Suspense>

      <Row gutter={24} type="flex" style={{marginTop: 24,}}>
        <Col xl={12} lg={24} md={24} sm={24} xs={24}>
          <Suspense fallback={null}>
            <TopSearch
              loading={loading}
              visitData2={visitData2}
              searchData={searchData}
              dropdownGroup={dropdownGroup}
            />
          </Suspense>
        </Col>
        <Col xl={12} lg={24} md={24} sm={24} xs={24}>
          <Suspense fallback={null}>
            <ProportionSales
              dropdownGroup={dropdownGroup}
              salesType={salesType}
              loading={loading}
              salesPieData={salesPieData}
              handleChangeSalesType={(e) => setSalesType(e.target.value)}
            />
          </Suspense>
        </Col>
      </Row>

      <Suspense fallback={null}>
        <OfflineData
          activeKey={activeKey}
          loading={loading}
          offlineData={offlineData}
          offlineChartData={offlineChartData}
          handleTabChange={setCurrentTabKey}
        />
      </Suspense>
    </GridContent>
  )
}
