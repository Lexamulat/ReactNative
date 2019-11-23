import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import SecondScreen from './components/SecondScreen/SecondScreen'
import StartScreen from './components/StartScreen/StartScreen'
import SearchScreen from './components/SearchScreen/SearchScreen'

export default function Routes() {

   return (
      <Router>
         <Scene key="root">

            <Scene key="home" component={StartScreen} title="Home" />
            <Scene key="day" component={SecondScreen} title="Day" initial={true} />
            <Scene key="search" component={SearchScreen} title="Search" />

         </Scene>
      </Router>
   );
}