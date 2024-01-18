import { TouchableOpacity, FlatList, Text, View, StyleSheet, Pressable } from "react-native";
// @ts-ignore
import { Styles } from "../../constants/Color";


const TabButton = ({name, activeTab, onHandleSearchType}) => {
    return (
            <Pressable 
            onPress={onHandleSearchType}
            style={({pressed}) => pressed && styles.btn(name, activeTab)}>
                <View style={styles.buttonContainer}>
                    <Text style={styles.btnText(name, activeTab)}>{name}</Text>
                </View>
                </Pressable>
    );
}

const Tabs = ({ tabs, activeTab, setActiveTab }) => {
    return (
        <View style={{backgroundColor: Styles.colors.lightCoral, marginHorizontal: 12}}>
            <View style={styles.container}>
            <FlatList
                data={tabs}
                renderItem={({item}) => (
                <TabButton 
                    name={item}
                    activeTab={activeTab}
                    onHandleSearchType={() => setActiveTab(item)}
                />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item}
                contentContainerStyle={{ columnGap: 6 }}
                scrollEnabled={false}
            />
        </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        alignItems: "center",
        backgroundColor: Styles.colors.white,
        borderRadius: 10,
        borderColor: Styles.colors.darkCharcoal,
        borderWidth: .2,
    },
    buttonContainer: {
        padding: 6,
        marginHorizontal: 16,
        marginVertical: 4,
    },
    btn : ({ name, activeTab }) => ({
        backgroundColor: name === activeTab ? Styles.colors.bluePrimary :  Styles.colors.lightCoral,
        color: name ===  activeTab ? Styles.colors.darkCharcoal : Styles.colors.lightCoral,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 5.84,
        elevation: 5, // Android
    }),
    btnText: ({ name, activeTab }) => ({
        fontSize: 16,
        color: name === activeTab ?  Styles.colors.darkCharcoal : "#AAA9B8",
    }),
})

export default Tabs







/*
import { TouchableOpacity, FlatList, Text, View, StyleSheet } from "react-native";

interface TabButtonProps {
    name: any;
    activeTab: any;
    onHandleSearchType: () => void;
}

interface TabsProps {
    tabs: any;
    activeTab :any;
    setActiveTab: any;
}

const TabButton = ({name, activeTab, onHandleSearchType}: TabButtonProps) => {
    return (
        <TouchableOpacity
            style={styles.btn}
            onPress={onHandleSearchType}
        >
        <Text style={styles.btnText}>{name}</Text>
        </TouchableOpacity>
    );
}

const Tabs = ({ tabs, activeTab, setActiveTab }: TabsProps) => {
    return (
        <View style={styles.container}>
        <FlatList
            data={tabs}
            renderItem={({item} : any) => (
            <TabButton 
                name={item}
                activeTab={activeTab}
                onHandleSearchType={() => setActiveTab(item)}
            />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item}
            contentContainerStyle={{ columnGap: 6 }}
        />
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginBottom: 6,
    },
    btn : {
        width: '30%',
        paddingVertical: 16,
        paddingHorizontal: 24,
        // backgroundColor: name === activeTab ? "#312651" : "#F3F4F8",
        borderRadius: 16,
        marginLeft: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 5.84,
        elevation: 5, // Android
    },
    btnText: {
        fontSize: 12,
        // color: name === activeTab ? "#C3BFCC" : "#AAA9B8",
    },
})

export default Tabs
*/