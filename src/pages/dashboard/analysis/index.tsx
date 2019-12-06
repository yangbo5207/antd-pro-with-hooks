import React from "react";
import { Col, Row } from 'antd';
import { GridContent } from '@ant-design/pro-layout';
import { fakeChartData } from "./service";
import { AnalysisData } from './data.d';
import useInitial from '@/hooks/useInitial';
import { initState } from '@/pages/dashboard/analysis/model';

import IntroduceRow from "./components/IntroduceRow";
import SalesCard from "./components/SalesCard";
import TopSearch from "./components/TopSearch";
import ProportionSales from "./components/ProportionSales";
import OfflineData from "./components/OfflineData";

export default function AnalysisFC() {
  const {
    loading, data, setParams, errMsg, setLoading
  } = useInitial<AnalysisData, null>(fakeChartData, initState, null);
  const {
    visitData, visitData2, salesData, searchData, offlineData, offlineChartData,
    salesTypeData, salesTypeDataOnline, salesTypeDataOffline,
  } = data;
  const salesPieData = {
    all: salesTypeData,
    online: salesTypeDataOnline,
    stores: salesTypeDataOffline
  };

  if (errMsg) {
    // 处理异常逻辑
  }

  return (
    <GridContent>
      <IntroduceRow visitData={visitData} loading={loading} />

      {/* 这里应该调用setParams(xxxx, true)，传入参数并且根据新参数重新请求接口，但是由于是demo接口设计不够合理，没有参数，因此直接调用setLoading刷新接口即可， */}
      <SalesCard loading={loading} salesData={salesData} onChange={() => setLoading(true)} />

      <Row gutter={24} type="flex" style={{ marginTop: 24 }}>
        <Col xl={12} lg={24} md={24} sm={24} xs={24}>
          <TopSearch loading={loading} visitData2={visitData2} searchData={searchData} />
        </Col>
        <Col xl={12} lg={24} md={24} sm={24} xs={24}>
          <ProportionSales loading={loading} salesPieData={salesPieData} />
        </Col>
      </Row>

      <OfflineData loading={loading} offlineData={offlineData} offlineChartData={offlineChartData} />
    </GridContent>
  );
}
