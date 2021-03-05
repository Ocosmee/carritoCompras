import React, {useState} from 'react';
import { View, Text, Button, StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';

import CartItem from './CartItem';
import Card from '../shop/UI/Card';

const OrderItem = props => {
    const [showDetail, setShowDetail] =useState(false);

    return (
        <Card style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.totalAmount}>${props.amount.toFixed(2)}</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>
            <Button 
                color={Colors.primary} 
                title={showDetail ? 'Hidde detail' : 'Show detail'}
                onPress={()=>{
                    setShowDetail(prevState => !prevState)
                }}
            />
            {showDetail && <View style={styles.detailItems}>
                {props.items.map(cartItem => (
                <CartItem
                    key={cartItem.productId}
                    quantity={cartItem.quantity}
                    amount={cartItem.sum}
                    title={cartItem.productTitle } />
                ))}
            </View>}
        </Card>
    );
}

const styles = StyleSheet.create({
    orderItem: { 
        margin: 20,
        padding: 10,
        alignItems: 'center'
    },
    summary:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15,
    },
    totalAmount:{
        fontFamily:'open-sans-bold',
        fontSize: 16
    },
    date: {
        fontSize:16,
        fontFamily:'open-sans',
        color: '#888'
    },
    detailItems: {
        width: '100%'
    }
});

export default OrderItem;