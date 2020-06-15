import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Home from '../screens/home'
import Search from '../screens/search'

const RootStack = createStackNavigator(
    {
      Home: {
        screen: Home,
      },
      Search: {
        screen: Search,
      }
    },
    {
      initialRouteName: "Home",
      headerMode: "none",
      navigationOptions: {
        headerVisible: false,
      },
    }
  );
  
  export default createAppContainer(RootStack);