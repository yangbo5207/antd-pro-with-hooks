import { Card, Col, DatePicker, Row, Tabs } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';

import { RangePickerValue } from 'antd/es/date-picker/interface';
import React, { useState } from 'react';
import numeral from 'numeral';
import { VisitDataType } from '../data.d';
import { Bar } from './Charts';
import styles from '../style.less';
import { getTimeDistance } from '@/pages/dashboard/analysis/utils/utils';

const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

const rankingListData: { title: string; total: number }[] = [];
for (let i = 0; i < 7; i += 1) {
  rankingListData.push({
    title: formatMessage({ id: 'dashboard-analysis.analysis.test' }, { no: i }),
    total: 323234,
  });
}

export type DateType = "today" | "week" | "month" | "year";

export interface SalesCardProps {
  salesData: VisitDataType[];
  onChange: (value: RangePickerValue) => any,
  loading: boolean
}

const SalesCard = ({salesData, onChange, loading}: SalesCardProps) => {
  const [rangePickerValue, setRangePickerValue] = useState(getTimeDistance('year'));
  
  const isActive = (type: DateType) => {
    const value = getTimeDistance(type);
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return '';
    }
    if (rangePickerValue[0].isSame(value[0], 'day') && rangePickerValue[1].isSame(value[1], 'day')) {
      return styles.currentDate;
    }
    return '';
  }

  const handleRangePickerChange = (rangePickerValue: RangePickerValue) => {
    setRangePickerValue(rangePickerValue);
    onChange && onChange(rangePickerValue);
    // dispatch({
    //   type: "dashboardAnalysis/fetchSalesData"
    // });
  };

  const selectDate = (type: DateType) => {
    const value = getTimeDistance(type);
    setRangePickerValue(value);
    onChange && onChange(value);
    // dispatch({
    //   type: "dashboardAnalysis/fetchSalesData"
    // });
  };

  return (
    <Card bordered={false} bodyStyle={{ padding: 0 }} loading={loading}>
      <div className={styles.salesCard}>
        <Tabs
          tabBarExtraContent={
            <div className={styles.salesExtraWrap}>
              <div className={styles.salesExtra}>
                <a
                  className={isActive("today")}
                  onClick={() => selectDate("today")}
                >
                  <FormattedMessage
                    id="dashboard-analysis.analysis.all-day"
                    defaultMessage="All Day"
                  />
                </a>
                <a
                  className={isActive("week")}
                  onClick={() => selectDate("week")}
                >
                  <FormattedMessage
                    id="dashboard-analysis.analysis.all-week"
                    defaultMessage="All Week"
                  />
                </a>
                <a
                  className={isActive("month")}
                  onClick={() => selectDate("month")}
                >
                  <FormattedMessage
                    id="dashboard-analysis.analysis.all-month"
                    defaultMessage="All Month"
                  />
                </a>
                <a
                  className={isActive("year")}
                  onClick={() => selectDate("year")}
                >
                  <FormattedMessage
                    id="dashboard-analysis.analysis.all-year"
                    defaultMessage="All Year"
                  />
                </a>
              </div>
              <RangePicker
                value={rangePickerValue}
                onChange={handleRangePickerChange}
                style={{ width: 256 }}
              />
            </div>
          }
          size="large"
          tabBarStyle={{ marginBottom: 24 }}
        >
          <TabPane
            tab={
              <FormattedMessage
                id="dashboard-analysis.analysis.sales"
                defaultMessage="Sales"
              />
            }
            key="sales"
          >
            <Row type="flex">
              <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                <div className={styles.salesBar}>
                  <Bar
                    height={295}
                    title={
                      <FormattedMessage
                        id="dashboard-analysis.analysis.sales-trend"
                        defaultMessage="Sales Trend"
                      />
                    }
                    data={salesData}
                  />
                </div>
              </Col>
              <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                <div className={styles.salesRank}>
                  <h4 className={styles.rankingTitle}>
                    <FormattedMessage
                      id="dashboard-analysis.analysis.sales-ranking"
                      defaultMessage="Sales Ranking"
                    />
                  </h4>
                  <ul className={styles.rankingList}>
                    {rankingListData.map((item, i) => (
                      <li key={item.title}>
                        <span
                          className={`${styles.rankingItemNumber} ${
                            i < 3 ? styles.active : ""
                          }`}
                        >
                          {i + 1}
                        </span>
                        <span
                          className={styles.rankingItemTitle}
                          title={item.title}
                        >
                          {item.title}
                        </span>
                        <span className={styles.rankingItemValue}>
                          {numeral(item.total).format("0,0")}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Col>
            </Row>
          </TabPane>
          <TabPane
            tab={
              <FormattedMessage
                id="dashboard-analysis.analysis.visits"
                defaultMessage="Visits"
              />
            }
            key="views"
          >
            <Row>
              <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                <div className={styles.salesBar}>
                  <Bar
                    height={292}
                    title={
                      <FormattedMessage
                        id="dashboard-analysis.analysis.visits-trend"
                        defaultMessage="Visits Trend"
                      />
                    }
                    data={salesData}
                  />
                </div>
              </Col>
              <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                <div className={styles.salesRank}>
                  <h4 className={styles.rankingTitle}>
                    <FormattedMessage
                      id="dashboard-analysis.analysis.visits-ranking"
                      defaultMessage="Visits Ranking"
                    />
                  </h4>
                  <ul className={styles.rankingList}>
                    {rankingListData.map((item, i) => (
                      <li key={item.title}>
                        <span
                          className={`${styles.rankingItemNumber} ${
                            i < 3 ? styles.active : ""
                          }`}
                        >
                          {i + 1}
                        </span>
                        <span
                          className={styles.rankingItemTitle}
                          title={item.title}
                        >
                          {item.title}
                        </span>
                        <span>{numeral(item.total).format("0,0")}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </div>
    </Card>
  );
};

export default SalesCard;
