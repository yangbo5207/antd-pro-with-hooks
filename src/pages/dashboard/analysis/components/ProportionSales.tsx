import { Card, Radio } from 'antd';

import { FormattedMessage } from 'umi-plugin-react/locale';
import React, { useState } from 'react';
import { VisitDataType } from '../data.d';
import { Pie } from './Charts';
import Yuan from '../utils/Yuan';
import styles from '../style.less';
import { dropdownGroup } from '@/pages/dashboard/analysis/components/TopSearch';

export type SalesType = "all" | "online" | "stores";

export interface ProportionSalesProps {
  salesPieData: {
    all: VisitDataType[];
    online: VisitDataType[];
    stores: VisitDataType[];
  };
}

const ProportionSales = ({salesPieData}: ProportionSalesProps) => {
  const [salesType, setSalesType] = useState<SalesType>('all');
  const _salesPieData = salesPieData[salesType];
  return (
    <Card
      className={styles.salesCard}
      bordered={false}
      title={
        <FormattedMessage
          id="dashboard-analysis.analysis.the-proportion-of-sales"
          defaultMessage="The Proportion of Sales"
        />
      }
      style={{
        height: "100%"
      }}
      extra={
        <div className={styles.salesCardExtra}>
          {dropdownGroup}
          <div className={styles.salesTypeRadio}>
            <Radio.Group value={salesType} onChange={(e) => setSalesType(e.target.value)}>
              <Radio.Button value="all">
                <FormattedMessage
                  id="dashboard-analysis.channel.all"
                  defaultMessage="ALL"
                />
              </Radio.Button>
              <Radio.Button value="online">
                <FormattedMessage
                  id="dashboard-analysis.channel.online"
                  defaultMessage="Online"
                />
              </Radio.Button>
              <Radio.Button value="stores">
                <FormattedMessage
                  id="dashboard-analysis.channel.stores"
                  defaultMessage="Stores"
                />
              </Radio.Button>
            </Radio.Group>
          </div>
        </div>
      }
    >
      <div>
        <h4 style={{ marginTop: 8, marginBottom: 32 }}>
          <FormattedMessage
            id="dashboard-analysis.analysis.sales"
            defaultMessage="Sales"
          />
        </h4>
        <Pie
          hasLegend
          subTitle={
            <FormattedMessage
              id="dashboard-analysis.analysis.sales"
              defaultMessage="Sales"
            />
          }
          total={() => (
            <Yuan>{_salesPieData.reduce((pre, now) => now.y + pre, 0)}</Yuan>
          )}
          data={_salesPieData}
          valueFormat={value => <Yuan>{value}</Yuan>}
          height={248}
          lineWidth={4}
        />
      </div>
    </Card>
  );
}

export default ProportionSales;
