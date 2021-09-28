import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import PostScreen from '../screens/PostScreen';
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';
import {AuthContext} from '../components/utils'
const Tab = createBottomTabNavigator();

//custom button for post section.
const CustomTabBarButton = ({children, onPress}) => (

  <TouchableOpacity
    style={{
      top: -30,
      justifyContent: 'center',
      alignItems: 'center',
      ...styles.shadow
    }}
    onPress={onPress}
  >
    <View style={{
      width: 70,
      height: 70,
      borderRadius: 35,
      // backgroundColor: '#85d46a',
      color: 'white',
      backgroundColor: '#6354E4'
    }}>
      {children}
    </View>
  </TouchableOpacity>
)


const Tabs = (props) => {
  return (

    //Section handles icon highlighting depending on currently selected section.
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home')
          {
            iconName = focused
              ? 'home'
              : 'md-home-outline';
          } else if (route.name === 'Search')
          {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Post')
          {
            iconName = focused ? 'add' : 'add-outline';
          }
          else if (route.name === 'Chat')
          {
            iconName = focused ? 'chatbubbles-sharp' : 'chatbubbles-outline';
          } else if (route.name === 'Profile')
          {
            iconName = focused ? 'person' : 'person-outline';
          }
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },

        // tabBarActiveTintColor: '#85d46a',
        tabBarActiveTintColor: '#6354E4',
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: [{
          position: 'absolute',
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: '#dbdbdb',
          borderRadius: 15,
          height: 90,
          borderColor: '#000000',
          borderStyle: 'solid',
          ...styles.shadow
        }]
      })}
    >


      <Tab.Screen name="Home" component={HomeScreen}

        initialParams={props.route} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Post" component={PostScreen}

        options={{
          tabBarIcon: ({focused}) => (
            <Ionicons
              size={31}
              name={'add'}
              style={{
                width: 30,
                height: 30,
              }}
            />
          ),
          tabBarButton: (props) => (
            <CustomTabBarButton {...props} />
          ),
          tabBarVisible: false,
        }}
        initialParams={props}

      />
      <Tab.Screen name="Chat" component={ChatScreen} options={{
        tabBarVisible: false,
      }} />
      <Tab.Screen name="Profile" component={ProfileScreen}
        initialParams={props.route}
        myParam={'hello'}
      />
    </Tab.Navigator>

  )
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#919191',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5
  }
});

export default Tabs;