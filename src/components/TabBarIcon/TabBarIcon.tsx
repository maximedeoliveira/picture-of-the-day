import React, { cloneElement } from 'react';

import { TabBarRouteIcon } from '@/config/TabBar';
import { TabBarParamList } from '@/navigation/TabBarNavigator/types';

type TabBarIconProps = {
  name: keyof TabBarParamList;
  color: string;
  size: number;
};

const TabBarIcon = (props: TabBarIconProps) => {
  return (
    <>
      {cloneElement(TabBarRouteIcon[props.name], {
        color: props.color,
        size: props.size,
      })}
    </>
  );
};

export default TabBarIcon;
