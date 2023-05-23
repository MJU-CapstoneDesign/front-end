import {  StyleSheet, } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(200, 200, 200, 0.50)',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 30,
    },

    subContainer: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },


    box2: {
        width: 338,
        height: 150,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    box3: {
        width: 338,
        height: 125,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    box4: {
        width: 338,
        height: 210,
        backgroundColor: 'white',
        borderRadius: 10,
    },


    marginLeftLittle: {
        marginLeft : 10,
    },

    normalText: {
        justifyContent: 'flex-start',
        backgroundColor: 'white',
        color: 'black',
    },



    bigText: {
        justifyContent: 'flex-start',
        backgroundColor: 'white',
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 20,
        marginTop: 15,
    },

    button: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: '80%',
        height: 50,
        borderRadius: 10,
        marginVertical: 0,
        paddingHorizontal: 10,
        paddingVertical: 0,
    },

    underButt: {
        width: 30,
        height: 30,
    },



    touchable: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        height: 50,
        flex: 1,
    },

    buttonText: {
        flex: 1,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000',
    },

    image: {
        flex: 1,
        width: 70,
        height: 70,
        resizeMode: 'cover',
        marginLeft: 10,
        borderRadius: 20,
    },

    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
    },
    textInput: {
        backgroundColor: 'rgba(200, 200, 200, 0.50)',
        borderRadius: 10,
        width : 352,
        height : 35,
    },
    perButt: {
        height: 20,
        justifyContent: 'center',
        marginLeft: 20,
        marginTop: 7,
    },
    pinkButt: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,

    },

    middleText: {

        backgroundColor: 'rgba(223, 165, 165, 0.44)',
        textAlignVertical: 'center',
        textAlign: 'center',
        color: 'black',
        width : 352,
        height : 50,
        fontSize: 20,
        borderRadius: 10,
    },
});


export const calStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17,
        width: '80%'
    },

    button: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
    },
    selectedButton: {
        backgroundColor: 'rgba(223, 165, 165, 0.44)',
    },

    scheduleItem: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        borderBottomWidth: 1,
        borderRightWidth: 0.5,
        padding: 10,
        height: 85,
        marginBottom: 10,
        backgroundColor: 'white',
    },
    dateView: {
        width: 50,
        height: 50,
        backgroundColor: 'rgba(223, 165, 165, 0.44)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },

    scheduleContent: {
        flexDirection: 'column',
        marginLeft: 20,
    },
    title: {
        fontSize: 20,
        color: 'black',
    },
    time: {
        fontWeight: 'bold',
        fontSize: 14,
    },
    headerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    monthText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    yearText: {
        fontSize: 12,
        color: 'gray',
    },
    knobContainer: {
    },
    knobText: {
        // 버튼 텍스트의 스타일
    },
    hugeText: {
        fontSize: 41,
        fontWeight: 'bold',
    }

});

