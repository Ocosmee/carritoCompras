import React, {useEffect, useState} from 'react';
import { Text,FlatList, Platform,View, ActivityIndicator,StyleSheet} from 'react-native';
import { useSelector,useDispatch } from 'react-redux';
import { HeaderButtons, Item} from 'react-navigation-header-buttons';

import HeaderButton from '../../components/shop/UI/HeaderButton';
import OrderItem from '../../components/shop/OrderItem';
import * as orderActions from '../../storage/actions/orders';
import Colors from '../../constants/Colors';

const OrderScreen = props => {
    const [isLoading,setIsLoading] = useState(false);
    const orders = useSelector(state => state.orders.orders);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(orderActions.fetchOrders()).then(()=>{
            setIsLoading(false);
        });
    },[dispatch]);

    if(isLoading){
        return (
            <View style={styles.centered}> 
                <ActivityIndicator size='large' color={Colors.primary}/>
            </View>
        );
    }

    if (orders.length === 0) {
        return (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Data not found!, maybe start creating some?</Text>
          </View>
        );
      }

    return (
        <FlatList
            data={orders}
            keyExtractor={item => item.id}
            renderItem= {itemData => (
                <OrderItem
                    amount={itemData.item.totalAmount}
                    date={itemData.item.readableDate}
                    items={itemData.item.items}  
                />
            )}
         />
    );
}

export const screenOption = navData => {
    return {
        headerTitle: 'Your Orders',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item 
              title='Menu'
              iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
              onPress={()=> { 
                navData.navigation.toggleDrawer();
              }}
            />
          </HeaderButtons>
          )
    };
};

const styles = StyleSheet.create({
    centered:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default OrderScreen;