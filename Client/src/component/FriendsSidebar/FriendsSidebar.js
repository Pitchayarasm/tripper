import React from "react";
import { SideNav, SideNavItem, Icon } from 'react-materialize';

class FriendSidebar extends React.Component {

    render() {

        return (

        <SideNav
          trigger={<Icon>chat</Icon>}
          options={{ closeOnClick: true }}
          >
          <SideNavItem userView
            user={{
              background: 'img/office.jpg',
              image: 'img/yuna.jpg',
              name: 'John Doe',
              email: 'jdandturk@gmail.com'
            }}
          />
          <SideNavItem href='#!icon' icon='cloud'>First Link With Icon</SideNavItem>
          <SideNavItem href='#!second'>Second Link</SideNavItem>
          <SideNavItem divider />
          <SideNavItem subheader>Subheader</SideNavItem>
          <SideNavItem waves href='#!third'>Third Link With Waves</SideNavItem>
        </SideNav>
        );
    }
}

export default FriendSidebar;