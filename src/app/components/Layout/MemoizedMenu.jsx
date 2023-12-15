import { Menu } from 'antd';
import React from 'react';

const MemoizedMenu = React.memo(({ collapsed, selected, filteredItems }) => {
  return (
    <Menu
      style={{
        marginTop: '26px',
        marginLeft: collapsed ? 0 : '10px',
        iconSize: 59,
        backgroundColor: 'transparent',
        color: '#ffffff',
        width: '100%',
        fontSize: '11.2',
        fontFamily: 'Source Sans Pro',
        fontWeight: 'bold',
      }}
      iconmargininlineend={50}
      mode="inline"
      defaultSelectedKeys={[selected]}
      items={filteredItems}
    />
  );
});

export default MemoizedMenu;
